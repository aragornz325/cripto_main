import * as mongoose from 'mongoose';

export const PokerOfflineSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  startBet: {},
  bet: {},
  deck: {
    type: Array,
    required: true,
  },
  dealerHand: {
    type: Array,
    required: true,
  },
  currentHand: {
    type: Array,
    required: true,
  },
  tie: {
    type: Boolean,
    required: true,
    default: false,
  },
  userWon: {
    type: Boolean,
    required: true,
    default: false,
  },
  dealerWon: {
    type: Boolean,
    required: true,
    default: false,
  },
  deckHand: {
    type: Array,
    required: true,
  },
  userFloped: {
    type: Boolean,
    default: false,
  },
});
