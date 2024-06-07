import { apiURI } from "../../config/keys"

const getOrders = () => {

  const response = fetch(`${apiURI}/api/order/`, {
    method: 'GET',
    
    credentials: 'include'
  })

  .then(res => res.json())
  .catch(err => { throw err });

  return response;
}

export default getOrders;