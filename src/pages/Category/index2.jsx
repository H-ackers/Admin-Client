import React,{ useState, useEffect, useCallback } from 'react';
import { Card,Table,Button,Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqGetCategories } from '../../api';

// 商品分类
export default function Category() {

  // 获取 card 的右侧标题
  const title = '一级分类列表';
  const columns = [    // 初始化 table 所有列的数组
    {
      title: '分类的名称',
      dataIndex: 'name',  //  显示数据对应的属性名
      key:'name',
    },
    {
      title: '操作',
      render: () => (
        <Space size='large'>
          <a>修改分类</a>
          <a>查看子分类</a>
        </Space>
      ),
      width:'30%',
      align:'right',
    },
  ]

  // 为第一次渲染准备数据
  let [state,setState] = useState([{categories: []}]);
  
  // const useSyncCallback = callback => {
  //   const [proxyState, setProxyState] = useState({ current: false })

  //   const Func = useCallback(() => {
  //       setProxyState({ current: true })
  //   }, [proxyState])

  //   useEffect(() => {
  //       if (proxyState.current === true) setProxyState({ current: false })
  //   }, [proxyState])

  //   useEffect(() => {
  //       proxyState.current && callback()
  //   })

  //   return Func
  // }

  // const func = useSyncCallback(() => {
  //   console.log(state);
  // });

  // 获取一级商品列表
  const getCategory = async ()=>{
    const res = await reqGetCategories('0')
    const {data} = res.data
    state.categories = data
    setState(state)
    console.log(state);
  }
  getCategory()

  // 发送 AJAX 请求
  useEffect(()=>{
    getCategory()
  })



  
  // 
  const {categories} = state;

  console.log('@@@@#',categories);
  
  
  
  

  return (
    <Card 
      title={title} 
      extra={<Button type='primary' ><PlusOutlined />添加</Button>} 
    >
      <Table 
        dataSource={categories}
        columns={columns} 
        rowKey='_id'
        bordered
      />
    </Card>
  )
}
