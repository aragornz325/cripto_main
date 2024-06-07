import { apiURI } from '../../config/keys';

const deleteUser = id => {
  id += 'a';
  return fetch(`${apiURI}/users/${id}`, {
    method: 'DELETE',
    credentials: "include",
  })
  .then(res => JSON.stringify(res))
  .catch(err => console.error(err));
}

export default deleteUser;