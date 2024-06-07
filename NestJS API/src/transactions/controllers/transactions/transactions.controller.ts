import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TransactionsService } from 'src/transactions/services/transactions/transactions.service';
import { Logger } from '@nestjs/common';
import { OrderDto, VerifyDto } from '../dtos/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject(TransactionsService)
    private transactionsService: TransactionsService,
  ) {}

  logger = new Logger(TransactionsController.name);

  @Post('order')
  async order(@Body() orderDto: OrderDto) {
    const result = await this.transactionsService.createOrder(orderDto);
    if (result.error) throw result.error;
    return result.order;
  }

  @Post('verify')
  async verify(@Body() { txId, orderId }: VerifyDto) {
    const result = await this.transactionsService.verifyTxId(txId, orderId);
    if (result.error) throw result.error;
    return result.order;
  }

  @Post('withdraw')
  async withdraw(@Body() { walletAddress, userId, amount }) {
    const result = await this.transactionsService.withdraw(
      walletAddress,
      userId,
      amount,
    );
    if (result.error) throw result.error;
    return result.withdrawOrder;
  }
}
