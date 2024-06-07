export const coinToNumber = (coins) => {
  let sum = 0;
  for (const property in coins) {
    switch (property) {
      case 'one':
        sum += 1 * coins[property];
        break;
      case 'five':
        sum += 5 * coins[property];
        break;
      case 'ten':
        sum += 10 * coins[property];
        break;
      case 'twentyfive':
        sum += 25 * coins[property];
        break;
      case 'fifty':
        sum += 50 * coins[property];
        break;
      case 'hundred':
        sum += 100 * coins[property];
        break;
      case 'twohundred':
        sum += 200 * coins[property];
        break;
      case 'thousand':
        sum += 1000 * coins[property];
        break;
      default:
        break;
    }
  }
  return sum;
};
