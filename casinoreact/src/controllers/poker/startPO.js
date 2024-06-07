import { apiURI } from '../../config/keys';

const startPO = (userId, bet) => {
  const body = {
    userId,
    bet
  }
  return fetch(`${apiURI}/offline`, {
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

export default startPO;