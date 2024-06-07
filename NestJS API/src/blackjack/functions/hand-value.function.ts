export const getHandValue = (hand: any[]): number => {
  let value = 0;
  let hasAce = false;
  try {
    hand.map((card: any) => {
      const cardValue = card.value;
      if (cardValue === 1) {
        hasAce = true;
      }
      value += cardValue;
    });
  } catch (e) {
    console.log(e);
  }
  if (hasAce && value + 10 <= 21) {
    value += 10;
  }
  return value;
};
