import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bet } from 'src/blackjack/interfaces/bet.interface';
import { StatsService } from 'src/stats/stats.service';
import { User } from 'src/users/interfaces/user.interface';
import { addCoins, addBetCoins, addBet } from './functions/addCoins.function';
import { checkBets } from './functions/checkBets.function';
import { calculateHand } from './functions/poker.functions';
import { reverseCoins } from './functions/reverseCoins.function';
import { PokerOffline } from './interfaces/poker_offline.interface';

const Deck = require('classic-deck');

@Injectable()
export class PokerOfflineService {
  constructor(
    private readonly statsService: StatsService,
    @InjectModel('PokerOffline')
    private readonly pokerOffline: Model<PokerOffline>,
    @InjectModel('User') private readonly users: Model<User>,
  ) {}
  async findAll(): Promise<PokerOffline[]> {
    return await this.pokerOffline.find();
  }
  async startGame(userId: string, bet: Bet): Promise<any> {
    return await this.pokerOffline
      .findOne({ userId: userId })
      .then(async (result) => {
        if (result == null) {
          const deck = new Deck().deck;
          deck.sort(() => Math.random() - 0.5);
          const user = await this.users.findOne({ _id: userId });
          if (user == null) {
            return { error: 'User not found' };
          }
          const check = checkBets(user.coins, bet);
          if (check && check.error) {
            return { error: check.error };
          }
          const game = new this.pokerOffline();
          const dealerHand = [deck[0], deck[1]];
          deck.splice(0, 2);
          const currenHand = [deck[0], deck[1]];
          deck.splice(0, 2);
          game.tie = false;
          game.userWon = false;
          game.dealerWon = false;
          game.userFloped = false;
          game.userId = userId;
          game.startBet = bet;
          game.bet = bet;
          game.dealerHand = dealerHand;
          game.currentHand = currenHand;
          game.deck = deck;
          user.coins = addCoins(user, game, -1);
          // await this.statsService.create(user._id, bet, 'Poker', 'Initial Bet');
          user.markModified('coins');
          await user.save();
          await game.save();
          const visibleGame = game;
          visibleGame.dealerHand = null;
          visibleGame.deck = null;
          return visibleGame;
        } else {
          const visibleGame = result;
          visibleGame.dealerHand = null;
          visibleGame.deck = null;
          return visibleGame;
        }
      });
  }
  async fold(userId: string): Promise<any> {
    return await this.pokerOffline
      .findOne({ userId: userId })
      .then(async (result) => {
        if (result == null) {
          return { error: 'No game found' };
        } else {
          const game = await this.pokerOffline.findOne({ userId });
          if (game.userFloped) {
            return { error: 'You cant Fold' };
          }
          await game.delete();
          return { success: 'Game deleted' };
        }
      });
  }

  async flop(userId: string): Promise<any> {
    return await this.pokerOffline
      .findOne({ userId: userId })
      .then(async (result) => {
        if (result == null) {
          return { error: 'No game found' };
        } else {
          const game = await this.pokerOffline.findOne({ userId });
          if (game.userFloped) {
            return { error: 'You already floped' };
          }
          const user = await this.users.findOne({ _id: userId });
          game.bet = addBet(game, 1);
          game.markModified('bet');
          const check = checkBets(user.coins, game.bet);
          if (check && check.error) {
            return { error: check.error };
          }
          // await this.statsService.create(user._id, game.bet, 'Poker', 'Flop');
          game.bet = addBet(game, 1);
          game.markModified('bet');
          user.coins = addCoins(user, game, -2);
          user.markModified('coins');
          game.userFloped = true;
          game.deckHand = [game.deck[0], game.deck[1], game.deck[2]];
          game.deck.splice(0, 3);
          await user.save();
          await game.save();
          const visibleGame = game;
          visibleGame.dealerHand = null;
          visibleGame.deck = null;
          return visibleGame;
        }
      });
  }

