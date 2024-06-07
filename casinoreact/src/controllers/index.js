import getOneUser from "./users/getOneUser";
import getUsers from "./users/getUsers";
import updateUser from "./users/updateUser";
import createUser from "./users/createUser";
import deleteUser from "./users/deleteUser";

import startBJ from "./blackjack/startBJ";
import hitBJ from "./blackjack/hitBJ";
import standBJ from "./blackjack/standBJ";
import doubleBJ from "./blackjack/doubleBJ";
import splitBJ from "./blackjack/splitBJ";
import splitHitBJ from './blackjack/splitHitBJ'
import splitStandBJ from './blackjack/splitStandBJ';
import splitDoubleBJ from "./blackjack/splitDoubleBJ";

import login from './users/login';
import getUserData from "./users/getUserData";
import logout from "./users/logout";

import startPO from "./poker/startPO";
import getAllPO from "./poker/getAllPO";
import foldPO from "./poker/foldPO";
import flopPO from "./poker/flopPO";
import checkPO from "./poker/checkPO";
import betPO from './poker/betPO'; 

import sendFeedback from "./marketing/sendFeedback";
import getFeedback from "./marketing/getFeedback";

import getBalances from './stats/getBalances';
import getStats from './stats/getStats'
import deleteAll from "./stats/getBalances";

export const usersController = { 
    getOneUser, 
    getUsers, 
    updateUser, 
    createUser, 
    deleteUser,
    login,
    getUserData,
    logout
}

export const blackjackController = {
    startBJ, hitBJ, standBJ, doubleBJ, splitBJ, splitHitBJ, splitStandBJ, splitDoubleBJ,
}

export const pokerController = {
    betPO, checkPO, flopPO, foldPO, getAllPO, startPO,
}

export const statsController = {
    getBalances,
    getStats,
    deleteAll 
}
export const feedbackController = {
    sendFeedback, 
    getFeedback, 
}
    
    
