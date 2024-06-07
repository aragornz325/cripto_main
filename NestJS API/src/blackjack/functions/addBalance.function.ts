export default (user, game, index, mod) => {
  user.balance = user.balance + game.bet[index] * mod;
  return user.balance;
};
