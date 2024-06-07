import {
  Body,
  Controller,
  Inject,
  Injectable,
  Post,
  Put,
} from '@nestjs/common';
import { BetDto } from 'src/poker-holdem/dto/bet.dto';
import { PokerActionsService } from 'src/poker-holdem/services/poker-actions/poker-actions.service';

import { PokerGameService } from 'src/poker-holdem/services/poker-game/poker-game.service';

@Injectable()
@Controller('game')
export class GameController {
  constructor(
    @Inject(PokerGameService) private pokerGameService: PokerGameService,
    @Inject(PokerActionsService)
    private pokerActionsService: PokerActionsService,
  ) {}

  @Post('start')
  async startGame(@Body() { roomId }) {
    const result = await this.pokerGameService.startGame(roomId);
    if (result.error) throw result.error;
    return result;
  }

  @Put('bet')
  async bet(@Body() { roomId, playerId, betAction, raiseAmount }: BetDto) {
    const result = await this.pokerActionsService.bet(
      roomId,
      playerId,
      betAction,
      raiseAmount,
    );
    if (result.error) throw result.error;
    return result.room;
  }
}
