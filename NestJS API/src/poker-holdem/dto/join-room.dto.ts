import { IsNumber } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class JoinRoomDto {
  @IsObjectId()
  userId: string;

  @IsObjectId()
  roomId: string;

  @IsNumber()
  roomBalance: number;
}
