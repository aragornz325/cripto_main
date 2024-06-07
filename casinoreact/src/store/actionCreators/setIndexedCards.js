import store from '../reducers/store'

const setIndexedCards = (cards) => {
  store.dispatch({
    type: 'setCards',
    payload: {
      cards
    }
  })
}

export default setIndexedCards;