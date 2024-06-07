import store from '../reducers/store'

const setGameState = state => {
  store.dispatch({
    type: 'setGameState',
    payload: {
      state
    }
  })
}

export default setGameState;