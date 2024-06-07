  import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { 
  EthersContract, 
  InjectContractProvider, 
  Contract,
  getAddress
} from 'nestjs-ethers';
import { CreateWalletDto } from 'src/transactions/controllers/dtos/wallet.dto';
import { TransactionDocument } from 'src/transactions/schemas/transaction.schema';
import { WalletDocument } from 'src/transactions/schemas/wallet.schema';
import * as ABI from 'src/transactions/services/utils/ABI.json';

@Injectable()
export class WalletsService {
    constructor(
        @InjectContractProvider() private readonly ethersContract: EthersContract,
        @InjectModel('Wallet') private walletModel: Model<WalletDocument>,
        @InjectModel('Transaction') private transactionModel: Model<TransactionDocument>
      ) {}
      
      async connContract() {
        const contract: Contract = this.ethersContract.create(
            '0x1Eff98b3f8F86Ae045C50C8558D17B88Fd6E5032',
            ABI,
        );
        return contract
      }
    
    async createWallet({ walletAddress, userId, nickname }: CreateWalletDto) {
      try {
        const checkName = await this.walletModel.findOne({ user: userId, nickname })
        if (checkName) return { error: new ConflictException(`User already has a wallet named ${nickname}` ) }
        
        
        const check = await this.walletModel.findOne({ user: userId, address: walletAddress })
        if (check) return { error: new ConflictException(`User already has wallet as ${check.nickname}`) }
        
        let result: string;
        try {
          result = getAddress(walletAddress)
        } catch(err) { return { error: new BadRequestException('This address seems invalid') } }

        const newWallet = await this.walletModel.create({ address: result, user: userId, nickname })
        if (!newWallet) return { error: new InternalServerErrorException() }
        
        return { newWallet }
        
      } catch (err) { return { error: new InternalServerErrorException(err.message) } }
      
    }
    
    async getUserWallets(userId: string) {
      const result = await this.walletModel.find({ user: userId })
        .populate({
          path: 'transactions',
          model: 'Transaction'
        })
      if (!result) return { error: new InternalServerErrorException(`Can't retrieve wallets`) }
      
      return { wallets: result }
    }
}
