import { Bet } from '../../blackjack/interfaces/bet.interface';

export interface PokerOffline {
  id?: string;
  userId: string;
  startBet?: Bet;
  bet?: Bet;
  dealerHand?: any[];
  currentHand?: any[];
  deck?: any[];
  tie?: boolean;
  dealerWon?: boolean;
  userWon?: boolean;
  deckHand?: any[];
  userFloped?: boolean;
}
