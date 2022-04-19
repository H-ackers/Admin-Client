import React from 'react';
import { Link } from 'react-router-dom';
import { Space, Button, Table, } from 'antd';
import { reqGetProducts } from '../../api';

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
          <Link to='/admin/product/detail?title=商品管理'>详情</Link>
          <Link to='/admin/product/addupdate?title=商品管理'>修改</Link>
        </Space>
      ),
      width:'15%',
      align:'right',
    },
  ]



export class Test extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      count: 0,
      loading: false
    };
  }

  getData(page, pageSize){
    this.setState({ loading: true })
    reqGetProducts(page, pageSize).then( res => {
      console.log(res);
      const {list, total} = res.data.data
      this.setState({
        data: list,
        count: total,
        loading: false
      })
    })
  }
  

  componentDidMount() {
    this.getData(1,2)
  }

  handleTableChange = (page, pageSize) => {
    console.log(page, pageSize)
    this.getData(page, pageSize)
  };


  render() {
    const { data, count, loading } = this.state;
    return (
      <Table
        columns={columns}
        dataSource={data}
        rowKey='_id'
        bordered
        loading={loading}
        pagination={{
          total:count,
          pageSize:2,
          onChange:this.handleTableChange
        }}
      />
    );
  }
}
