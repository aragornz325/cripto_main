export const addCoins = (user, game, index, mod) => {
  console.log(user.coins);
  console.log(game.bet[index]);
  for (const coin in user.coins) {
    user.coins[`${coin}`] += game.bet[index][`${coin}`] * mod;
  }
  return user.coins;
};

export const multiplyBet = (bet, mult) => {
  for (const property in bet) {
    bet[property] *= mult;
  }
  return bet;
};
