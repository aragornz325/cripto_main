import { apiURI } from "../../config/keys"

export const getWallet = async (userId) => {
  try {
    const response = await fetch(`${apiURI}/wallets/${userId}`, {
      method: 'GET',
      credentials: 'include'
    })
    return response.json();
  } catch (err) {
    throw err;
  }
}

export const createWallet = async (userId, walletAddress, nickname) => {
  try {
    const response = await fetch(`${apiURI}/wallets/create`, {
      method: 'POST',
      body: JSON.stringify({ userId, walletAddress, nickname }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (userId, walletAddress) => {
  try {
    console.log("WALLET", typeof walletAddress)
    const response = await fetch(`${apiURI}/transactions/order`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, walletAddress }),
    });
    return response.json();
  } catch (e) {
    throw e;
  }
}

export const verifyOrder = async (verificationCode, orderId) => {
  try {
    const response = await fetch(`${apiURI}/transactions/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txId: verificationCode, orderId }),
    });
    return response.json();
  } catch (e) {
    throw e;
  }
}


export const withdrawMoney = async (userId, walletAddress, amount) => {
  try {
    const response = await fetch(`${apiURI}/transactions/withdraw`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, walletAddress, amount }),
    });
    return response.json();
  } catch (e) {
    throw e;
  }
}