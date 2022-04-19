import {
  DesktopOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
const menuList = [
  {
    isPublic: true,
    title: '首页',
    path: 'home',
    icon: <DesktopOutlined/>,
  },
  {
    title: '商品',
    path: 'goods',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: '品类管理',
        path: 'category',
        icon: <UnorderedListOutlined />,
      },
      {
        title: '商品管理',
        path: 'product/product_home',
        icon: <ToolOutlined />,
      },
    ]
  },
  {
    title: '用户管理',
    path: 'user',
    icon: <UserOutlined />,
  },
  {
    title: '角色管理',
    path: 'role',
    icon: <SafetyOutlined />,
  },
  {
    title: '图形图表',
    path: 'charts',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '折线图',
        path: 'line',
        icon: <LineChartOutlined />,
      },
      {
        title: '柱状图',
        path: 'bar',
        icon: <BarChartOutlined />,
      },
      {
        title: '饼图',
        path: 'pie',
        icon: <PieChartOutlined />,
      },
    ]
  }
]
export default menuList;