  async bet(userId: string): Promise<any> {
    return await this.pokerOffline
      .findOne({ userId: userId })
      .then(async (result) => {
        if (result == null) {
          return { error: 'No game found' };
        } else {
          const game = await this.pokerOffline.findOne({ userId });
          if (!game.userFloped) {
            return { error: "You didn't floped" };
          }
          const user = await this.users.findOne({ _id: userId });
          game.bet = addBet(game, 1); //adds bet
          game.markModified('bet');
          const check = checkBets(user.coins, game.startBet); // checks if bet is valid. this should be done BEFORE adding the bet to the game
          if (check && check.error) {
            return { error: check.error };
          }
          if (game.deckHand.length == 3) {
            game.deckHand.push(game.deck[0]);
            game.deck.splice(0, 1);
            game.markModified('deckHand');
            game.markModified('deck');
            user.coins = addCoins(user, game, -1);
            user.markModified('coins');
            await user.save();
            // await this.statsService.create(user._id, game.startBet, 'Poker', 'Bet');
          } else if (game.deckHand.length == 4) {
            game.deckHand.push(game.deck[0]);
            game.deck.splice(0, 1);
            game.markModified('deckHand');
            game.markModified('deck');
            user.coins = addCoins(user, game, -1);
            user.markModified('coins');
            await user.save();
            // await this.statsService.create(user._id, game.startBet, 'Poker', 'Bet');
            const results = calculateHand(game);
            if (results.winner == 'user') {
              game.userWon = true;
              game.markModified('userWon');
              const wonAmount = game.bet;
              for (const property in wonAmount) {
                wonAmount[property] -= game.startBet[property];
                wonAmount[property] *= 2;
              }
              user.coins = addBetCoins(user, wonAmount);
              user.markModified('coins');
              await user.save();
              // await this.statsService.create(user._id, reverseCoins(wonAmount), 'Poker', 'User Won');
            } else if (results.winner == 'tie') {
              game.tie = true;
              user.coins = addBetCoins(user, game.bet);
              const wonAmount = game.bet;
              user.markModified('coins');
              for (const property in wonAmount) {
                wonAmount[property] -= game.startBet[property];
              }
              await user.save();
              // await this.statsService.create(user._id, reverseCoins(wonAmount), 'Poker', 'Tie');
            } else {
              game.dealerWon = true;
              game.markModified('dealerWon');
            }
            game.deck = null;
            const visibleGame = game;
            game.delete();
            return { winnerHand: results.winnerHand, game: visibleGame };
          }
          await user.save();
          await game.save();
          const visibleGame = game;
          visibleGame.dealerHand = null;
          visibleGame.deck = null;
          return visibleGame;
        }
      });
  }

  async check(userId: string): Promise<any> {
    return await this.pokerOffline
      .findOne({ userId: userId })
      .then(async (result) => {
        if (result == null) {
          return { error: 'No game found' };
        } else {
          const game = await this.pokerOffline.findOne({ userId });
          if (!game.userFloped) {
            return { error: "You didn't floped" };
          }
          const user = await this.users.findOne({ _id: userId });
          if (game.deckHand.length == 3) {
            game.deckHand.push(game.deck[0]);
            game.deck.splice(0, 1);
            game.markModified('deckHand');
            game.markModified('deck');
          } else if (game.deckHand.length == 4) {
            game.deckHand.push(game.deck[0]);
            game.deck.splice(0, 1);
            game.markModified('deckHand');
            game.markModified('deck');
            const results = calculateHand(game);
            if (results.winner == 'user') {
              game.userWon = true;
              game.markModified('userWon');
              const wonAmount = game.bet;
              for (const property in wonAmount) {
                wonAmount[property] -= game.startBet[property];
                wonAmount[property] *= 2;
              }
              user.coins = addBetCoins(user, wonAmount);
              user.markModified('coins');
              await user.save();
              // await this.statsService.create(user._id, reverseCoins(wonAmount), 'Poker', 'User Won');
            } else if (results.winner == 'tie') {
              game.tie = true;
              user.coins = addBetCoins(user, game.bet);
              const wonAmount = game.bet;
              user.markModified('coins');
              for (const property in wonAmount) {
                wonAmount[property] -= game.startBet[property];
              }
              await user.save();
              // await this.statsService.create(user._id, reverseCoins(wonAmount), 'Poker', 'Tie');
            } else {
              game.dealerWon = true;
              game.markModified('dealerWon');
            }
            game.deck = null;
            const visibleGame = game;
            game.delete();
            return { winnerHand: results.winnerHand, game: visibleGame };
          }
          await user.save();
          await game.save();
          const visibleGame = game;
          visibleGame.dealerHand = null;
          visibleGame.deck = null;
          return visibleGame;
        }
      });
  }
}
