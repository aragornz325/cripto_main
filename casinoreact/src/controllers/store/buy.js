import { apiURI } from '../../config/keys';

const buy = async (amount, coins, userId) => {

  const body = {
    userId,
    price_amount: amount,
    price_currency: 'USD',
    receive_currency: 'ETH',
    coins
  }

  console.log('buying', amount, 'coins...');

  const response = await fetch(`${apiURI}/api/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => { throw err });
  window.open(response?.msg?.payment_url, '_blank');
  window.open(`/transaction?order=${response.msg.id}`);
}

export default buy;