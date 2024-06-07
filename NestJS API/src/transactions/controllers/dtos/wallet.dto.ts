import { IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class CreateWalletDto {
  @IsObjectId()
  userId: string;

  @IsString()
  walletAddress: string;

  @IsString()
  nickname: string;
}
