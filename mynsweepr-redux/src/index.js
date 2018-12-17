import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore/*, combineReducers*/ } from 'redux';
import { Provider } from 'react-redux';
import { mynreducer } from './redux-modules/Mynsweepr/index';

// const reducers = {
//   difficulty: mynreducer,
//   width: mynreducer,
//   height: mynreducer,
//   time: mynreducer,
//   remaining: mynreducer,
//   cells: mynreducer,
//   cell: mynreducer
// };
// const store = createStore(combineReducers(reducers));
const store = createStore(
  mynreducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
