import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EthersContract,
  InjectContractProvider,
  Contract,
  EthersSigner,
  InjectSignerProvider,
  VoidSigner,
  Wallet,
  BigNumber,
  parseUnits
} from 'nestjs-ethers';
import { OrderDto } from 'src/transactions/controllers/dtos/transaction.dto';
import { TransactionDocument } from 'src/transactions/schemas/transaction.schema';
import { WalletDocument } from 'src/transactions/schemas/wallet.schema';
import * as ABI from 'src/transactions/services/utils/ABI.json';
import { UserDocument } from 'src/users/schemas/user.schema';
require('dotenv').config()

const { OWNER_PRIVATE_KEY, USDT_COINS_EQUIVALENCE, CONTRACT_ADDRESS, FEE_PERCENTAGE } = process.env

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private transactionsModel: Model<TransactionDocument>,
    @InjectModel('Wallet') private walletsModel: Model<WalletDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectContractProvider() private readonly ethersContract: EthersContract,
    @InjectSignerProvider() private readonly signer: EthersSigner,
  ) {}

  async connContract() {

    console.log({ OWNER_PRIVATE_KEY, CONTRACT_ADDRESS })
    const wallet: Wallet = this.signer.createWallet(OWNER_PRIVATE_KEY);

    const contract: Contract = this.ethersContract.create(
      CONTRACT_ADDRESS,
      ABI,
      wallet,
    );

    return contract;
  }

  async getContractBalance() {
    const contract = await this.connContract();
  }

  async createOrder({ userId, walletAddress }: OrderDto) {
    console.log({ userId, walletAddress })
    try {
      const wallet = await this.walletsModel.findOne({
        user: userId,
        address: walletAddress,
      });
      if (!wallet)
        return {
          error: new NotFoundException(
            'This wallet seems not associated to user',
          ),
        };

      const order = await this.transactionsModel.create({
        type: 'deposit',
        user: userId,
        walletAddress: wallet.address,
        wallet: wallet._id,
      });
      if (!order)
        return {
          error: new InternalServerErrorException(`Can't create order`),
        };

      wallet.transactions.push(order._id);
      await wallet.save();

      return { order };
    } catch (err) {
      return { error: new InternalServerErrorException(err.message) };
    }
  }

  async verifyTxId(txId: string, orderId: string) {
    console.log({ txId })
    const checktxId = await this.transactionsModel.findOne({ txId });
    if (checktxId)
      return { error: new ConflictException('TxId already used.') };

    const order = await this.transactionsModel.findById(orderId);
    if (order.status === 'Completed')
      return { error: new ConflictException('This order already completed') };

    const contract = await this.connContract();
    const transaction = await contract.provider.getTransactionReceipt(txId);

    if (!transaction)
      return {
        error: new InternalServerErrorException(`Can't verify transaction`),
      };

    // Check if transaction from matches user address
    console.log({ transaction });
    console.log({ order });
    const usdtAmount = parseInt(transaction.logs[0].data) / 1000000000000000000;
    const originAddress = '0x' + transaction.logs[0].topics[1].slice(26);
    const destinationAddress = '0x' + transaction.logs[0].topics[2].slice(26);

    if (destinationAddress.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase())
      return {
        error: new ConflictException(
          `You send transaction to another address!! (${destinationAddress})`,
        ),
      };
      
      
    // if (originAddress.toLowerCase() !== order.walletAddress.toLowerCase())
    //   return {
    //     error: new ConflictException(
    //       `This order is associated to another wallet address, please generate an order from correct wallet and use this same txId`,
    //     ),
    //   };

    const buyedBalance = usdtAmount * parseInt(USDT_COINS_EQUIVALENCE);

    const user = await this.userModel.findById(order.user.toString());

    console.log({ userId: user._id });
    console.log({ usdtAmount });
    console.log({ originAddress });
    console.log({ destinationAddress });

    order.txId = txId;
    order.status = 'Completed';
    order.amount = usdtAmount;
    order.balance = buyedBalance;
    user.balance += buyedBalance;

    await order.save();
    await user.save();

    return { order };
  }

  async withdraw(walletAddress: string, userId: string, amount: string) {
    const floatUsdtAmount = parseFloat(amount) 
    const user = await this.userModel.findById(userId);
    if (!user) return { error: new NotFoundException('User not found') };
    if (user.balance < floatUsdtAmount * parseInt(USDT_COINS_EQUIVALENCE))
      return {
        error: new ConflictException('User has not sufficient balance'),
      };

    const wallet = await this.walletsModel.findOne({
      address: walletAddress,
      user: userId,
    });
    if (!wallet)
      return {
        error: new NotFoundException(
          'This wallet seems not associated to user',
        ),
      };

    const contract = await this.connContract();
    const contractBalance = await contract.getContractBalance();
    const usdtContractBalance = parseInt(contractBalance.toString()) / 1000000000000000000;

    
    console.log({ usdtContractBalance });
    console.log({ amount });
    
    if (floatUsdtAmount > usdtContractBalance)
    return {
      error: new ConflictException(
      'Dont have sufficient founds, please contact support.',
      ),
    };
    
    
    const bigNumberWithdraw = parseUnits(amount,18)
      
    let txResult;

    try {
      txResult = await contract.withdrawAll(
        walletAddress,
        bigNumberWithdraw,
        FEE_PERCENTAGE,
      );
      console.log({ txResult })
    } catch (err) {
      return {
        error: new InternalServerErrorException(
          'There was a problem with contract, please contact support',
        ),
      };
    }

    const withdrawOrder = await this.transactionsModel.create({
      wallet: wallet._id,
      balance: amount,
      amount,
      type: 'withdraw',
      status: 'completed',
      walletAddress,
      user: user._id,
    });

    user.balance -= Math.ceil(floatUsdtAmount * parseInt(USDT_COINS_EQUIVALENCE))

    wallet.transactions.push(withdrawOrder._id);
    await user.save()
    await wallet.save();

    return { withdrawOrder };
  }
}
