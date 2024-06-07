import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { WalletsService } from 'src/transactions/services/wallets/wallets.service';
import { CreateWalletDto } from '../dtos/wallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(@Inject(WalletsService) private walletsService: WalletsService) {}

  @Post('create')
  async createWallet(@Body() createWalletDto: CreateWalletDto) {
    const result = await this.walletsService.createWallet(createWalletDto);
    if (result.error) throw result.error;
    return result.newWallet;
  }

  @Post('delete')
  async deleteWallet() {}

  @Get(':userId')
  async getUserWallets(@Param() { userId }) {
    const result = await this.walletsService.getUserWallets(userId);
    if (result.error) throw result.error;
    return result.wallets;
  }

  @Get(':walletId')
  async getWallet() {}
}
