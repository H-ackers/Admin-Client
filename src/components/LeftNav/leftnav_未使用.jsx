import React,{Component, useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import menuList from '../../config/menuConfig';
import './index.less';
import logo from '../../assets/images/cat (3).png'

const { SubMenu } = Menu;

export default class LeftNav extends Component {
  render(){
    // 获取当前路由的 pathname，动态高亮显示当前路由链接
  // const {pathname} = this.props.history();
  // const _path = pathname.substring(pathname.lastIndexOf('/')+1);
  // console.log(_path);
  let _key;
  let targetArr = [];

  // 根据 menu 的数据数组生成对应的标签数组
  this.getMenuNodes = (menuList)=>{
    return menuList.map((menuMsg)=>{
        
      const {title, path, icon, children} = menuMsg
      if(!menuMsg.children){
        return (
          <Menu.Item key={path} icon={icon}>
            <Link to={path} >{title}</Link>
          </Menu.Item>
        )
      }else{
        // 查找一个与当前请求路径相匹配的子 Item
        // const checkItem = menuMsg.children.find(cItem => cItem.path === _path)
        // if(checkItem){
        //   console.log(menuMsg.path);
        //   _key = menuMsg.path;
        // }
        
        return (
          <SubMenu key={path} icon={icon} title={title}>
            {this.getMenuNodes(children)}
          </SubMenu>
        )
      }
    })
  }
  // console.log(targetArr);


  return (
    <div className='left-nav'>
      <Link to='home' className='left-nav-header'>
        <img src={logo} alt="logo" />
        <h2>帽子后台</h2>
      </Link>
      <Menu
        // 默认高亮显示当前路由链接
        // defaultSelectedKeys={[_path]}
        // defaultOpenKeys={[_key]}
        // openKeys={['']}
        mode="inline"
        theme="dark"
      >
        
        {this.getMenuNodes(menuList)}
      </Menu>
    </div>
  )
  }

  
}
