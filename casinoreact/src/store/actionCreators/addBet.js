import store from '../reducers/store'

const addBet = (index, amount) => {
  store.dispatch({
    type: 'addBet',
    payload: {
      amount,
      index
    }
  })
}

export default addBet;