import store from '../reducers/store'

const setUsername = (username) => {
  store.dispatch({
    type: 'setUsername',
    payload: {
      username
    }
  })
}

export default setUsername;