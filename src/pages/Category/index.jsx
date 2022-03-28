import React,{ useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card,Table,Button,Space } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { reqGetCategories } from '../../api';

// 引入 ActionCreator，专用于创建 action 对象
import { GetCategory, GetAsyncCategory } from '../../redux/action/category_list';



// 商品分类
export default function Category() {
  const dispatch = useDispatch();
  const getRef = useRef();
  const navigate = useNavigate();

  


  // 默认请求一级列表时, 父分类列表的 parentId 为 '0'
  const [parentId,setParentId] = useState('0');
  // 默认当前二级列表的父分类名称 parentName 为 ''
  const [subName, setSubName] = useState('');

  // 获取 card 的右侧标题
  const title = parentId === '0' ? "一级分类列表" : (
    <Space size='middle'>
      <a href='#!' onClick={forward}>一级分类列表</a>
      <ArrowRightOutlined />
      <span>{subName}</span>
    </Space>
  );

  // 为第一次渲染准备数据
  const columns = [    // 初始化 table 所有列的数组
    {
      title: '分类的名称',
      dataIndex: 'name',  //  显示数据对应的属性名
      key:'name',
    },
    {
      title: '操作',
      render: (categoryObj) => (
        
        <Space size='large'>
          <a href='#!'>修改分类</a>
          {parentId === '0' ? <a href='#!' onClick={ ()=>showSubList(categoryObj) }>查看子分类</a> : <></>}
        </Space>
      ),
      width:'30%',
      align:'right',
    },
  ]
  



  // 获取一级/二级商品列表
  const getCategory = async ()=>{
    const res = await reqGetCategories(parentId)
    if(parentId !== '0'){
      // 请求的是二级分类商品的列表
      console.log('当前请求的是二级列表');
    }
    const {data} = res.data
    dispatch(GetAsyncCategory([...data],500))
    
  }

  // 展示二级分类列表
  const showSubList = (categoryObj)=>{
    // 更新 parentId 和 获取二级列表名称 name
    const {_id, name } = categoryObj  //  解构对象
    setParentId(_id)
    setSubName(name)
    console.log(parentId,subName);
    getCategory()
  }

  // 回到一级分类列表
  function forward(){
    navigate(-1)
    setParentId('0')
    setSubName('')
  }


  const category = useSelector(state => {
    const {category} = state.categoryReducer
    return category
  })
  console.log(category);


  // 发送 AJAX 请求
  useEffect(()=>{
    getCategory()
  },[parentId])

  


  return (
    <Card 
      title={title} 
      extra={<Button type='primary' onClick={forward} ><PlusOutlined />添加</Button>} 
    >
      <Table 
        dataSource={category} 
        columns={columns} 
        rowKey='_id'
        bordered
        pagination={{defaultPageSize: 5, showQuickJumper: true}}
      />
      
    </Card>
  )
}
