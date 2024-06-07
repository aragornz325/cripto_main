import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blackjack } from './interfaces/blackjack.interface';
import { shuffle, newDecks } from '52-deck';
import { getHandValue } from './functions/hand-value.function';
import { User } from '../users/interfaces/user.interface';
import { StatsService } from 'src/stats/stats.service';
import addUserBalance from './functions/addBalance.function';

@Injectable()
export class BlackjackService {
  constructor(
    private readonly statsService: StatsService,
    @InjectModel('Blackjack') private readonly blackjack: Model<Blackjack>,
    @InjectModel('User') private readonly users: Model<User>,
  ) {}

  async findAll(): Promise<Blackjack[]> {
    return await this.blackjack.find();
  }

  async startGame(userId: string, bet: Array<number>, games: []): Promise<any> {
    return await this.blackjack
      .findOne({ userId }) // Verify that the user does not have a game already
      .then(async (result) => {
        if (result === null) {
          let deck = shuffle(newDecks(1)); // Create deck
          const user = await this.users.findOne({ _id: userId }); // Get user
          if (user.balance < bet[0] + bet[1] + bet[2]) {
            // Check that user has enough balance to play
            return { error: 'Balance is lower than bets' };
          }
          games.map((g, i) => {
            // Check that all initialized games have a valid bet
            if (g && bet[i] <= 0) {
              return {
                error: `Game ${i + 1} is started but bet is not received`,
              };
            }
          });
          deck = shuffle(deck); // Shuffle deck
          const game = await this.blackjack.create({
            userId,
            games,
            bet,
            dealerHandValue: getHandValue([deck[0], deck[1]]),
            dealerHand: [deck[0], deck[1]],
            deck: deck.slice(2, deck.length - 1),
          }); // Create new game
          const lastIndex = game.games[2]
            ? 2
            : game.games[1]
            ? 1
            : game.games[0]
            ? 0
            : -1;
          for (let i = 0; i < 3; i++) {
            game.userStand[i] = !game.games[i]; // Stand uninitialized games
            if (games[i]) {
              addUserBalance(user, game, i, -1); // Take bet from user balance
              const currentHand = [game.deck[0], game.deck[1]]; // Take 2 cards for player's hand
              game.deck = game.deck.slice(2); // Remove 2 cards from deck
              if (currentHand[0].value == currentHand[1].value) {
                // Check for split availability
                game.hasPair[i] = true;
              }
              if (currentHand[0].value + currentHand[1].value <= 11) {
                // Check for double availability
                game.canDouble[i] = true;
              }
              const handValue = getHandValue(currentHand); // Calculate hand value
              console.log({ currentHand })
              console.log({ handValue74: handValue })
              game.currentHand[i] = currentHand; // Load hand to game
              game.currentHandValue[i] = handValue; // Load hand value to game
              console.log({ game })
              if (game.dealerHandValue == 21) {
                // Check for dealer blackjack
                game.dealerHasBlackjack = true;
              }
              if (handValue == 21) {
                // Check for user blackjack
                game.userHasBlackjack[i] = true;
                game.userStand[i] = true;
                console.log('USER HAS BLACKJACK')
                console.log({ game })
                if (lastIndex === i) {
                  await game.save()
                  return this.finish(game.userId);
                }
              }
              if (game.userHasBlackjack[i] && game.dealerHasBlackjack) {
                // Check for tie at startpoint
                game.tie[i] = true;
              } else if (game.userHasBlackjack[i]) {
                // Set winning status for user on BJ
                game.userWon[i] = true;
              } else if (game.dealerHasBlackjack) {
                // Set winning status for dealer on BJ
                game.dealerWon[i] = true;
              }
            }
          }
          await user.save(); // Save user
          await game.save(); // Save game
          const visibleNewBlackjack = game;
          visibleNewBlackjack.deck = null;
          visibleNewBlackjack.dealerHand[1] = null;
          visibleNewBlackjack.dealerHandValue = getHandValue([
            visibleNewBlackjack.dealerHand[0],
          ]);
          return visibleNewBlackjack;
        } else {
          // Give game data if already exists
          const visibleResult = result;
          visibleResult.deck = null;
          visibleResult.dealerHand[1] = null;
          visibleResult.dealerHandValue = getHandValue([
            visibleResult.dealerHand[0],
          ]);
          return result;
        }
      });
  }

