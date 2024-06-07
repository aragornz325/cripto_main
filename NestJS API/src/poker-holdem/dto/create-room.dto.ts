import { IsString, IsNumber, IsArray } from 'class-validator';
export class CreateRoomDto {
  @IsString()
  type: string;
  @IsNumber()
  entryPrice: number;
  @IsNumber()
  rakeValue: number;
  @IsNumber()
  maxPlayers: number;
  @IsNumber()
  startTimeout: number;
  @IsNumber()
  turnTimeout: number;

  availableSeats?: number[];
}
