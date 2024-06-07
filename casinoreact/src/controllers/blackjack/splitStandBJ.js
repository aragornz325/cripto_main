import { apiURI } from '../../config/keys';

const standStandBJ = (userId, index, handIndex) => {
  const body = {
    userId,
    index,
    handIndex
  }
  return fetch(`${apiURI}/api/blackjack/split/stand`, {
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

export default standStandBJ;