/*
  该文件专用于暴露一个 store 对象，整个应用只有一个 store 对象
*/ 
// 引入 createStore，专门用于创建 redux 中最为核心的 store 对象
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// 引入为 Category 组件服务的 reducer
import { reducer } from './reducer';

// 暴露 store
export default createStore(
  reducer,
  applyMiddleware(thunk)
);