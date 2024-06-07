import { apiURI } from '../../config/keys';

const doubleBJ = (userId, index) => {
  const body = {
    userId,
    index
  }
  return fetch(`${apiURI}/api/blackjack/double`, {
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

export default doubleBJ;