  async stand(userId: string, index: number): Promise<any> {
    return await this.blackjack.findOne({ userId }).then(async (result) => {
      if (result === null) {
        // Check that game exists
        return { error: 'This game does not exist' };
      } else {
        const game = await this.blackjack.findOne({ userId }); // Load game
        if (game.userIsBusted[index]) {
          // Check that hand is not busted
          return { error: 'This hand is busted' };
        }
        if (game.userStand[index]) {
          // Check that hand is not standing
          return { error: 'This hand is already standing' };
        }
        game.hasPair[index] = false; // Disable split
        game.userStand[index] = true; // Set stand as true
        if (!game.userStand.includes(false)) {
          // Check if all hands are standing
          await game.save();
          return this.finish(userId);
        } else {
          await game.save();
          return game;
        }
      }
    });
  }

  async hit(userId: string, index: number): Promise<any> {
    return await this.blackjack.findOne({ userId }).then(async (result) => {
      if (result === null) {
        // Check that game exists
        return { error: "This user doesn't have a game yet" };
      } else {
        const game = await this.blackjack.findOne({ userId }); // Load game
        if (game.userIsBusted[index]) {
          // Check that hand is not busted
          return { error: 'This hand is busted' };
        }
        if (game.userStand[index]) {
          // Check that hand is not standing
          return { error: 'This hand is already standing' };
        }
        game.canDouble[index] = false; // Disable double
        game.markModified('canDouble');
        game.hasPair[index] = false; // Disable split
        game.currentHand[index] = [...game.currentHand[index], game.deck[0]]; // Add card to hand
        game.deck = game.deck.slice(1); // Remove card from deck
        game.currentHandValue[index] = getHandValue(game.currentHand[index]); // Add card value to hand value
        if (game.currentHandValue[index] > 21) {
          // Check if user busted
          game.userStand[index] = true;
          game.userIsBusted[index] = true;
          game.dealerWon[index] = true;
          if (!game.userStand.includes(false)) {
            // Check if all hands are standing
            await game.save();
            return this.finish(userId);
          }
        } else if (game.currentHandValue[index] === 21) {
          // Check if user got BJ
          game.userHasBlackjack[index] = true;
          game.handStand[index] = true;
          if (!game.userStand.includes(false)) {
            // Check if all hands are standing
            await game.save();
            return this.finish(userId);
          }
        }
        await game.save(); // Save game
        const visibleResult = game;
        visibleResult.deck = null;
        visibleResult.dealerHand[1] = null;
        visibleResult.dealerHandValue = getHandValue([
          visibleResult.dealerHand[0],
        ]);
        return visibleResult;
      }
    });
  }

