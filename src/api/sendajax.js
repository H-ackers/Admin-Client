/*
  能发送异步 AJAX 请求的模块函数
  封装 axios 库
  函数的返回值是 Promise 对象
*/ 

import { message } from 'antd';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api1',
  timeout: 2000,
});

// 对 sendAJAX 函数的优化
export default function sendAJAX(url, data={}, type='GET'){
  return new Promise((resolve, reject) => {
    let promise;
    if(type === 'GET'){         //  发送 GET 请求
      promise =  instance.get(
        url,
        {                       //  配置对象
          params: data          //  指定请求参数
        }
      );
    }else if(type === 'POST'){  //  发送 POST 请求
      promise =  instance.post(url, data);
    }

    // 对 promise 结果进行处理
    promise.then((response) => {
      resolve(response);
      const {status,msg} = response.data;
      if(status === 1){   //  如果状态码为 1，提示用户输入有误
        message.error(msg);
      }
      // console.log(response.data);
      // console.log(response);   //  查看发送请求的响应体
    }).catch(error => {
        console.warn(error);
        message.error(error + ' 网络异常!');
      });
  });
}

// export default function sendAJAX(url, data={}, type='GET'){

  // switch (type) {
  //   case 'GET': //  发送 GET 请求
  //     return instance.get(
  //       url,
  //       {   //  配置对象
  //         params: data   //  指定请求参数
  //       }
  //     ).then(response => {
  //       console.log(response.data);
  //     }).catch(error => {
  //       console.warn(error);
  //     });
  //   case 'POST':  //  发送 POST 请求
  //     return instance.post(url, data).then(response => {
  //       console.log(response.data);
  //     }).catch(error => {
  //       console.warn(error);
  //     });

  //   default:
  //     break;
  // }
// }

// 请求登录接口
// sendAJAX('/login', {username: 'tom001', password: 'tom001'}, 'POST');
// 添加用户接口
// sendAJAX('/manage/user/add', {username: 'tom001', password: 'tom001'}, 'POST');


