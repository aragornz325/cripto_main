import { apiURI } from '../../config/keys';

const startBJ = (userId, bet, games) => {
  const body = {
    userId,
    bet,
    games
  }
  return fetch(`${apiURI}/api/blackjack`, {
    method: 'POST',
    credentials: "include",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default startBJ;