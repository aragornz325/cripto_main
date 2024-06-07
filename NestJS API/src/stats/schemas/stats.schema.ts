import * as mongoose from 'mongoose';

export const StatsSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  date: {
    type: Date,
  },
  route: {
    type: String,
  },
});
