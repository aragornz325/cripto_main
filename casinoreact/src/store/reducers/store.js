import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './cards.js';
import { rootReducers } from './index.js';

const store = createStore(
    reducer
);

export default store;