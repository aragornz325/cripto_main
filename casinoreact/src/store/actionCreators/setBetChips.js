import store from '../reducers/store'

const setBetChips = chips => {
  store.dispatch({
    type: 'setBetChips',
    payload: {
      chips
    }
  })
}

export default setBetChips;