import { apiURI } from '../../config/keys';

const getUserData = () => {
  return fetch(`${apiURI}/api/auth/user`, {
    method: 'POST',
    credentials: 'include'
  })
  .then(res => res.json())
  .catch(err => console.error(err));
}

export default getUserData;