import { apiURI } from '../../config/keys';

const logout = () => {
  return fetch(`${apiURI}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  .then(res => {
    localStorage.clear();
    // res.json()
  })
  .catch(err => console.error(err))
}

export default logout;