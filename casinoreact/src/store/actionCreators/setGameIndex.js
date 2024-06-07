import store from '../reducers/store'

const setGameIndex = (index) => {
  store.dispatch({
    type: 'setGameIndex',
    payload: {
      index
    }
  })
}

export default setGameIndex;