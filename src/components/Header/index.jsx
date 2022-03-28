import React,{ useState,useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


import { formDate } from '../../utils/dayUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import './index.less';
import weatherIcon from '../../assets/images/cat (3)~1.ico';

const { confirm } = Modal;

export default function Header() {
  const navigate = useNavigate();

  // 从本地存储中读取 天气信息
  const weather = storageUtils.getWeather().weather;

  // 从内存中读取 用户名
  const user = memoryUtils.user.username;

  // 接收 search 参数，动态显示右侧菜单标题
  const [search,setSearch] = useSearchParams();
  const title = search.get('title');

  // 初始化时间
  let [time,setTime] = useState(formDate(Date.now()));

  function updateDate(){
    setTime(()=>{ // 定义更新时间的回调
      // 覆写时间
      setTime(formDate(Date.now()));
    });
  }

  useEffect(()=>{
    let timer = setInterval(() => {
      updateDate(); //  动态显示时间（每秒中调用一次）
    }, 1000);
    return ()=>{
      clearInterval(timer);
    };
  }, [time]);
  
  // 退出登录的回调函数
  function logout() {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确认退出吗?',
      onOk() {
        // 1.删除保存的数据
        storageUtils.removeMenu();
        storageUtils.removeWeather();
        storageUtils.removeUser();
        memoryUtils.user = {};
        // 2.跳转到登录页面
        navigate('/login', {replace:true});
      }
    });
  }


  
  return (
    <div className='header'>
      <div className="header-top">
        <span>欢迎,
          <p> {user}</p>
        </span>
        <a href="#!" onClick={logout}>退出</a>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">
          <h1>{title}</h1>
        </div>
        <div className="header-bottom-right">
          <span>{time}</span>
          <img src={weatherIcon} alt="weatherIcon" />
          <span>{weather}</span>
        </div>
      </div>
      
    </div>
  )
}
