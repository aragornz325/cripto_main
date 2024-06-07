export const reverseCoins = (coins) => {
  for (const coin in coins) {
    coins[coin] = -coins[coin];
  }
  return coins;
};
