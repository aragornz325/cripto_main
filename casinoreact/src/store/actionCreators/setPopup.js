import store from '../reducers/store'

const setPopup = (state) => {
  store.dispatch({
    type: 'SET_POPUP',
    payload: {
      state
    }
  })
}
export default setPopup;