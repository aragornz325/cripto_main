import store from '../reducers/store'

const renderStore = (state) => {
  store.dispatch({
    type: 'setStore',
    payload: {
      state
    }
  })
}

export default renderStore;