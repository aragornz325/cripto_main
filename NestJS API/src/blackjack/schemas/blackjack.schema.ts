import * as mongoose from 'mongoose';

export const BlackjackShema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  bet: {
    type: Array,
    required: true,
  },
  games: {
    type: Array,
    required: true,
  },
  currentHand: {
    type: Array,
    required: true,
  },
  hasPair: {
    type: Array,
    default: [false, false, false],
  },
  userSplitted: {
    type: Array,
    default: [false, false, false],
  },
  canDouble: {
    type: Array,
    default: [false, false, false],
  },
  dealerHand: {
    type: Array,
    required: true,
  },
  deck: {
    type: Array,
    required: true,
  },
  currentHandValue: {
    type: Array,
    default: [0, 0, 0],
  },
  dealerHandValue: {
    type: Number,
    required: true,
  },
  userIsBusted: {
    type: Array,
    default: [false, false, false],
  },
  userHasBlackjack: {
    type: Array,
    default: [false, false, false],
  },
  dealerHasBlackjack: {
    type: Array,
    default: [false, false, false],
  },
  handStand: {
    type: Array,
  },
  dealerWon: {
    type: Array,
    default: [false, false, false],
  },
  tie: {
    type: Array,
    default: [false, false, false],
  },
  userWon: {
    type: Array,
    default: [false, false, false],
  },
  userStand: {
    type: Array,
    default: [false, false, false],
  },
  dealerIsBusted: {
    type: Array,
    default: [false, false, false],
  },
});
