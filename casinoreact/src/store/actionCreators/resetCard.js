import store from '../reducers/store'

const resetCard = () => {
  store.dispatch({
    type: 'resetCard'
  })
}

export default resetCard;