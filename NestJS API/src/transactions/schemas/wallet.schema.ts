import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Transaction } from './transaction.schema';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: User;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Transaction',
    default: [],
  })
  transactions: Transaction[];
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
