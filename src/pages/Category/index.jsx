import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card,Table,Button,Space,Spin,Modal, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined, LoadingOutlined  } from '@ant-design/icons';
import { reqGetCategories, reqAddCategory, reqUpdateCategory } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import { Model } from './Modal';
// 引入 ActionCreator，专用于创建 action 对象
import { GetCategory } from '../../redux/action/category_list';

  // 创建 Context 对象
export const ModalContext = React.createContext();
const {Provider} = ModalContext;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />


// 商品分类
export default function Category() {
  const dispatch = useDispatch();
  
  

  // 默认请求一级列表时, 父分类列表的 parentId 为 '0'
  const [parentId,setParentId] = useState('0');
  // 默认当前二级列表的父分类名称 parentName 为 ''
  const [subName, setSubName] = useState('');
  // 初始化一级列表数组，用于向 Modal 传递展示的下拉列表
  const [categoryList,setCategoryList] = useState()
  // 用于控制重载页面
  const [list, setList] = useState();
  // 添加向二级列表过渡时 loading 效果
  const [loading,setLoading] = useState(true);
  // 控制 添加/修改分类的模态框的展示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 选择性展示模态框内容
  const [show, setShow] = useState('none');
  // 显示的 Modal 的标题
  const [modalTitle,setModalTitle] = useState('');



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
          <a href='#!'  onClick={(event)=>showModal(event, categoryObj)} >修改分类</a>
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
    const {data} = res.data
    if(parentId === '0'){
      setCategoryList(data)   //  保存一份一级列表，用于给 Modal 的添加分类提供列表展示
    }else{                    // 请求的是二级分类商品的列表
      // console.log('当前请求的是二级列表');
    }
    dispatch(GetCategory(data))
    setLoading(false)
  }

  // 展示二级分类列表
  const showSubList = (categoryObj)=>{
    setLoading(true)
    // 更新 parentId 和 获取二级列表名称 name
    const {_id, name } = categoryObj  //  解构对象
    setParentId(_id)
    setSubName(name)
    getCategory()
    setList(1)
  }

  // 回到一级分类列表
  function forward(){
    // navigate(-1)
    setParentId('0')
    setSubName('')
    setList(0)
  }

  // 修改/添加分类
  const showModal = (event, categoryObj)=>{
    memoryUtils.form = {}
    memoryUtils.status = ''
    // 显示 Modal
    setIsModalVisible(true)
    // 获取 当前点击的按钮文本，并设置为 Modal 的 标题
    const title = event.target.innerText
    setModalTitle(title);
    
    // 根据 当前 title 判断 Modal 展示的部分内容
    if(title === '添加'){  
      setShow('block')    //  添加分类时显示 Modal 的所属分类项
      memoryUtils.category = {}   //  并且添加分类时不需要默认显示分类名称
    }else{  
      setShow('none')   //  修改分类时隐藏 Modal 的所属分类项
      memoryUtils.category = categoryObj    //  把当前选中的分类对象存入内存中
    }
  }
  
  // 定义添加分类的方法
  const addNewCategory = async ()=>{
    // 从内存中读取当前 Modal 中的 form
    const {belong, title} = memoryUtils.form
    if(memoryUtils.status === '0'){
      if(belong !== undefined){
        const res = await reqAddCategory(title, belong);    //  发送添加分类请求
        const {status} = res.data
        if(status === 0){
          message.success('添加分类成功!')
        }
        memoryUtils.status = ''
      }
    }
  }

  // 定义修改分类的方法
  const updateCategory = async ()=>{
    // 从内存中读取当前 category 中的 _id 
    const {_id} = memoryUtils.category
    // 从内存中读取当前 Modal 中的 form 的 title
    const {title} = memoryUtils.form
    if(memoryUtils.status === '0'){
      if(_id !== undefined){
        const res = await reqUpdateCategory(title, _id);  //  发送修改分类请求
        const {status} = res.data
        if(status === 0){
          message.success('修改分类成功!')
        }
        memoryUtils.status = ''
      }
    }
  }

  // 确认修改/添加
  const handleOk = ()=>{
    const {belong, title} = memoryUtils.form
    const {name} = memoryUtils.category
    // 表单验证
    if(name !==undefined){                //  如果是修改分类(name!==undefined)
      if(title === undefined){            //  如果修改分类时未输入(title===undefined)---说明未修改分类，不需要发送请求
        setIsModalVisible(false)          //  直接关闭 Modal，并且跳出
        return
      }else{                              //  如果修改分类时有输入行为
        if(title === ''){                 //  如果修改分类时输入为空
          setIsModalVisible(true)         //  不关闭 Modal，并且不执行后续操作
          return
        }else if(title === name){         //  如果修改分类时输入的分类和原分类名称一致
          setIsModalVisible(false)        //  关闭 Modal，并且不执行后续操作
          return
        }else{
          let num = title.indexOf(' ');
          if(num !== -1){                 //  如果输入包含空格
            setIsModalVisible(true)       //  不关闭 Modal，并且不执行后续操作
            return
          }
        }
      }
    }else{                                //  如果是添加分类(name===undefined)
      if(title === undefined || title === ''){    //  如果添加分类时未输入(title===undefined)或输入为空(title==='')
        setIsModalVisible(true);          //  不关闭 Modal
        return                            //  并且不执行后续操作(设置状态码、发送请求)
      }else{
        let num = title.indexOf(' ');
          if(num !== -1){                 //  如果输入包含空格
            setIsModalVisible(true)       //  不关闭 Modal，并且不执行后续操作
            return
          }
      }
    }
    
    memoryUtils.status = '0'  //  修改内存中的状态码为 '0'，用于控制发送请求的时机
    if(show === 'block'){     //  确认添加分类
      addNewCategory()        //  调用添加分类的方法
    }else{                    //  确认修改分类
      updateCategory()        // 调用修改分类的方法
    }
    if(parentId === belong){  //  当 parentId 和 所要修改/添加的列表对象的 _id 相同时，才重载列表
      getCategory()
    }
    setIsModalVisible(false)  //  关闭 Modal
  }
  // 取消修改/添加分类
  const handleCancel = ()=>{
    setIsModalVisible(false)
  }

  

  // 从 redux 中取出保存的列表
  const category = useSelector(state => {
    const {category} = state.categoryReducer
    return category
  })


  // 发送 AJAX 请求获取列表
  useEffect(()=>{
    getCategory()
    
  },[list])

  


  return (
    <Card 
      title={title} 
      extra={<Button onClick={(event)=>showModal(event)} type='primary'><a><PlusOutlined style={{marginRight:6}}/>添加</a></Button>} 
    >
      <Spin indicator={antIcon} spinning={loading} style={{background: '#ffffff96'}}>
        <Table 
          dataSource={category} 
          columns={columns} 
          rowKey='_id'
          bordered
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
        />
      </Spin>
      <Modal 
        title={modalTitle}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Provider value={{categoryList, show, parentId, memoryUtils}}>
          <Model />
        </Provider>
      </Modal>
    </Card>
  )
}
