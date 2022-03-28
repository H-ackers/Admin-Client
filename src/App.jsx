import React,{ Fragment, useEffect } from 'react';
import { NavLink, useRoutes, } from 'react-router-dom';
import 'antd/dist/antd.less';
import routes from './routes';

export default function App() {
  // 根据路由表生成对应的路由规则
  const elements = useRoutes(routes);
  return (
    <Fragment>
      {/* 路由链接 */}
      <NavLink to="login"></NavLink>
      <NavLink to="admin"></NavLink>
      {/* 注册路由 */}
      {elements}
    </Fragment>
  )
}
