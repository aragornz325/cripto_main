import { User } from 'src/users/interfaces/user.interface';
import { Blackjack } from '../interfaces/blackjack.interface';
import { getHandValue } from './hand-value.function';
/*
async function gameTie(game: import("mongoose").Document<any, any, Blackjack> & Blackjack & { _id: import("mongoose").Types.ObjectId; }, user: import("mongoose").Document<any, any, User> & User & { _id: import("mongoose").Types.ObjectId; }, deck: any[]) {
    game.tie = true;
    for (let coin in game.bet) {
        game.bet[coin] = game.bet[coin];
    }
    for (let coin in user.blackJackCoins) {
        user.blackJackCoins[coin] += game.bet[coin];
    }
    game.deck = deck;
    user.markModified('blackJackCoins');
    await user.save();
    let visibleResult = game;
    visibleResult.deck = null;
    await game.delete();
    return visibleResult;
}

async function gameBlackjackWin(game: import("mongoose").Document<any, any, Blackjack> & Blackjack & { _id: import("mongoose").Types.ObjectId; }, user: import("mongoose").Document<any, any, User> & User & { _id: import("mongoose").Types.ObjectId; }, deck: any) {
    game.userWon = true;
    for (let coin in game.bet) {
        game.bet[coin] = game.bet[coin] * 2;
    }
    for (let coin in user.blackJackCoins) {
        user.blackJackCoins[coin] += game.bet[coin];
    }
    game.deck = deck;
    user.markModified('blackJackCoins');
    await user.save();
    let visibleResult = game;
    visibleResult.deck = null;
    await game.delete();
    return visibleResult;
}

async function gameBlackjack(game: import("mongoose").Document<any, any, Blackjack> & Blackjack & { _id: import("mongoose").Types.ObjectId; }, user: import("mongoose").Document<any, any, User> & User & { _id: import("mongoose").Types.ObjectId; }, deck: any) {
    game.userHasBlackjack = true;
    let userCoins = user.blackJackCoins;
    let dealerHand = game.dealerHand;
    let dealerHandValue = game.dealerHandValue;
    while (dealerHandValue <= 17){ // Hasta que llegue a 17 O Gane al player
        dealerHand.push(deck[0]);
        deck.splice(0, 1);
        dealerHandValue = getHandValue(dealerHand);
    }
    if (dealerHandValue > 21){
        return await gameDealerBusted(game, userCoins, dealerHandValue, user);
    } else if (dealerHandValue == 21){
        return await gameTie(game, user, deck);
    } else{
        return await gameBlackjackWin(game, user, deck);
    }
}

async function gameDealerBlackjack(game: import("mongoose").Document<any, any, Blackjack> & Blackjack & { _id: import("mongoose").Types.ObjectId; }, deck: any) {
    game.dealerHasBlackjack = true;
    game.userIsBusted = true;
    game.dealerWon = true;
    game.deck = deck;
    await game.save();
    let visibleResult = game;
    visibleResult.deck = null;
    await game.delete();
    return visibleResult;
}
async function gameUserBusted(game: import("mongoose").Document<any, any, Blackjack> & Blackjack & { _id: import("mongoose").Types.ObjectId; }, deck: any[]) {
    game.userIsBusted = true;
    game.dealerWon = true;
    game.deck = deck;
    let visibleResult = game;
    visibleResult.deck = null;
    await game.delete();
    return visibleResult;
}
async function gameDealerBusted(game: import("mongoose").Document<any, any, Blackjack> & Blackjack & { _id: import("mongoose").Types.ObjectId; }, userCoins: { one: number; five: number; ten: number; twentyfive: number; fifty: number; hundred: number; twohundred: number; fivehundred: number; thousand: number; }, dealerHandValue: number, user: import("mongoose").Document<any, any, User> & User & { _id: import("mongoose").Types.ObjectId; }) {
    game.dealerIsBusted = true;
    for (let coin in game.bet) {
        game.bet[coin] = game.bet[coin] * 2;
    }
    for (let coin in userCoins) {
        userCoins[coin] += game.bet[coin];
    }
    game.dealerIsBusted = true;
    game.userWon = true;
    game.dealerHandValue = dealerHandValue;
    await game.save();
    user.blackJackCoins = userCoins;
    user.markModified('blackJackCoins');
    await user.save();
    let visibleResult = game;
    visibleResult.deck = null;
    await game.delete();
    return visibleResult;
}

async function gameUserWon(game: import("mongoose").Document<any, any, Blackjack> & Blackjack & { _id: import("mongoose").Types.ObjectId; }, user: import("mongoose").Document<any, any, User> & User & { _id: import("mongoose").Types.ObjectId; }, deck: any[]) {
    game.userWon = true;
    for (let coin in game.bet) {
        game.bet[coin] = game.bet[coin] * 2;
    }
    for (let coin in user.blackJackCoins) {
        user.blackJackCoins[coin] += game.bet[coin];
    }
    game.deck = deck;
    user.markModified('blackJackCoins');
    await user.save();
    let visibleResult = game;
    visibleResult.deck = null;
    await game.delete();
    return visibleResult;
}

export { gameTie, gameBlackjackWin, gameDealerBlackjack, gameUserBusted, gameDealerBusted, gameBlackjack, gameUserWon };*/
