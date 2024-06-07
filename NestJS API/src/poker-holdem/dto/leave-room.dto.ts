import { IsObjectId } from 'class-validator-mongo-object-id';

export class LeaveRoomDto {
  @IsObjectId()
  pokerPlayerId: string;

  @IsObjectId()
  roomId: string;
}
