// 该文件专用于为 Category 组件生成 action 对象

import {GETCATEGORY, GETPRODUCT} from './actionType';

// 异步 action ————> action 的返回值为 函数(func)类型,异步 action 中一般都会调用同步 action，异步 action 不是必须要用的
export const GetCategory = data => ({type:GETCATEGORY, data});
export const GetProduct = data => ({type:GETPRODUCT, data});
export const GetAsyncCategory = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(GetCategory(data));
    }, time);
  };
};