import { RouletteBet } from './roulette.bet.interface';

export interface Roulette {
  id: string;
  userId: string;
  rouletteNumber?: {};
  bets?: RouletteBet[];
  status: string;
  message?: string;
}
