import { apiURI } from '../../config/keys';

const getStats = () => {
  return fetch(`${apiURI}/stats`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err));
}

export default getStats;