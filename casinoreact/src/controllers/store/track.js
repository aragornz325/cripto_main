import { apiURI } from "../../config/keys"

const track = (id) => {

  const response = fetch(`${apiURI}/api/order/status/${id}`, {
    method: 'GET',
    credentials: "include",
  })
  .then(res => res.json())
  .catch(err => { throw err });

  return response;
}

export default track;