  async double(userId: string, index: number): Promise<any> {
    return await this.blackjack.findOne({ userId }).then(async (result) => {
      if (result == null) {
        return { error: "This user doesn't have a game yet" };
      } else {
        const user = await this.users.findById(userId);
        const game = await this.blackjack.findOne({ userId });
        if (game.canDouble[index] == true) {
          game.hasPair[index] = false;
          game.userStand[index] = true;
          let allStand = true;
          const deck = game.deck;
          const currentHand = game.currentHand[index];
          currentHand.push(deck[0]);
          game.currentHand[index] = currentHand;
          deck.splice(0, 1);
          game.currentHandValue[index] = getHandValue(game.currentHand[index]);
          if (game.currentHandValue[index] > 21) {
            game.userIsBusted[index] = true;
          } else if (game.currentHandValue[index] == 21) {
            game.userHasBlackjack[index] = true;
          }
          game.deck = deck;
          addUserBalance(user, game, index, -1);
          await user.save();
          game.bet[index] *= 2;
          game.markModified('bet');
          await game.save();
          for (let i = 0; i < 3; i++) {
            if (game.games[i] && !game.userStand[i]) {
              allStand = false;
            }
          }
          if (allStand) {
            await game.save();
            return this.finish(userId);
          }
          const visibleResult = game;
          visibleResult.dealerHand[1] = null;
          visibleResult.dealerHandValue = getHandValue([
            visibleResult.dealerHand[0],
          ]);
          visibleResult.deck = null;
          return visibleResult;
        } else {
          return { error: "You can't double this hand" };
        }
      }
    });
  }

  async split(userId: string, index: number): Promise<any> {
    return await this.blackjack.findOne({ userId }).then(async (result) => {
      if (result == null) {
        return { error: "This user doesn't have a game yet" };
      } else {
        const game = await this.blackjack.findOne({ userId });
        if (game.hasPair[index]) {
          const user = await this.users.findOne({ _id: userId });
          game.hasPair[index] = false;
          addUserBalance(user, game, index, -1);
          game.bet[index] *= 2;
          game.markModified('bet');
          game.userSplitted[index] = true;
          game.userIsBusted[index] = [false, false];
          game.userWon[index] = [false, false];
          game.canDouble[index] = [false, false];
          game.handStand[index] = [false, false];
          game.dealerWon[index] = [false, false];
          game.userHasBlackjack[index] = [false, false];
          game.handStand[index] = [false, false];
          game.tie[index] = [false, false];
          game.currentHandValue[index] = [0, 0];
          game.currentHand[index] = [
            [game.currentHand[index][0], game.deck[0]],
            [game.currentHand[index][1], game.deck[1]],
          ];
          game.deck.splice(0, 2);
          for (let i = 0; i < game.currentHand[index].length; i++) {
            if (
              game.currentHand[index][i][0].value +
                game.currentHand[index][i][1].value <=
              11
            ) {
              game.canDouble[index][i] = true;
              game.markModified('canDouble');
            }
            game.currentHandValue[index][i] = getHandValue(
              game.currentHand[index][i],
            );
            game.markModified('currentHandValue');
            if (game.currentHandValue[index][i] == 21) {
              game.userHasBlackjack[index][i] = true;
              game.markModified('userHasBlackjack');
              game.handStand[index][i] = true;
              game.markModified('handStand');
            }
            if (game.handStand[index].indexOf(false) === -1) {
              game.userStand[index] = true;
              game.markModified('userStand');
            }
          }
          await user.save();
          await game.save();
          const visibleNewBlackjack = game;
          visibleNewBlackjack.dealerHand[1] = null;
          visibleNewBlackjack.dealerHandValue = getHandValue([
            visibleNewBlackjack.dealerHand[0],
          ]);
          visibleNewBlackjack.deck = null;
          return visibleNewBlackjack;
        } else {
          return { error: "You can't split a hand that doesn't have a pair" };
        }
      }
    });
  }

  async splitStand(
    userId: string,
    index: number,
    handIndex: number,
  ): Promise<any> {
    return await this.blackjack.findOne({ userId }).then(async (result) => {
      if (result == null) {
        return { error: "This user doesn't have a game yet" };
      } else {
        const game = await this.blackjack.findOne({ userId });
        if (game.userIsBusted[index][handIndex]) {
          return { error: 'This hand is busted' };
        }
        if (game.handStand[index][handIndex]) {
          return { error: 'This hand is already standing' };
        }
        game.handStand[index][handIndex] = true;
        if (game.handStand[index].indexOf(false) === -1) {
          game.userStand[index] = true;
          game.markModified('userStand');
        }
        let allStand = false;
        if (game.userStand.indexOf(false) < 0) {
          allStand = true;
        }
        game.markModified('handStand');
        await game.save();
        if (allStand) {
          await game.save();
          return this.finish(userId);
        }
        return game;
        // return {success: "Hand is standing"};
      }
    });
  }

