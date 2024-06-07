import { combineReducers } from 'redux'
import cardReducer from './cards.js';
import { showToastAlert } from './showToastAlertReducer.js';

// Compile all reducers to pass to the store.
export const rootReducers = combineReducers({
    reducer: cardReducer,
    showToastAlert: showToastAlert // Show toast alert
})