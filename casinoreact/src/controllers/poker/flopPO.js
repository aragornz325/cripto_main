import { apiURI } from '../../config/keys';

const flopPO = (userId) => {
  const body = {
    userId
  }
  return fetch(`${apiURI}/offline/flop`, {
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

export default flopPO;