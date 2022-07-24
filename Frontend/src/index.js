
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

// REDUX STORE :::
import rootReducer from './Reducers/index.js'
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose } from 'redux';
import thunk from 'redux-thunk';

const store = createStore( rootReducer , compose(applyMiddleware(thunk)))

ReactDOM.render(

  <Provider store={store}>

    <App />

  </Provider>,
  document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
