import React, { Component } from 'react'
import { Card,Table,Button,Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqGetCategories } from '../../api';

export default class Category extends Component {
  state = {categories:[]}

  getCategory = async () => {
    // 发异步ajax请求, 获取数据
    const result = await reqGetCategories('0')
    const {data} = result.data
      this.setState({categories:data})
      console.log(data);
  }
  
  // 执行异步任务: 发异步ajax请求
  componentDidMount () {
    // 获取一级分类列表显示
    this.getCategory()
  }
  render() {
    const {categories} = this.state;
    const title = '一级分类列表';

  // 为第一次渲染准备数据
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
        pagination={{defaultPageSize: 5, showQuickJumper: true}}
      />
    </Card>
    )
  }
}
