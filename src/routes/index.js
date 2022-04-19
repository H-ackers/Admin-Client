/*
  路由表
*/ 

// 一级路由
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";

// 二级路由
import Home from "../pages/Home";
import User from "../pages/User";
import Role from "../pages/Role";

import Category from "../pages/Category";
import Product from "../pages/Product";
import Bar from "../pages/Charts/bar";
import Line from "../pages/Charts/line";
import Pie from "../pages/Charts/pie";

// 三级路由
import ProductHome from "../pages/Product/ProductHome";
import AddUpdate from "../pages/Product/AddUpdate";
import Detail from "../pages/Product/Detail";



// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/login',
    element:<Login/>
  },
  {
    path: '/admin',
    element:<Admin/>,
    children:[
      {
        path:'home',
        element:<Home/>
      },
      {
        path:'category',
        element:<Category/>
      },
      {
        path:'product',
        element:<Product/>,
        children:[
          {
            path:'product_home',
            element:<ProductHome/>
          },
          {
            path:'addupdate',
            element:<AddUpdate/>
          },
          {
            path:'detail',
            element:<Detail/>
          },
        ]
      },
      {
        path:'user',
        element:<User/>
      },
      {
        path:'role',
        element:<Role/>
      },
      {
        path:'bar',
        element:<Bar/>
      },
      {
        path:'line',
        element:<Line/>
      },
      {
        path:'pie',
        element:<Pie/>
      }
    ]
    
  },
  {
    path: '/',
    element:<Navigate to='login'/>
  }
]