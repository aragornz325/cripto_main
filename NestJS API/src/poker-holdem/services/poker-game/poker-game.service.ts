import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { PokerHoldemGateway } from 'src/poker-holdem/adapters/poker-holdem.gateway';
import { AUTOMATIC_BET } from 'src/poker-holdem/constants/events';
import { TURN_END } from 'src/poker-holdem/constants/timeouts';
import {
  PokerPlayer,
  PokerPlayerDocument,
} from 'src/poker-holdem/schemas/poker-player.schema';
import { PokerRoomDocument } from 'src/poker-holdem/schemas/poker-room.schema';
import {
  PokerRound,
  PokerRoundDocument,
} from 'src/poker-holdem/schemas/poker-round.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { PokerRoomsService } from '../poker-rooms/poker-rooms.service';

const Deck = require('classic-deck');

@Injectable()
export class PokerGameService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('PokerRoom') private pokerRoomModel: Model<PokerRoomDocument>,
    @InjectModel('PokerRound')
    private pokerRoundModel: Model<PokerRoundDocument>,
    @InjectModel('PokerPlayer')
    private pokerPlayerModel: Model<PokerPlayerDocument>,
    @Inject(forwardRef(() => PokerHoldemGateway))
    private pokerSocket: PokerHoldemGateway,
    @Inject(forwardRef(() => PokerRoomsService))
    private pokerRoomsService: PokerRoomsService,
    private eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(PokerGameService.name);

  @OnEvent('start-room')
  async startGame(roomId: string) {
    try {
      try {
        const timeout = this.schedulerRegistry.getTimeout(`start-${roomId}`);
        if (timeout) this.schedulerRegistry.deleteTimeout(`start-${roomId}`);
      } catch (err) {
        this.logger.error(err);
      }
      const room = await this.pokerRoomModel
        .findById(roomId)
        .populate<{ players: PokerPlayerDocument[] }>('players')
        .populate({
          path: 'activeRound',
          model: PokerRound.name,
          populate: [
            {
              path: 'players',
              model: PokerPlayer.name,
            },
            {
              path: 'dealer',
              model: PokerPlayer.name,
            },
          ],
        });
      if (!room) return { error: new NotFoundException('Room was not found') };

      room.startTime = null;
      if (room.activeRound && room.activeRound.roundState !== 5) {
        await room.save();
        return {
          error: new ConflictException('Room already has an active round.'),
        };
      }

      // Don't check in first round

      const sockets = await this.pokerSocket.server.in(roomId).fetchSockets();

      const checkedPlayers: PokerPlayerDocument[] = [];
      // Kicks out players with roomBalnce lower than entryPrice * 2 and no connected sockets
      for (const player of room.players) {
        const canStay =
          player.roomBalance > room.entryPrice * 2 &&
          sockets.some((s) => s.data.playerId === player._id.toString());
        if (!canStay) {
          const user = await this.userModel.findById(player.user);
          room.availableSeats.push(player.seat);
          player.seat = null;
          user.balance = player.roomBalance;
          player.roomBalance = 0;
          user.save();
        } else {
          checkedPlayers.push(player);
        }
      }

      room.players = checkedPlayers;
      await room.populate('players');

      if (room.players.length < 2) {
        room.roomState = 1;
        room.activeRound = null;
        await room.save();
        this.eventEmitter.emit('refresh-room', roomId);
        return {
          error: new ConflictException(
            'Room cannot start because there are not sufficient players.',
          ),
        };
      }

      // We are gonna work with an ordered by seats players array;
      room.players.sort((a, b) => a.seat - b.seat);
      const getNextIndex = (index: number, array: any[]) =>
        index === array.length - 1 ? 0 : index + 1;
      let dealer: string; // Let's find dealer and small blind
      let dealerSeat: number;
      let activePlayer: string;
      let nextDealerIndex: number;
      let nextActivePlayerIndex: number;
      if (!room.activeRound) {
        // if there isn't a finished activeRound just set first and second in array
        dealer = room.players[0]._id;
        nextDealerIndex = 0;
        dealerSeat = room.players[0].seat;

        activePlayer = room.players[1]._id;
        nextActivePlayerIndex = 1;
      } else {
        // else we need to find the next seat to previous dealer.
        const previousDealerSeat = room.activeRound.dealerSeat;
        const previousDealerIndex = room.players.findIndex(
          (player) => player.seat === previousDealerSeat,
        );
        if (previousDealerIndex > -1) {
          // If previous dealer still in room
          nextDealerIndex = getNextIndex(previousDealerIndex, room.players);
          dealer = room.players[nextDealerIndex]._id;
          dealerSeat = room.players[nextDealerIndex].seat;
          nextActivePlayerIndex = getNextIndex(nextDealerIndex, room.players);
          activePlayer = room.players[nextActivePlayerIndex]._id;
        } else {
          // If previous dealer not in room
          let currentSeat =
            previousDealerSeat === room.maxPlayers ? 1 : previousDealerSeat + 1;

          while (!dealerSeat) {
            // We are gonna find the next occupied seat
            nextDealerIndex = room.players.findIndex(
              (player) => player.seat === currentSeat,
            );
            console.log({ nextDealerIndex });
            if (nextDealerIndex > -1) dealerSeat = currentSeat;
            else
              currentSeat =
                currentSeat === room.maxPlayers ? 1 : currentSeat + 1;
            console.log('searching seat');
          }

          dealer = room.players[nextDealerIndex]._id;
          nextActivePlayerIndex = getNextIndex(nextDealerIndex, room.players);
          activePlayer = room.players[nextActivePlayerIndex]._id;
        }
      }

      const deck = new Deck();
      const newRound = await this.pokerRoundModel.create({
        room: room._id,
        players: room.players,
        dealer,
        activePlayer,
        dealerSeat,
        roundState: 1,
        currentBet: room.entryPrice,
        deck: deck.deck,
      });

      // Couldn't find a way for saving subdocs from saving parent doc.
      // Idea was update the newRound.players array and saving from newRound.save()
      // SMALL-BLIND
      const sbPlayer = await this.pokerPlayerModel.findOneAndUpdate(
        { _id: activePlayer },
        { betState: 1 },
      );
      // BIG-BLIND
      const bigBlindIndex = getNextIndex(nextActivePlayerIndex, room.players);
      const bbPlayer = await this.pokerPlayerModel.findOneAndUpdate(
        { _id: room.players[bigBlindIndex]._id },
        { betState: 2 },
      );

      // Because blinds are automatic, we need to set the true activePlayer
      const newActivePlayerIndex = getNextIndex(bigBlindIndex, room.players);
      newRound.activePlayer = room.players[newActivePlayerIndex]._id.toString();

      // DEAL CARDS
      const players = await this.pokerPlayerModel.find({
        _id: { $in: newRound.players },
      });
      for (const player of players) {
        player.hand = newRound.deck.splice(0, 2);

        // This check if player is joining in this round to set betState to BIG BLIND
        if (room.activeRound) {
          const wasInPreviousRoom = room.activeRound.players.some(
            (p) => p._id.toString() === player._id.toString(),
          );
          if (!wasInPreviousRoom) player.betState = 2;
        }

        if (player.betState === 1) {
          const bet = room.entryPrice / 2;
          player.currentBet = bet;
          player.roomBalance -= bet;
          player.didAnAction = true;
          player.betState = 3;
          newRound.pot += bet;
          newRound.smallBlind = player._id;
          await newRound.save();
        } else if (player.betState === 2) {
          const bet = room.entryPrice;
          player.currentBet = bet;
          player.roomBalance -= bet;
          player.didAnAction = true;
          player.betState = 4;
          newRound.pot += bet;
          newRound.bigBlind.push(player._id);
          await newRound.save();
        } else {
          player.betState = 3;
          player.currentBet = 0;
        }
        player.solvedHand = '';
        player.nameHand = '';
        player.solvedHandArray = [];
        player.descrHand = '';
        player.rankHand = null;

        await player.save();
      }
      newRound.tableCards = newRound.deck.splice(0, 3);

      room.activeRound = newRound._id;
      room.rounds = room.rounds.concat(newRound._id);
      room.roomState = 2;

      this.logger.warn(' ===>>> SETTING TIMEOUT');
      newRound.turnEndTime = new Date(Date.now() + room.turnTimeout);
      this.schedulerRegistry.addTimeout(
        `${TURN_END}-${newRound.activePlayer.toString()}`,
        setTimeout(() => {
          this.eventEmitter.emit(
            AUTOMATIC_BET,
            roomId,
            newRound.activePlayer.toString(),
            7,
            1,
          );
        }, room.turnTimeout),
      );

      await room.save();
      await newRound.save();

      await newRound.populate({
        path: 'players',
        populate: 'betState',
      });

      this.eventEmitter.emit('refresh-room', roomId);

      return { newRound };
    } catch (err) {
      this.logger.error(err);
      return { error: new InternalServerErrorException(err.message) };
    }
  }
}
