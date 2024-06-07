import { Exclude } from 'class-transformer';
export class BlackjackEntity {
  id?: string;
  userId: string;
  initialBet?: {};
  currentBet?: {};
  currentHand?: any[];
  dealerHand?: any[];
  currentHandValue?: number;

  @Exclude()
  deck?: any[];

  constructor(partial: Partial<BlackjackEntity>) {
    Object.assign(this, partial);
  }
}
