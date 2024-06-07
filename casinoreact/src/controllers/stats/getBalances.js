import { apiURI } from '../../config/keys';

const getBalances = () => {
  return fetch(`${apiURI}/users/balances`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default getBalances;