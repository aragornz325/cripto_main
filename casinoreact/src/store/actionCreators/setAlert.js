import store from '../reducers/store'

const setAlert = ({display, text, color}) => {
  store.dispatch({
    type: 'setAlert',
    payload: {
      display,
      text,
      color
    }
  })
}

export default setAlert;