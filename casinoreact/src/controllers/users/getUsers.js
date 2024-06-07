import { apiURI } from '../../config/keys';

const getUsers = () => {
  return fetch(`${apiURI}/users`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err));
}

export default getUsers;