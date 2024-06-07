import { IsNumber, IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class OrderDto {
  @IsObjectId()
  userId: string;

  @IsString()
  walletAddress: string;
}

export class VerifyDto {
  @IsString()
  txId: string;

  @IsObjectId()
  orderId: string;
}
