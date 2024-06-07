import React from 'react';
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import store from './store/reducers/store.js';
import SessionContextProvider from './SessionContext';
import './index.css';
import App from './App';

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
      <SessionContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SessionContextProvider>
  </BrowserRouter>
);