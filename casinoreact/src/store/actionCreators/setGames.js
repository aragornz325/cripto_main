import store from '../reducers/store'

const setGames = (games) => {
  store.dispatch({
    type: 'setGames',
    payload: {
      games
    }
  })
}

export default setGames;