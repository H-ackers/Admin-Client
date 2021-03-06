import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';

// 读取 localStorage 中保存的 user，保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
