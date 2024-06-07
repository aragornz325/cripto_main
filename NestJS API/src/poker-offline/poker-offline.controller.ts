import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { PokerOffline } from './interfaces/poker_offline.interface';
import { PokerOfflineService } from './poker-offline.service';

@Controller('api/offline')
export class PokerOfflineController {
  constructor(private readonly pokerOfflineService: PokerOfflineService) {}
  @Get()
  async findAll(): Promise<PokerOffline[]> {
    return this.pokerOfflineService.findAll();
  }
  @Post()
  async startGame(@Body() body): Promise<any> {
    return this.pokerOfflineService.startGame(body.userId, body.bet);
  }
  @Post('fold')
  async fold(@Body() body): Promise<any> {
    return this.pokerOfflineService.fold(body.userId);
  }
  @Post('flop')
  async flop(@Body() body): Promise<any> {
    return this.pokerOfflineService.flop(body.userId);
  }
  @Post('bet')
  async bet(@Body() body): Promise<any> {
    return this.pokerOfflineService.bet(body.userId);
  }
  @Post('check')
  async check(@Body() body): Promise<any> {
    return this.pokerOfflineService.check(body.userId);
  }
}
