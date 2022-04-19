// 再此文件下将不同的 reducer 进行统一

import { combineReducers } from "redux";
import getCategoryReducer from "./getCategory";

export const reducer  = combineReducers({
  categoryReducer : getCategoryReducer,
});