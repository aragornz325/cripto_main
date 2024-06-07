import { Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  paidAmount: {
    type: String,
    required: true,
  },
  paidWith: {
    type: String,
    required: true,
  },
  receivedWith: {
    type: String,
    required: true,
  },
  receivedAmount: {
    type: String,
    required: true,
  },
  coingateOrderId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  synced: {
    type: Boolean,
    default: false,
  },
  coins: {
    type: Number,
    required: true,
  },
});
