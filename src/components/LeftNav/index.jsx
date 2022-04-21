import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import menuList from '../../config/menuConfig';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import './index.less';
import logo from '../../assets/images/codecat.ico';

const { SubMenu } = Menu;

export default function LeftNav() {

  // 获取当前路由的 pathname，动态高亮显示当前路由链接
  const {pathname} = useLocation();

  //#region 
  // console.log(pathname);
  // const _pathArr = pathname.split('/');
  // // const newPathName = pathname.substring(0,pathname.length-pathname.substring(pathname.lastIndexOf('/')).length);
  // let _path;
  // // const _newPath = newPathName.substring(newPathName.lastIndexOf('/')+1);
  // // _path = _newPath;
  // // if(_newPath === 'admin'){
  //   // _path = pathname.substring(pathname.lastIndexOf('/')+1);
  // // }else{
  // //   _path = _newPath;
  // // }
  // const checkPath = _pathArr.find(cItem => cItem === 'product');
  // if(checkPath){
    // _path = 'product/product_home';
  // }else{
  //   _path = pathname.substring(pathname.lastIndexOf('/')+1);
  // }
  
  // console.log(_path);
  //#endregion

  // 判断当前登录的用户对 menu 是否有权限
  const hasAuth = (menuMsg) => {
    // 
    const {path, isPublic} = menuMsg;       //  获取每个 menuMsg 的 path 和 公共属性(isPublic)
    const {menus} = memoryUtils.user.role;  //  获取内存中保存的当前登录用户信息的权限菜单数组
    const {username} = memoryUtils.user;    //  获取当前登录的用户名
    if(username === 'admin' || isPublic || menus.indexOf(path) !== -1){   //  如果当前登录的是 'admin' 或者 当前的 menuMsg 具有公共属性 或者 当前menuMsg 的 path 有与当前登录用户的 menus 中某些项匹配(说明该用户具有该权限)
      return true;                          //  返回一个 布尔值 true
    }else if(menuMsg.children){   //  如果当前的 menuMsg 具有子菜单
      if(menuMsg.children.find(child => menus.indexOf(child.path) !== -1)){   //  并且当前的 menuMsg 子菜单 中的 path 与当前登录用户的 权限有匹配
        return true;
      }
    }else{      //  如果该项菜单未匹配，返回 false
      return false;
    }
  };

  // 根据 menu 的数据数组生成对应的标签数组
  const getMenuNodes = (menuList)=>{
    return menuList.map((menuMsg)=>{
      if(hasAuth(menuMsg)){       //  如果 menuMsg 有部分权限，则动态生成该权限对应的部分菜单
        const {title, path, icon, children} = menuMsg;
        if(!menuMsg.children){
          return (
            <Menu.Item key={path} icon={icon}>
              <Link to={`${path}?title=${title}`} >{title}</Link>
            </Menu.Item>
          )
        }else{
          // 查找一个与当前请求路径相匹配的子 Item
          const checkItem = menuMsg.children.find(cItem => cItem.path === _path)
          if(checkItem){    //  保存默认打开的菜单路径
            storageUtils.saveMenu(menuMsg.path);
          }
          
          return (
            <SubMenu key={path} icon={icon} title={title}>
              {getMenuNodes(children)}
            </SubMenu>
          )
        }
      }
    })
  }

  const _pathArr = pathname.split('/');
  const checkPath = _pathArr.find(cItem => cItem === 'product');
  if(checkPath){    //  针对 product 路由 保存高亮路径
    storageUtils.savePath('product/product_home')
    storageUtils.saveMenu('goods')
  }else{    //  非 product 路由 保存高亮路径
    storageUtils.savePath(pathname.substring(pathname.lastIndexOf('/')+1))
  }

  // 从本地存储获取 高亮 路径
  const _path = storageUtils.getPath()
  // console.log(_path);

  // 从本地存储获取 默认打开的 菜单路径
  const m = storageUtils.getMenu();
  // console.log(m);

  return (
    <div className='left-nav'>
      {/* <Link to={`home?title=首页`} className='left-nav-header'> */}
      <Link to='/login' className='left-nav-header'>
        <img src={logo} alt="logo" />
        <h2>电商后台</h2>
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
