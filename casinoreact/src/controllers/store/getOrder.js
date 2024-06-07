import { apiURI } from "../../config/keys"

const getOrders = (id) => {

  const response = fetch(`${apiURI}/api/order/${id}`, {
    method: 'GET',
    credentials: "include",
  })
  .then(res => res.json())
  .catch(err => { throw err });

  return response;
}

export default getOrders;