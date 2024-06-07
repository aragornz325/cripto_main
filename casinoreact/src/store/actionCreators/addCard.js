import store from '../reducers/store'

const addCard = (info, index) => {
  store.dispatch({
    type: 'addCard',
    payload: {
      info,
      index
    }
  })
}

export default addCard;