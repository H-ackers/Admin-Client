/*
要求：能根据接口文档定义接口请求函数
  包含应用中左右接口请求函数的模块
  每个函数的返回值都是 Promise 对象
*/ 
import jsonp from 'jsonp';
import sendAJAX from './sendajax';
import storageUtils from '../utils/storageUtils';

// 登录

// 普通函数写法
// export function reqLogin(username, password){
//   return sendAJAX('/login', {username, password}, 'POST');
// }

// 箭头函数写法
export const reqLogin = (username, password) => sendAJAX(
  '/login',
  {username, password},
  'POST'
);

// 获取商品分类列表
export const reqGetCategories = (parentId) => sendAJAX(
  '/manage/category/list?', 
  {parentId},
  'GET' //  默认发送 get 请求，可以省略不写
  );

// 添加分类列表
export const reqAddCategory = (categoryName, parentId) => sendAJAX(
  '/manage/category/add', 
  {categoryName, parentId},
  'POST'
  );

// 更新分类列表 
export const reqUpdateCategory = (categoryName, categoryId) => sendAJAX(
  '/manage/category/update', 
  {categoryName, categoryId},
  'POST'
  );

// 添加用户
export const reqAddUser = (data) => sendAJAX(
  '/manage/user/add',
  data,
  'POST'
);

// 

// 请求天气

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=867a419c041242be45e8cc21e4787901&city=${city}`;
    // 发送 jsonp 请求
    jsonp(url, {}, (err, data)=>{
      // console.log('@@reqWeather2', err, data);
      // 如果请求成功
      if(!err && data.status === '1'){
        // console.log("@@",data.lives[0]);
        // 取出需要的数据（天气）
        const info = data.lives[0];
        storageUtils.saveWeather(info);
        console.log(info);
        resolve(info);
      }else{
        // 如果请求失败
        reject(err,'天气信息获取失败');
      }
    });
  });
};


reqWeather('110000');