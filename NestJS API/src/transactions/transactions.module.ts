import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { TransactionsController } from './controllers/transactions/transactions.controller';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { BINANCE_NETWORK, EthersModule } from 'nestjs-ethers';
import { TransactionsService } from './services/transactions/transactions.service';
import { WalletsService } from './services/wallets/wallets.service';
import { WalletsController } from './controllers/wallets/wallets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EthersModule.forRoot({
      network: BINANCE_NETWORK,
      // useDefaultProvider: true,
    }),
  ],
  controllers: [TransactionsController, WalletsController],
  providers: [TransactionsService, WalletsService],
  exports: [TransactionsService, WalletsService],
})
export class TransactionsModule {}
