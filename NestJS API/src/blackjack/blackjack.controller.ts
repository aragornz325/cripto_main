import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { BlackjackService } from './blackjack.service';
import { Blackjack } from './interfaces/blackjack.interface';

import { ApikeyGuard } from '../auth/guards/apikey.guard';
import { Public } from '../auth/decorators/public.decorator';

//@UseGuards(ApikeyGuard)
@Controller('api/blackjack')
export class BlackjackController {
  constructor(private readonly blackjackService: BlackjackService) {}

  @Get()
  async findAll(): Promise<Blackjack[]> {
    return this.blackjackService.findAll();
  }

  @Post()
  async startGame(@Body() body): Promise<any> {
    return this.blackjackService.startGame(body.userId, body.bet, body.games);
  }
  @Post('hit')
  async hit(@Body() body): Promise<any> {
    return this.blackjackService.hit(body.userId, body.index);
  }
  @Post('stand')
  async stand(@Body() body): Promise<any> {
    return this.blackjackService.stand(body.userId, body.index);
  }
  @Post('double')
  async double(@Body() body): Promise<any> {
    return this.blackjackService.double(body.userId, body.index);
  }

  @Post('split')
  async split(@Body() body): Promise<any> {
    return this.blackjackService.split(body.userId, body.index);
  }
  @Post('split/double')
  async splitDouble(@Body() body): Promise<any> {
    return this.blackjackService.splitDouble(
      body.userId,
      body.index,
      body.handIndex,
    );
  }

  @Post('split/hit')
  async splitHit(@Body() body): Promise<any> {
    return this.blackjackService.splitHit(
      body.userId,
      body.index,
      body.handIndex,
    );
  }
  @Post('split/stand')
  async splitStand(@Body() body): Promise<any> {
    return this.blackjackService.splitStand(
      body.userId,
      body.index,
      body.handIndex,
    );
  }
}