  async splitHit(
    userId: string,
    index: number,
    handIndex: number,
  ): Promise<any> {
    return await this.blackjack.findOne({ userId }).then(async (result) => {
      if (result == null) {
        return { error: "This user doesn't have a game yet" };
      } else {
        const game = await this.blackjack.findOne({ userId });
        if (game.handStand[index][handIndex]) {
          return { error: 'This hand is already standing' };
        }
        if (game.userIsBusted[index][handIndex]) {
          return { error: 'This hand is busted' };
        }
        const deck = game.deck;
        game.canDouble[index][handIndex] = false;
        game.markModified('canDouble');
        const currentHand = game.currentHand[index][handIndex];
        currentHand.push(deck[0]);
        game.currentHand[index][handIndex] = currentHand;
        game.markModified('currentHand');
        deck.splice(0, 1);
        const handValue = getHandValue(currentHand);
        await game.save();
        game.currentHandValue[index][handIndex] = handValue;
        game.markModified('currentHandValue');
        if (handValue > 21) {
          let allStand = true;
          game.handStand[index][handIndex] = true;
          game.markModified('handStand');
          game.userIsBusted[index][handIndex] = true;
          game.markModified('userIsBusted');
          game.dealerWon[index][handIndex] = true;
          game.markModified('dealerWon');
          game.deck = deck;
          game.markModified('deck');
          await game.save();
          if (game.handStand[index][0] && game.handStand[index][1]) {
            game.userStand[index] = true;
            game.markModified('userStand');
            await game.save();
          }
          for (let i = 0; i < 3; i++) {
            if (game.games[i] && !game.userStand[i]) {
              allStand = false;
            }
          }
          if (allStand) {
            await game.save();
            return this.finish(userId);
          }
          const visibleResult = game;
          visibleResult.deck = null;
          return visibleResult;
        } else if (handValue == 21) {
          game.userHasBlackjack[index][handIndex] = true;
          game.markModified('userHasBlackjack');
          game.handStand[index][handIndex] = true;
          game.markModified('handStand');
          game.deck = deck;
          await game.save();
          if (game.handStand[index][0] && game.handStand[index][1]) {
            game.userStand[index] = true;
          }
          let allStand = true;
          if (game.userStand.indexOf(true)) {
            allStand = false;
          }
          if (allStand) {
            await game.save();
            return this.finish(userId);
          }
          const visibleResult = game;
          visibleResult.dealerHand[1] = null;
          visibleResult.dealerHandValue = getHandValue([
            visibleResult.dealerHand[0],
          ]);
          visibleResult.deck = null;
          return visibleResult;
        } else {
          game.deck = deck;
          await game.save();
          const visibleResult = game;
          visibleResult.deck = null;
          visibleResult.dealerHand[1] = null;
          visibleResult.dealerHandValue = getHandValue([
            visibleResult.dealerHand[0],
          ]);
          return visibleResult;
        }
      }
    });
  }

