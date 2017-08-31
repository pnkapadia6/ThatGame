import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/mainApp';
import store from './reducers';

import { loadState, saveState } from './storeState';

import './index.scss';

const persistedState = loadState();

const appStore = createStore(store, persistedState, applyMiddleware(thunk));

appStore.subscribe(() => {
  saveState(appStore.getState());
});

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
