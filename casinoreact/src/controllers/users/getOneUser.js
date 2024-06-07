import { apiURI } from '../../config/keys';

const getOneUser = id => {
  return fetch(`${apiURI}/users/${id}`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err));
}

export default getOneUser;