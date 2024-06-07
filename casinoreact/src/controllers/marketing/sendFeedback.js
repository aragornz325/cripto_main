import { apiURI } from '../../config/keys';

const sendFeedback = (body) => {
  return fetch(`${apiURI}/feedback`, {
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

export default sendFeedback;