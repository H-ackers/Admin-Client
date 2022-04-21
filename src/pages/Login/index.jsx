// 登录的路由组件

import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Demo from '../../components/Demo';
import './index.less';
import logo from '../../assets/images/codecat.ico';
import memoryUtils from '../../utils/memoryUtils';


export default function Login() {
  // 检查登录状态，实现自动登录
  const navigate = useNavigate();
  useEffect(() => { 
    // 在此可以执行任何带副作用操作
    const user = memoryUtils.user;
    if(user && user._id){
      navigate('/admin/home?title=首页', {replace: true});
    }
  }, []); // 如果指定的是[], 回调函数只会在第一次render()后执行

  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt="logo" />
        <h1>React项目:后台管理系统</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>
        <Demo />
      </section>
    </div>
  )
}