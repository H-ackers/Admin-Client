import React,{ useState,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import menuList from '../../config/menuConfig';
import storageUtils from '../../utils/storageUtils';
import './index.less';
import logo from '../../assets/images/cat (3)~1.ico'

const { SubMenu } = Menu;

export default function LeftNav() {

  // 获取当前路由的 pathname，动态高亮显示当前路由链接
  const {pathname} = useLocation();
  const _path = pathname.substring(pathname.lastIndexOf('/')+1);
  console.log(_path);


  // 根据 menu 的数据数组生成对应的标签数组
  const getMenuNodes = (menuList)=>{
    return menuList.map((menuMsg)=>{
        
      const {title, path, icon, children} = menuMsg
      if(!menuMsg.children){
        return (
          <Menu.Item key={path} icon={icon}>
            <Link to={`${path}?title=${title}`} >{title}</Link>
          </Menu.Item>
        )
      }else{
        // 查找一个与当前请求路径相匹配的子 Item
        const checkItem = menuMsg.children.find(cItem => cItem.path === _path)
        if(checkItem){
          storageUtils.saveMenu(menuMsg.path);
          console.log(menuMsg.path);
        }
        
        return (
          <SubMenu key={path} icon={icon} title={title}>
            {getMenuNodes(children)}
          </SubMenu>
        )
      }
    })
  }

  useEffect(()=>{
    // getMenuNodes(menuList);
  })

  const m = storageUtils.getMenu();
  console.log(m);

  return (
    <div className='left-nav'>
      {/* <Link to={`home?title=首页`} className='left-nav-header'> */}
      <Link to='/login' className='left-nav-header'>
        <img src={logo} alt="logo" />
        <h2>帽子后台</h2>
      </Link>
      <Menu
        // 默认高亮显示当前路由链接
        defaultSelectedKeys={[_path]}
        defaultOpenKeys={[m]}
        mode="inline"
        theme="dark"
      >
        
        {getMenuNodes(menuList)}
      </Menu>
    </div>
  )
}
