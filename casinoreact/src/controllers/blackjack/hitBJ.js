import { apiURI } from '../../config/keys';

const hitBJ = (userId, index) => {
  const body = {
    userId,
    index
  }
  return fetch(`${apiURI}/api/blackjack/hit`, {
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

export default hitBJ;