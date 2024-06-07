import { apiURI } from '../../config/keys';

const betPO = (userId) => {
  const body = {
    userId
  }
  return fetch(`${apiURI}/offline/bet`, {
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

export default betPO;