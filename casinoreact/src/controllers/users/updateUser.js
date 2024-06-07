import { apiURI } from '../../config/keys';

const updateUser = id => {
  const body = {
    "blackJackCoins": {
      "one": 10,
      "five": 10,
      "ten": 10,
      "twentyfive": 10,
      "fifty": 10,
      "hundred": 10,
      "twohundred": 10,
      "fivehundred": 10,
      "thousand": 10
    }
  };
  return fetch(`${apiURI}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default updateUser;