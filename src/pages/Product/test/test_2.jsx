import React from 'react';
import { Link } from 'react-router-dom';
import { Space, Button, Table, } from 'antd';

  // 为第一次渲染准备数据
  const columns = [    // 初始化 table 所有列的数组
    {
      title: '商品名称',
      dataIndex: 'name',  //  显示数据对应的属性名
      key:'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key:'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price) => '￥' + price,
      key:'price',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        
          return (<Space size='middle'>
            <Button type='primary'>下架</Button>
            <span>在售</span>
          </Space>)
        
      },
      key:'status',
      width:'15%'
    },
    {
      title: '操作',
      render: (productObj) => (
        
        <Space size='middle'>
          {/* <a href='#!' >详情</a>
          <a href='#!' >修改</a> */}
          <Link to='/admin/product/detail?title=商品管理'>详情</Link>
          <Link to='/admin/product/addupdate?title=商品管理'>修改</Link>
        </Space>
      ),
      width:'15%',
      align:'right',
    },
  ]


export class Test extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 2,
      
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination) => {
    this.fetch({ pagination });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    const {pagination:{current, pageSize}} = this.state
    fetch(`http://localhost:3000/api1/manage/product/list?pageNum=${current}&pageSize=${pageSize}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
          data: data.data.list,
          pagination: {
            ...params.pagination,
            total: data.data.total,
            showQuickJumper: true
          },
        });
      });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        columns={columns}
        dataSource={data}
        rowKey='_id'
        bordered
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
