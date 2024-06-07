import store from '../reducers/store'

const drawCard = (status) => {
  store.dispatch({
    type: 'drawCard',
    payload: {
      status
    }
  })
}

export default drawCard;