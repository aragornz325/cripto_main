import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { PokerRoomDocument } from 'src/poker-holdem/schemas/poker-room.schema';
import { PokerPlayerDocument } from 'src/poker-holdem/schemas/poker-player.schema';
import {
  BetState,
  BetStateDocument,
} from 'src/poker-holdem/schemas/bet-state.schema';
import { PokerRoundDocument } from 'src/poker-holdem/schemas/poker-round.schema';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AUTOMATIC_BET } from 'src/poker-holdem/constants/events';
import { TURN_END } from 'src/poker-holdem/constants/timeouts';

@Injectable()
export class PokerActionsService {
  constructor(
    @InjectModel('PokerRoom') private pokerRoomsModel: Model<PokerRoomDocument>,
    @InjectModel('PokerPlayer')
    private pokerPlayerModel: Model<PokerPlayerDocument>,
    @InjectModel('PokerRound')
    private pokerRoundModel: Model<PokerRoundDocument>,
    @InjectModel('BetState') private betStateModel: Model<BetStateDocument>,
    private eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(PokerActionsService.name);

  @OnEvent(AUTOMATIC_BET)
  async bet(
    roomId: string,
    playerId: string,
    betAction: number,
    raiseAmount?: number,
  ) {
    try {
      try {
        const timeout = this.schedulerRegistry.getTimeout(
          `${TURN_END}-${playerId}`,
        );
        if (timeout)
          this.schedulerRegistry.deleteTimeout(`${TURN_END}-${playerId}`);
      } catch (err) {
        this.logger.error(err);
      }
      /*
				===>>> VALIDATIONS <<<===
			*/
      // Get room for validation
      const room = await this.pokerRoomsModel.findById(roomId);
      if (!room) return { error: new NotFoundException('Room was not found.') };

      // Gonna work with actual round query, if you find a way for save subdocs from room parent doc, please change it.
      const activeRound = await this.pokerRoundModel.findById(room.activeRound);
      if (activeRound.roundState > 4)
        return { error: new ForbiddenException('Finished round.') };
      if (activeRound.activePlayer.toString() !== playerId)
        return { error: new ForbiddenException("It's not player's turn.") };

      // SAME AS ABOVE
      const players = await this.pokerPlayerModel.find({
        _id: { $in: activeRound.players },
      });
      // Sort player for work with ordered array.
      players.sort((a, b) => (a.seat > b.seat ? 1 : -1));
      // Saves the index to use it as a arrow to find next player and other setups
      const activePlayerIndex = players.findIndex(
        (p) => p._id.toString() === activeRound.activePlayer.toString(),
      );

      const betState = await this.betStateModel.findById(
        players[activePlayerIndex].betState,
      );
      const canDoAction = betState.betActions.some(
        (action) => action === betAction,
      );
      if (!canDoAction)
        return {
          error: new ForbiddenException('Player cannot perform this action.'),
        };

      /* ========================================================================================================== */
      /*
				===>>>	CHANGE PLAYER STATE <<<===
			
				Main goal for each action is set:
					substract to player's room balance,
					set player's current bet, 
					set room's current bet,
					add to room pot.
				After that, should:
					set new players betState.
					look for next player.
					if not nextPlayer, set new roundState
					if roundState
			*/
      const takeCoinsFromPlayerAndIncreaseHisBet = (newCoins: number) => {
        players[activePlayerIndex].roomBalance -= newCoins;
        players[activePlayerIndex].currentBet += newCoins;
        activeRound.pot += newCoins;
      };

      players[activePlayerIndex].didAnAction = true;

      switch (betAction) {
        case 1: {
          // SMALL-BLIND
          const newCoins = room.entryPrice / 2;

          takeCoinsFromPlayerAndIncreaseHisBet(newCoins);
          activeRound.currentBet = newCoins;
          players[activePlayerIndex].betState = 4;

          break;
        }
        case 2: {
          // BIG-BLIND
          const newCoins = room.entryPrice;

          takeCoinsFromPlayerAndIncreaseHisBet(newCoins);
          activeRound.currentBet = newCoins;
          players[activePlayerIndex].betState = 4;

          break;
        }
        case 3: {
          // CALL
          // ====>>> If player hasn't enough money, reject action or perform all-in ?
          let newCoins =
            activeRound.currentBet - players[activePlayerIndex].currentBet;
          if (newCoins >= players[activePlayerIndex].roomBalance) {
            newCoins = players[activePlayerIndex].roomBalance;
            // Player hasn't enough money so is an ALL-IN
            takeCoinsFromPlayerAndIncreaseHisBet(newCoins);
            players[activePlayerIndex].betState = 5;
          } else {
            // EVEN
            takeCoinsFromPlayerAndIncreaseHisBet(newCoins);
            players[activePlayerIndex].betState = 4;
          }
          break;
        }
        case 4: {
          // RAISE
          const newCoins =
            raiseAmount +
            (activeRound.currentBet - players[activePlayerIndex].currentBet);

          if (newCoins > players[activePlayerIndex].roomBalance)
            return {
              error: new ForbiddenException('Does not have enough balance.'),
            };

          takeCoinsFromPlayerAndIncreaseHisBet(newCoins);
          activeRound.currentBet += raiseAmount;
          if (players[activePlayerIndex].roomBalance < 1)
            players[activePlayerIndex].betState = 5;
          else players[activePlayerIndex].betState = 4;

          break;
        }
        case 5: {
          // CHECK
          break;
        }
        case 6: {
          // ALL-IN
          const newCoins = players[activePlayerIndex].roomBalance;

          takeCoinsFromPlayerAndIncreaseHisBet(newCoins);
          activeRound.currentBet =
            players[activePlayerIndex].currentBet > activeRound.currentBet
              ? players[activePlayerIndex].currentBet
              : activeRound.currentBet;

          players[activePlayerIndex].betState = 5;

          break;
        }
        case 7: {
          // FOLD
          players[activePlayerIndex].betState = 6;
          break;
        }
      }

      await players[activePlayerIndex].save();

      /* ========================================================================================================== */
      /*
				===>>> SET THE REST OF THE PLAYERS STATES <<<===
			*/

      const getNextIndex = (index: number, array: any[]) =>
        index === array.length - 1 ? 0 : index + 1;

      const states = { folds: 0, allins: 0, lower: 0, even: 0 };
      for (const player of players) {
        // SET LOWER
        if (player.betState === 4 && player.currentBet < activeRound.currentBet)
          player.betState = 3;
        // COUNT STATES
        if (player.betState === 5) states.allins += 1;
        else if (player.betState === 6) states.folds += 1;
        else if (player.betState === 3) states.lower += 1;
        else if (player.betState === 4) states.even += 1;
      }

      /* ========================================================================================================== */
      /*
				===>>> SET ROUND STATE <<<===
			*/
      const setWinner = (
        winners: PokerPlayerDocument[],
        round: PokerRoundDocument,
      ) => {
        round.roundState = 5;

        if (winners.length === 1 && winners[0].currentBet < round.currentBet) {
          for (const player of players) {
            const moneyToReturn = player.currentBet - winners[0].currentBet;
            if (moneyToReturn < 0) continue;
            round.pot -= moneyToReturn;
            player.roomBalance += moneyToReturn;
          }
          winners[0].roomBalance += round.pot;
        } else {
          for (const player of winners) {
            player.roomBalance += round.pot / winners.length;
          }
        }

        round.activePlayer = winners[0]._id.toString();
        round.pot = 0;
        round.winners = winners;

        room.startTime = new Date(Date.now() + room.startTimeout);
        this.schedulerRegistry.addTimeout(
          `start-${roomId}`,
          setTimeout(() => {
            this.eventEmitter.emit('start-room', roomId);
          }, room.startTimeout),
        );
      };

      // IF THERE IS ONLY ONE PLAYER WITHOUT FOLD, WINS
      if (states.folds === players.length - 1) {
        const winner = players.find((player) => player.betState !== 6);
        setWinner([winner], activeRound);
      }

      // IF EVERY PLAYER WITHOUT FOLD ARE ALL-IN
      else if (
        states.even < 2 &&
        states.lower === 0 &&
        states.folds + states.allins + states.even === players.length
      ) {
        if (activeRound.roundState < 4) {
          const remainCards = 5 - activeRound.tableCards.length;
          if (remainCards > 0)
            activeRound.tableCards = activeRound.tableCards.concat(
              activeRound.deck.splice(0, remainCards),
            );
        }
        const winners = await this.compareHands(
          players,
          activeRound.tableCards,
        );
        setWinner(winners, activeRound);
      }

      // AT LEAST ONE ACTIVE PLAYER WITHOUT FOLD OR ALL-IN
      else {
        // FIND NEXT PLAYER'S INDEX
        let indexNextPlayer: number;
        let current = getNextIndex(activePlayerIndex, players);
        while (indexNextPlayer === undefined && current !== activePlayerIndex) {
          const { betState, didAnAction } = players[current];
          // MUST NOT SET AS NEXT PLAYER IF FOLDED, ALL-IN OR EVEN WITH TRUE DIDACTION
          if (
            betState === 5 ||
            betState === 6 ||
            (betState === 4 && didAnAction)
          ) {
            current = getNextIndex(current, players);
          } else indexNextPlayer = current;
        }

        // IF THERE IS A INDEX, SET NEW ACTIVE PLAYER, NO NEED TO CHANGE ANY OTHER STATE
        if (indexNextPlayer !== undefined)
          activeRound.activePlayer = players[indexNextPlayer]._id;
        else {
          // IF NO NEXT INDEX CHANGE TO NEXT STATE
          activeRound.roundState += 1;

          // FINISHED STATE
          if (activeRound.roundState === 5) {
            const winner = await this.compareHands(
              players,
              activeRound.tableCards,
            );
            setWinner(winner, activeRound);
          } else {
            // DEAL A NEW CARD IF NO FLOP
            if (activeRound.roundState !== 2)
              activeRound.tableCards.push(activeRound.deck.shift());
            // RESTORE DID AN ACTION
            for (const player of players) {
              player.didAnAction = false;
            }

            const dealerIndex = players.findIndex(
              (player) =>
                player._id.toString() === activeRound.dealer.toString(),
            );
            let current = getNextIndex(dealerIndex, players);
            let activeIndex: number;
            while (activeIndex === undefined) {
              const { betState } = players[current];
              if (betState === 6 || betState === 5)
                current = getNextIndex(current, players);
              else activeIndex = current;
            }

            activeRound.activePlayer = players[activeIndex]._id.toString();
          }
        }
      }

      /* ========================================================================================================== */
      /*
				===>>> SET TURN TIMEOUT <<<===
			*/
      if (activeRound.roundState !== 5) {
        activeRound.turnEndTime = new Date(Date.now() + room.turnTimeout);
        this.logger.warn(' ===>>> SETTING TIMEOUT');
        this.schedulerRegistry.addTimeout(
          `${TURN_END}-${activeRound.activePlayer.toString()}`,
          setTimeout(() => {
            this.logger.warn('FINISHING TURN');
            const activePlayer = players.find(
              (p) => p._id.toString() === activeRound.activePlayer.toString(),
            );
            let action: number;
            if (activePlayer.betState === 4) action = 5;
            else if (activePlayer.betState === 3) action = 7;
            this.eventEmitter.emit(
              AUTOMATIC_BET,
              roomId,
              activeRound.activePlayer.toString(),
              action,
              1,
            );
          }, room.turnTimeout),
        );
      }

      /* ========================================================================================================== */
      /*
				===>>> SAVE NEW STATE <<<===
			*/
      await this.pokerPlayerModel.bulkSave(players);
      await room.save();
      await activeRound.save();
      // This query is only needed for testing purposes
      const updatedRoom = await this.pokerRoomsModel.findById(roomId).populate({
        path: 'activeRound',
        populate: {
          path: 'players',
          populate: {
            path: 'betState',
            select: ['name', 'betActions'],
          },
        },
      });

      this.eventEmitter.emit('refresh-room', roomId);

      return { room: updatedRoom };
    } catch (err) {
      console.log(err);
      return { error: new InternalServerErrorException(err.message) };
    }
  }

  async compareHands(players: PokerPlayerDocument[], tableCards: string[]) {
    const Hand = require('pokersolver').Hand;

    const hands: any[] = [];
    for (const player of players) {
      // If folded
      if (player.betState === 6) continue;

      const playerHand = player.hand.concat(tableCards);
      const solvedHand = Hand.solve(playerHand);

      hands.push(solvedHand);
      player.solvedHand = solvedHand.toString();
      player.nameHand = solvedHand.name;
      player.solvedHandArray = solvedHand.toString().split(', ');
      player.descrHand = solvedHand.descr;
      player.rankHand = solvedHand.rank;
      await player.save();
    }

    const winnerHand = Hand.winners(hands);
    const winners = players.filter((player) =>
      winnerHand.some((h) => h.toString() === player.solvedHand),
    );
    return winners;
  }
}
