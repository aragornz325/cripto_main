import store from '../reducers/store'

const flipCard = (index) => {
  store.dispatch({
    type: 'flipCard',
    payload: {
      index
    }
  })
}

export default flipCard;