import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Space, Button, Table, Modal, Form, Input, message } from 'antd';
import { reqGetRoles, reqAddRoles, reqUpdateRole } from '../../api';
import UpdateRole from './UpdateRole';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import { formDate } from '../../utils/dayUtils';

// 角色管理
export default function Role() {
  const navigate = useNavigate();

  let AuthRef = React.useRef();
  // 设置 loading
  const [loading, setLoading] = useState(true);
  // 保存新建角色名称
  const [roleName, setRoleName] = useState('');
  // 初始化角色列表
  const [roleList, setRoleList] = useState([]);
  // 用于控制设置角色权限按钮的可用状态
  const [disabled, setDisabled] = useState(true);
  // 存储 selectRowKeys(指定选中项的 key 数组)
  const [selectedRowKeys,setSelectedRowKeys] = useState([]);
  // 保存 selectedRows(指定选中项 对象)
  const [role, setRole] = useState({});
  // 控制 Modal 的展示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAuth, setIsModalAuth] = useState(false);

  // 展示创建角色 Modal
  const showModal = () => {
    setRoleName('');
    setIsModalVisible(true);
  };

  // 展示设置角色权限 Modal
  const showModalAuth = () => {
    setIsModalAuth(true);
  };
  // 定义左侧标题
  const title = (
    <Space size='middle'>
      <Button type='primary' onClick={showModal}>创建角色</Button>
      <Button type='primary' disabled={disabled} onClick={showModalAuth}>设置角色权限</Button>
    </Space>
  )

  // 初始化 columns
  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: '角色创建时间',
      dataIndex: 'create_time',
      render: (create_time) => formDate(create_time)
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: formDate
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
  ];

  // 获取角色列表
  const getRoles = async () => {
    const res = await reqGetRoles()
    const {status, data} = res.data
    if(status === 0){         //  如果请求角色列表成功
      setRoleList(data)       //  保存角色列表
      setLoading(false)       //  列表更新成功后设置 loading 为 false
    }
  }

  // 新建角色
  const addRoles = async () => {
    const res = await reqAddRoles(roleName)
    const {status, data} = res.data
    if(status === 0){                    //  如果新建角色成功
      setRoleList([...roleList, data])   //  在角色列表末尾追加一个新的角色对象
      message.success('创建角色成功!')
    }
  }

  // 设置角色权限
  const updateRole = async ()=>{
    const res = await reqUpdateRole(role)
    const {status} = res.data
    if(status === 0){
      if(role._id === memoryUtils.user.role_id){    //  如果当前设置的是当前登录用户所属角色的权限，退出登录
        // 1.删除保存的数据
        storageUtils.removeMenu();
        storageUtils.removePath();
        storageUtils.removeWeather();
        storageUtils.removeUser();
        memoryUtils.user = {};
        // 2.跳转到登录页面
        navigate('/login', {replace:true});
        message.info('当前登录的用户权限已更新, 请重新登陆!')
      }else{
        getRoles()      //  修改权限成功后重载列表
        message.success('更新权限成功!')
      }
    }
  }

  // 输入框内容改变时的回调
  const inputChange = (e) => {
    setRoleName(e.target.value)   //  保存输入的角色名称
  }
  // 确认添加角色
  const handleOk = () => {
    // 表单验证
    if(!roleName || roleName === ''){   //  如果新建角色时未输入或输入为空(roleName==='')
      setIsModalVisible(true);          //  不关闭 Modal
      return                            //  并且不执行后续操作(发送请求)
    }else{
      let num = roleName.indexOf(" ");
      if(num !== -1){                   //  如果输入包含空格
        setIsModalVisible(true);        //  不关闭 Modal
        return                          //  并且不执行后续操作
      }
    }
    addRoles() 
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 确认设置角色权限
  const handleOkAuth = () => {
    const newMenus = AuthRef.current.getCheckedKeys
    role.menus = newMenus             //  覆盖角色原有的权限
    role.auth_time = Date.now()       //  指定授权时间
    role.auth_name = memoryUtils.user.username
    setRole({...role})                //  更新角色对象
    updateRole()
    setIsModalAuth(false);
  };
  const handleCancelAuth = () => {
    setIsModalAuth(false);
  };

  // 监听选中项发生改变时的回调
  const onSelectChange = (selectedRowKeys, roleArr) => {
    setDisabled(false)                  //  设置权限按钮可用状态
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    // console.log('selectedRows changed: ', roleArr);
    setSelectedRowKeys( selectedRowKeys );            //  设置指定的选中项 key 数组
    setRole(roleArr[0]);                              //  设置指定选中项 对象
  };

  // 配置表格行的可选择 属性
  const rowSelection = {
    type: 'radio',                      //  设置选择类型为单选
    selectedRowKeys,                    //  指定选中项的 key 数组
    onChange: onSelectChange,           //  选中项发生改变时的回调
  };

  // 设置表格的行属性
  const onRow = roleObj => {
    return {
      onClick: event => {   //  单击行时的回调
        onSelectChange([roleObj._id], [roleObj]);   //  单击时调用选中项发生改变的监听回调
      },
    };
  };

  // 发送请求获取角色列表
  useEffect(()=>{
    getRoles()
  },[])

  
  return (
    <Card title={title}>
      <Table 
        rowKey='_id'
        rowSelection={rowSelection}
        onRow={onRow}
        columns={columns}
        dataSource={roleList} 
        loading={loading}
      />
      <Modal 
        title="创建角色" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        destroyOnClose={true}
        okText="确认"
        cancelText="取消"
      >
        <Form>
          <Form.Item 
            label="角色名称"
            name="role"
            rules={[
              {
                required: true,
                message: '请输入角色名称',
              },
              {
                pattern: /^[^\s]*$/,
                message:'不能包含空格',
              }
            ]}
          >
            <Input placeholder='新建角色' onChange={inputChange}/>
          </Form.Item>
        </Form>
      </Modal>
      <Modal 
        title="设置角色权限" 
        visible={isModalAuth} 
        onOk={handleOkAuth} 
        onCancel={handleCancelAuth} 
        destroyOnClose={true}
        okText="确认"
        cancelText="取消"
      >
        <UpdateRole role={role} onRef={AuthRef}/>
      </Modal>
    </Card>
  )
}
