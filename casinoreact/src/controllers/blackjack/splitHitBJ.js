import { apiURI } from '../../config/keys';

const splitHitBJ = (userId, index, handIndex) => {
  const body = {
    userId,
    index,
    handIndex
  }
  return fetch(`${apiURI}/api/blackjack/split/hit`, {
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

export default splitHitBJ;