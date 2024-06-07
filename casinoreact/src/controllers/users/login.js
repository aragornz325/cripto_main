import { apiURI } from '../../config/keys';

const login = (body) => {
  return fetch(`${apiURI}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(res => {
    return res.json()
  })
  .catch(err => err)
}

export default login;
