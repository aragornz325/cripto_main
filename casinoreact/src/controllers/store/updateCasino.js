import { apiURI } from '../../config/keys';

const updateCasino = async (id, body) => {

  const response = await fetch(`${apiURI}/api/users/addCoins/${id}`, {
    method: 'PUT',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .catch(err => { throw err });
return response;
  console.log(response);
}

export default updateCasino;