  async splitDouble(
    userId: string,
    index: number,
    handIndex: number,
  ): Promise<any> {
    return await this.blackjack.findOne({ userId }).then(async (result) => {
      if (result == null) {
        return { error: "This user doesn't have a game yet" };
      } else {
        const game = await this.blackjack.findOne({ userId });
        if (!game.canDouble[index][handIndex]) {
          return { error: "You can't double this hand" };
        } else {
          if (game.handStand[index][handIndex]) {
            return {
              error: "You can't double a hand that is already standing",
            };
          } else {
            const user = await this.users.findById(userId);
            addUserBalance(user, game, index, -1);
            await user.save();
            game.handStand[index][handIndex] = true;
            game.markModified('handStand');
            const deck = game.deck;
            const currentHand = game.currentHand[index][handIndex];
            currentHand.push(deck[0]);
            game.currentHand[index][handIndex] = currentHand;
            game.markModified('currentHand');
            deck.splice(0, 1);
            game.currentHandValue[index][handIndex] = getHandValue(
              game.currentHand[index][handIndex],
            );
            game.markModified('currentHandValue');
            if (game.currentHandValue[index][handIndex] > 21) {
              game.userIsBusted[index][handIndex] = true;
              game.markModified('userIsBusted');
            } else if (game.currentHandValue[index][handIndex] == 21) {
              game.userHasBlackjack[index][handIndex] = true;
              game.markModified('userHasBlackjack');
            }
            game.deck = deck;
            let allStand = true;
            if (game.handStand[index].indexOf(false) === -1) {
              game.userStand[index] = true;
            }
            game.markModified('userStand');
            for (let i = 0; i < 3; i++) {
              if (game.games[i] && !game.userStand[i]) {
                allStand = false;
              }
            }
            await game.save();
            if (allStand) {
              await game.save();
              return this.finish(userId);
            }
            const visibleResult = game;
            visibleResult.dealerHand[1] = null;
            visibleResult.dealerHandValue = getHandValue([
              visibleResult.dealerHand[0],
            ]);
            visibleResult.deck = null;
            return visibleResult;
          }
        }
      }
    });
  }

