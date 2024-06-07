import { RouletteNumber } from '../classes/roulette.number.class';
import { RouletteBet } from '../interfaces/roulette.bet.interface';

export const checkOut = async (
  user,
  roulleteNumber: RouletteNumber,
  rouletteBets: RouletteBet[],
) => {
  console.log({roulleteNumber})
  const newBets = rouletteBets.map((bet) => {
    bet.winMultiplier = 0;
    switch (bet.type) {
      case 'double':
        console.log({bet})
        if (bet.double.some( x => x === roulleteNumber.number )) {
          bet.winMultiplier = 18;
          bet.won = true;

        }
        return bet;
      case 'quarter':
        roulleteNumber.quarters.forEach((quarter) => {
          //@ts-ignore  
          if (arraysEqual(quarter, bet.cuadruple)) {
            bet.winMultiplier = 9;
            bet.won = true;
          }
        });
        return bet;
      case 'doubleColumns':
        
        roulleteNumber.doubleColumns.forEach((doubleColumn) => {
          if (arraysEqual(doubleColumn, bet.doubleColumns)) {
            bet.winMultiplier = 5;
            bet.won = true;
          }
        });
        return bet;
      case 'number':
        if (bet.number === roulleteNumber.number) {
          bet.winMultiplier = 36;
          bet.won = true;
        }
        return bet;
      case 'color':
        if (roulleteNumber.color.toLowerCase() === bet.color.toLowerCase()) {
          bet.winMultiplier = 2;
          bet.won = true;
        }
        return bet;
      case 'isOdd':
        if (roulleteNumber.isOdd === bet.isOdd) {
          bet.winMultiplier = 2;
          bet.won = true;
        }
        return bet;
      case 'row':
        if (roulleteNumber.row === bet.row) {
          bet.winMultiplier = 3;
          bet.won = true;
        }
        return bet;
      case 'column':
        if (roulleteNumber.column === bet.column) {
          bet.winMultiplier = 9;
          bet.won = true;
        }
        return bet;
      case 'lessThanEighteen':
        if (roulleteNumber.lessThanEighteen === bet.lessThanEighteen) {
          bet.winMultiplier = 2;
          bet.won = true;
        }
        return bet;
      case 'dozen':
        if (roulleteNumber.dozen === bet.dozen) {
          bet.winMultiplier = 3;
          bet.won = true;
        }
        return bet;
      default:
        return bet;
    }
  });
  let wonAmount = 0;
  newBets.forEach((bet) => {
    user.balance += bet.bet * bet.winMultiplier;
    wonAmount += bet.bet * bet.winMultiplier;
  });
  return { newBets, wonAmount };
};

function arraysEqual(a, b) {
  console.log({a})
  console.log({b})
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
