import { apiURI } from '../../config/keys';

const getAllPO = () => {
  return fetch(`${apiURI}/offline`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err))
}

export default getAllPO;