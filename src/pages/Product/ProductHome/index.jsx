import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Space, Select, Input, Button, Table, message, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqGetProducts, reqSearchProducts, reqUpdateStatus } from '../../../api';
import { GetProduct } from '../../../redux/action/category_list';

const {Option} = Select;


// 商品管理的默认子路由组件——商品主页
export default function ProductHome() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading,setLoading] = useState(false);
  // 总分页
  const [totals,setTotals] = useState(0);
  // 关键字
  const [keyWord, setKeyWord] = useState('');
  // 检索的类型
  const [searchType, setSearchType] = useState('productName');
  // 保存分页信息
  const [pageNum, setPageNum] = useState(1);
  const [num, setNum] = useState(2);



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
      render: (status, productObj) => {
        return (
          <Space size='middle'>
            <Button 
              type='primary' 
              onClick={() => updateStatus(productObj)}
            >
              {status === 1 ? '下架' : '上架'}
            </Button>
            <span>{status === 1 ? '在售' : '已下架'}</span>
          </Space>
        )
      },
      key:'status',
      width:'15%'
    },
    {
      title: '操作',
      render: (productObj) => {
        return(
        <Space size='middle'>
          <Link 
            to="/admin/product/detail?title=商品管理" 
            state={{details:productObj}}  //  路由传递 state 参数
          >详情</Link>
          <Link  
            to="/admin/product/addupdate?title=商品管理" 
            state={{details:productObj, text: '修改商品'}}  //  路由传递 state 参数
          >修改</Link>
        </Space>
      )},
      width:'15%',
      align:'right',
    },
  ]

  // 获取商品分页列表
  const getProduct = async (page, pageSize)=>{
    setLoading(true)
    let res;
    if(keyWord){    //  搜索商品分页列表时请求的接口函数
      res = await reqSearchProducts(searchType, keyWord, page, pageSize)
    }else{          //  获取商品分页列表时请求的接口函数
      res = await reqGetProducts(page, pageSize)
    }
    const {data} = res.data
    setTotals(data.total)
    // console.log(data.list);
    dispatch(GetProduct(data.list))
    setLoading(false)
  }

  

  // 切换分页触发的回调函数
  const handleTableChange = (page, pageSize) => {
    // 保存页码信息
    setPageNum(page);
    setNum(pageSize);
    getProduct(page, pageSize)
  };

  // 更新产品状态
  const updateStatus = async (productObj)=>{
    const {status, _id} = productObj;
    // console.log(status, _id);
    let res;
    if(status === 1){
      res = await reqUpdateStatus(_id, 2)
    }else{
      res = await reqUpdateStatus(_id, 1)
    }
    const status1 = res.data.status;
    if(status1 === 0){
      // 重载当前页面
      getProduct(pageNum, num)
      message.success('操作成功!');
    }
  }

  // 从 redux 中取出保存的分页列表
  const product = useSelector(state => {
    const {product} = state.categoryReducer
    return product
  })

  // 发送AJAX请求
  useEffect(()=>{
    getProduct(pageNum, num)
  },[])

  return (
    <Card
    title={
      <Space size='middle'>
        <Select 
        value= {searchType}
        onChange={value => setSearchType(value)}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input 
          placeholder='关键字' 
          value={keyWord} 
          onChange={event => setKeyWord(event.target.value)}
        />
        <Button 
          type='primary'
          onClick={ () => getProduct(pageNum, num) }
        >搜索</Button>
      </Space>
    }
      extra={
        <Button  type='primary'>
          <Link 
            to="/admin/product/addupdate?title=商品管理" 
            state={{details: undefined, text: '添加商品'}}
          >
          <PlusOutlined style={{marginRight:6}}/>添加商品
          </Link>
        </Button>
      }
    >
      <Table 
        dataSource={product} 
        columns={columns} 
        rowKey='_id'
        bordered
        loading={loading}
        pagination={{
          current: pageNum,
          pageSize: 2,
          total:totals,
          showQuickJumper: true,
          onChange: handleTableChange
        }}
        
      />
    </Card>
  )
}
