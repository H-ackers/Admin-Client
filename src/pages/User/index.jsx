import React, { useState, useEffect } from 'react';
import { Card,Space, Button, Table, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { reqGetUsers, reqAddUser, reqUpdateUser, reqRemoveUser } from '../../api';
import UserForm from './UserForm';
import { formDate } from '../../utils/dayUtils';

const { confirm } = Modal;

// 用户管理
export default function User() {

  let FormRef = React.useRef();

  // 设置 loading
  const [loading, setLoading] = useState(true);
  // 初始化用户列表
  const [userList, setUserList] = useState([]);
  // 保存角色列表
  const [roleList, setRoleList] = useState([]);
  // 初始化角色名称对象
  const [roleNames, setRoleNames] = useState({});
  // 控制 添加/修改分类的模态框的展示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 修改用户信息时获取当前用户信息
  const [user, setUser] = useState({});
  // 显示的 Modal 的标题
  const [modalTitle,setModalTitle] = useState('');

  // 生成包含 (角色_id) 和 (角色名称) 的对象——{ 属性名(_id): 属性值(name) }
  const saveRoleNames = (roles) => {
    const roleName = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    setRoleNames(roleName);
  };

  // 定义左侧标题
  const title = (
    <Button type='primary' onClick={(event)=>showModal(event)}>创建用户</Button>
  )

  // 初始化 columns
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: formDate
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role_id',
      render: (role_id) => roleNames[role_id]   //  根据 role_id 查找 角色名称对象中 与其匹配的 角色名称
      // render: (role_id) => {
      //   if(roleList !== undefined && roleList.length > 0 && role_id){
      //     return roleList.find(role => role._id === role_id).name
      //   }
      // }
    },
    {
      title: '操作',
      render: (userObj) => (
        
        <Space size='large'>
          <a href='#!' onClick={(event)=>showModal(event, userObj)}>修改</a>
          <a href='#!' onClick={()=>showDeleteConfirm(userObj)}>删除</a>
        </Space>
      ),
    },
  ]

  // 获取用户列表 和 角色名称对象
  const getUsers = async () => {
    const res = await reqGetUsers()
    const {status, data} = res.data
    if(status === 0){
      setUserList(data.users)       //  保存用户列表
      saveRoleNames(data.roles)     //  根据 角色列表 生成 角色名称对象
      setRoleList(data.roles)       //  保存角色列表
      setLoading(false)
    }
  }

  // 创建用户
  const addUser = async (data) => {
    const res = await reqAddUser(data)
    if(res.data.status === 0){
      message.success('创建用户成功!')
      getUsers()
    }
  }

  // 修改用户信息
  const updateUser = async (data) => {
    const res = await reqUpdateUser(data)
    if(res.data.status === 0){
      message.success('修改用户信息成功!')
      getUsers()
    }
  }

  // 删除用户
  const deleteUser = async (userId) => {
    const res = await reqRemoveUser(userId)
    if(res.data.status === 0){
      getUsers()
      message.success('删除成功!')
    }
  }


  // 添加/修改用户
  const showModal = (event, userObj)=>{
    setUser({})               //  每次点击按钮先设置 user 为空对象
    
    setIsModalVisible(true)   // 显示 Modal
    
    const title = event.target.innerText    // 获取 当前点击的按钮文本
    setModalTitle(title);                   // 并设置为 Modal 的 标题
    
    
    // 根据 当前 title 判断 Form 展示的内容
    if(title === '创建用户'){  
    }else{  
      setUser(userObj)        //  当点击的是 "修改" 按钮时， 设置 user 为当前点击的 用户对象，为 Form 展示用户信息提供数据
    }
  }

  // 点击确认按钮的回调
  const handleOk = () =>{
    const formValues = FormRef.current.formValues;
    const fields = FormRef.current.fields;

    // 通过 user 区分当前是 创建用户 还是 修改用户信息————
    if(user._id === undefined){                   //   如果 user 为空对象，说明当前为 创建用户
      if(Object.keys(formValues).length === 0){   //  判断用户是否输入，通过 Object.keys() 方法判断 formValues 是否为空对象
        setIsModalVisible(true)
        return
      }else{                                      //  如果有输入行为，但是没有输入用户名或密码，不关闭 Modal，并且 return
        if(formValues.username === undefined || formValues.password === undefined){
          setIsModalVisible(true)
          return
        }else{                                    //  如果输入了用户名或密码
          let error = fields.map(f=>{             //  收集错误信息
            return f.errors
          })
          if(error.find(arr => arr.length !== 0)){    //  如果输入有误，不关闭 Modal，并且 return
            setIsModalVisible(true)
            return
          }else{
            // 发送请求创建用户
            addUser(formValues)
          }
        }
      }
    }else{                                          //  若 user 不是空对象，则当前是修改用户信息
      if(Object.keys(formValues).length === 0){     //  判断用户是否输入，通过 Object.keys() 方法判断 formValues 是否为空对象
        setIsModalVisible(false)
      }else{                                        //  如果有输入行为
        let error = fields.map(f=>{                 //  收集错误信息
          return f.errors
        })
        if(error.find(arr => arr.length !== 0)){    //  如果输入有误，不关闭 Modal，并且 return
          setIsModalVisible(true)
          return
        }else{
          // 发送请求修改用户信息
          formValues._id = user._id;                //  指定要修改用户的 _id
          updateUser(formValues)
        }
      }
    }
    setIsModalVisible(false)
  }

  // 点击取消按钮的回调
  const handleCancel = () =>{
    setIsModalVisible(false)
  }

  // 点击删除按钮的回调
  function showDeleteConfirm(userObj) {
    const {_id, username} = userObj
    confirm({
      title: `确定删除用户${username}吗?`,
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteUser(_id)       //  发送请求删除用户
      },
      onCancel() {
        console.log('哦吼~~您选择了取消删除哦');
      },
    });
  }

  // 页面初次渲染请求用户列表
  useEffect(()=>{
    getUsers()
  },[])

  return (
    <Card title={title}>
      <Table
        rowKey='_id'
        columns={columns}
        dataSource={userList} 
        loading={loading}
      />
      <Modal 
        title={modalTitle}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <UserForm user={user} roleList={roleList} onRef={FormRef}/>
      </Modal>
    </Card>
  )
}
