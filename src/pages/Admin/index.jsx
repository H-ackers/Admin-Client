// 后台管理的路由组件
// 

import React, { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

import { reqWeather } from '../../api';

import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

const { Sider, Content } = Layout;


export default function Admin() {

  const navigate = useNavigate();
  useEffect(() => { 
    const user = memoryUtils.user;
    if(user && user._id){
      navigate('/admin/home?title=首页', {replace: true});
    }
  }, []);

  reqWeather('110000');
  const {username} = memoryUtils.user;
  // console.log(username);
  const user = storageUtils.getUser().username;
  // console.log(user);
  return (
    <Fragment>
      <Layout hasSider style={{height: '100%'}}>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <LeftNav />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0 }}/>
          <Content 
            style={{ 
              margin: '24px 16px 0',
              overflow: 'auto',
              background:'#fff'
            }}
          >
            <div style={{minHeight:'100%'}}><Outlet /></div>
            <Footer />
          </Content>
          
        </Layout>
      </Layout>
    </Fragment>
  )
}
