/*
要求：
    能根据接口文档定义接口请求函数
    包含应用中所有接口请求函数的模块
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

// 获取商品分页列表
export const reqGetProducts = (pageNum, pageSize) => sendAJAX(
  '/manage/product/list',
  {pageNum, pageSize}
);

// 搜索商品分页列表
export const reqSearchProducts = (searchType, keyWord, pageNum, pageSize) => sendAJAX(
  '/manage/product/search',
  {
    [searchType]: keyWord,
    pageNum,
    pageSize
  },
);

// 更新商品状态(下架/上架)
export const reqUpdateStatus = (productId, status) => sendAJAX(
  '/manage/product/updateStatus',
  {productId, status},
  'POST'
);

// 根据 Id 获取分类
export const reqFindCategory = (categoryId) => sendAJAX(
  '/manage/category/info',
  {categoryId}
);
// 添加商品/更新商品信息
export const reqAddOrUpdateProduct = (product) => sendAJAX(
  '/manage/product/' + (product._id ? 'update' : 'add'),
  product,
  'POST'
);

// // 更新商品信息
// export const reqUpdateProduct = (product) => sendAJAX(
//   '/manage/product/update',
//   product,
//   'POST'
// );

// 删除商品图片
export const reqRemoveProductImg = (name) => sendAJAX(
  '/manage/img/delete',
  {name},
  'POST'
);

// 获取角色列表
export const reqGetRoles = () => sendAJAX(
  '/manage/role/list',
);

// 添加角色
export const reqAddRoles = (roleName) => sendAJAX(
  '/manage/role/add',
  {roleName},
  'POST'
);

// 设置角色权限
export const reqUpdateRole = (role) =>sendAJAX(
  '/manage/role/update',
  role,
  'POST'
);

// 获取用户列表
export const reqGetUsers = () => sendAJAX(
  '/manage/user/list',
);

// 添加用户
export const reqAddUser = (data) => sendAJAX(
  '/manage/user/add',
  data,
  'POST'
);

// 更新用户信息
export const reqUpdateUser = (user) => sendAJAX(
  '/manage/user/update',
  user,
  'POST'
);

// 删除用户
export const reqRemoveUser = (userId) => sendAJAX(
  '/manage/user/delete',
  {userId},
  'POST'
);

// 请求天气

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=867a419c041242be45e8cc21e4787901&city=${city}`;
    // 发送 jsonp 请求
    jsonp(url, {}, (err, data)=>{
      // 如果请求成功
      if(!err && data.status === '1'){
        // 取出需要的数据（天气）
        const info = data.lives[0];
        storageUtils.saveWeather(info);
        // console.log(info);
        resolve(info);
      }else{
        // 如果请求失败
        reject(err,'天气信息获取失败');
      }
    });
  });
};


reqWeather('110000');