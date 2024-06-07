import { IsNumber } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class BetDto {
  @IsObjectId()
  roomId: string;

  @IsObjectId()
  playerId: string;

  @IsNumber()
  betAction: number;

  @IsNumber()
  raiseAmount?: number;
}
