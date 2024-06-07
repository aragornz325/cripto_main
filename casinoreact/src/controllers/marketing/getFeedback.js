import { apiURI } from '../../config/keys';

const getFeedback = () => {
  return fetch(`${apiURI}/feedback`, {
    method: 'GET',
    credentials: "include",
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default getFeedback;