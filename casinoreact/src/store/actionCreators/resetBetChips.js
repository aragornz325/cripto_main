import store from '../reducers/store'

const resetBetChips = () => {
  store.dispatch({
    type: 'resetBetChips'
  })
}

export default resetBetChips;