  async finish(userId: string) {
    return await this.blackjack.findOne({ userId }).then(async (result) => {
      if (result == null) {
        return { error: "This user doesn't have a game yet" };
      } else {
        const game = await this.blackjack.findOne({ userId });
        const user = await this.users.findById(userId);
        const deck = game.deck;
        let maxValue = 0;
        for (let i = 0; i < 3; i++) {
          if (game.games[i]) {
            if (game.userSplitted[i]) {
              for (let j = 0; j < 3; j++) {
                if (game.currentHandValue[i][j] > maxValue) {
                  maxValue = game.currentHandValue[i][j];
                }
              }
            } else {
              if (
                !game.userIsBusted[i] &&
                game.currentHandValue[i] > maxValue
              ) {
                maxValue = game.currentHandValue[i];
              }
            }
          }
        }
        while (game.dealerHandValue < 17) {
          game.dealerHand.push(deck[0]);
          deck.splice(0, 1);
          game.dealerHandValue = getHandValue(game.dealerHand);
        }
        console.log({ dealerHandValue: game.dealerHandValue })
        if (game.dealerHandValue > 21) {
          console.log('DEALER BUSTED')
          // DEALER BUSTED
          game.dealerIsBusted = true;
          for (let i = 0; i < 3; i++) {
            if (game.games[i]) {
              if (game.userSplitted[i]) {
                // USER SPLIT
                for (let j = 0; j < 2; j++) {
                  if (!game.userIsBusted[i][j]) {
                    if (game.userHasBlackjack[i][j]) {
                      // USER BLACKJACK
                      game.dealerWon[i][j] = false;
                      game.markModified('dealerWon');
                      game.userWon[i][j] = true;
                      game.markModified('userWon');
                      addUserBalance(user, game, i, 1.25);
                      await user.save();
                    } else {
                      // USER WON
                      game.dealerWon[i][j] = false;
                      game.markModified('dealerWon');
                      game.userWon[i][j] = true;
                      game.markModified('userWon');
                      addUserBalance(user, game, i, 1);
                      await user.save();
                    }
                  } else {
                    // USER LOST
                    game.dealerWon[i][j] = true;
                    game.markModified('dealerWon');
                    game.userWon[i][j] = false;
                    game.markModified('userWon');
                    await game.save();
                  }
                }
              } else {
                if (!game.userIsBusted[i]) {
                  if (game.userHasBlackjack[i]) {
                    // USER BLACKJACK
                    game.dealerWon[i] = true;
                    game.userWon[i] = true;
                    addUserBalance(user, game, i, 2.5);
                    await user.save();
                  } else {
                    // USER WON
                    game.dealerWon[i] = false;
                    game.userWon[i] = true;
                    addUserBalance(user, game, i, 2);
                    await user.save();
                  }
                } else {
                  // DEALER WON
                  game.dealerWon[i] = true;
                  game.userWon[i] = false;
                  await user.save();
                }
              }
            }
          }
        } else if (game.dealerHandValue == 21) {
          console.log('DEALER BLACKJACK')
          game.dealerHasBlackjack = true;
          for (let i = 0; i < 3; i++) {
            if (game.games[i]) {
              if (game.userSplitted[i]) {
                // USER SPLIT
                for (let j = 0; j < 2; j++) {
                  if (game.userHasBlackjack[i][j]) {
                    // BLACKJACK TIE
                    game.tie[i][j] = [true];
                    user.markModified('tie');
                    addUserBalance(user, game, i, 0.5);
                    await user.save();
                  } else {
                    // DEALER WON
                    game.dealerWon[i][j] = true;
                    user.markModified('dealerWon');
                    await user.save();
                  }
                }
              } else {
                if (game.userHasBlackjack[i]) {
                  // BLACKJACK TIE
                  game.tie[i] = true;
                  addUserBalance(user, game, i, 1);
                  await user.save();
                } else if (!game.userHasBlackjack[i]) {
                  // DEALER WON
                  game.userIsBusted[i] = true;
                  game.dealerWon[i] = true;
                  await user.save();
                }
              }
            }
          }
        } else {
          console.log('DEALER LOWER 21')
          for (let i = 0; i < 3; i++) {
            if (game.games[i]) {
              if (game.userSplitted[i]) {
                // USER SPLIT
                for (let j = 0; j < 2; j++) {
                  if (
                    game.currentHandValue[i][j] > game.dealerHandValue &&
                    !game.userIsBusted[i][j]
                  ) {
                    if (game.userHasBlackjack[i][j]) {
                      // USER BLACKJACK
                      game.userWon[i][j] = true;
                      user.markModified('userWon');
                      addUserBalance(user, game, i, 1.25);
                      await user.save();
                    } else {
                      // USER WON
                      game.userWon[i][j] = true;
                      user.markModified('userWon');
                      addUserBalance(user, game, i, 1);
                      await user.save();
                    }
                  } else if (
                    game.currentHandValue[i][j] == game.dealerHandValue
                  ) {
                    // TIE
                    game.tie[i][j] = true;
                    user.markModified('tie');
                    addUserBalance(user, game, i, 0.5);
                    await user.save();
                  } else {
                    // DEALER WON
                    game.dealerWon[i][j] = true;
                    user.markModified('dealerWon');
                    await user.save();
                  }
                }
              } else {
                if (
                  game.currentHandValue[i] > game.dealerHandValue &&
                  !game.userIsBusted[i]
                ) {
                  if (game.userHasBlackjack[i]) {
                    // USER BLACKJACK
                    game.userWon[i] = true;
                    user.markModified('userWon');
                    addUserBalance(user, game, i, 2.5);
                    await user.save();
                  } else {
                    // USER WON
                    game.userWon[i] = true;
                    addUserBalance(user, game, i, 2);
                    await user.save();
                  }
                } else if (game.currentHandValue[i] == game.dealerHandValue) {
                  // TIE
                  game.tie[i] = true;
                  addUserBalance(user, game, i, 1);
                  await user.save();
                } else if (game.currentHandValue[i] < game.dealerHandValue) {
                  // DEALER WON
                  game.dealerWon[i] = true;
                }
              }
            }
          }
        }
        const visibleResult = game;
        game.markModified('tie');
        await game.delete();
        visibleResult.deck = null;
        return visibleResult;
      }
    });
  }
}
