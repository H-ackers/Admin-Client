import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import './index.less';
import sleep from '../../assets/images/cute.png';

// 404 not-found 页面
export default function NoFound() {
  const navigate = useNavigate();

  // 定义回到首页的回调
  const toHome = ()=>{
    navigate('/login' ,{replace: true});
  }

  return (
    <div className='no-found'>
      <div className='left'>
        <img src={sleep} alt="sleep" />
      </div>
      <div className='right'>
        <h1>404</h1>
        <span>抱歉, 你访问的页面不存在</span>
        <div>
          <Button type='primary' onClick={toHome}>回到首页</Button>
        </div>
      </div>
    </div>
  )
}
