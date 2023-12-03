import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './App.css';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {Provider} from 'react-redux';
import {loadCartProducts} from "./actions";

// require('dotenv').config();

store.dispatch(loadCartProducts());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App/>
</Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();