/*
  用于进行 local 数据存储管理的工具模块
*/ 

import store from 'store';
import { USERNAME, WEATHERINFO, SUBMENU } from './constant'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // 保存 user
  saveUser(user){
    // localStorage.setItem(USERNAME, JSON.stringify(user));
    store.set(USERNAME, user);
  },
  // 读取 user
  getUser(){
    // return JSON.parse(localStorage.getItem(USERNAME) || '{}');
    return store.get(USERNAME) || {};
  },
  // 删除 user
  removeUser(){
    // localStorage.removeItem(USERNAME);
    store.remove(USERNAME);
  },

  // 保存 weather
  saveWeather(weather){
    store.set(WEATHERINFO, weather);
  },
  // 读取 weather
  getWeather(){
    return store.get(WEATHERINFO) || {};
  },
  // 删除 weather
  removeWeather(){
    store.remove(WEATHERINFO);
  },

  // 保存 subMenu
  saveMenu(subMenu){
    store.set(SUBMENU, subMenu);
  },
  // 读取 weather
  getMenu(){
    return store.get(SUBMENU) || {};
  },
  // 删除 weather
  removeMenu(){
    store.remove(SUBMENU);
  }
}