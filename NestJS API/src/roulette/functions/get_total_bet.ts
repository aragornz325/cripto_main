import { User } from 'src/users/interfaces/user.interface';
import { RouletteBet } from '../interfaces/roulette.bet.interface';

export const verifyBet = (rouletteBets: RouletteBet[], user: User) => {
  let sum = 0;
  rouletteBets.forEach((bet) => (sum += bet.bet));
  if (sum > user.balance) {
    return false;
  } else {
    return sum;
  }
};
