import store from '../reducers/store'

const setVolume = (volume) => {
  store.dispatch({
    type: 'setVolume',
    payload: {
      volume
    }
  })
}

export default setVolume;