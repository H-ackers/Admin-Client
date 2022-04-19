import React, { useState, useImperativeHandle } from 'react';
import { Form, Input, Tree } from 'antd';
import menuList from '../../../config/menuConfig';

// 根据 菜单列表生成 权限树列表
const menu = menuList.map(m=>{
  return({
    title: m.title,       //  树型结构的标题
    key: m.path,          //  树型结构的必要属性 key
    children: (m.children ? m.children.map(c=>{   //  树型结构的子结构
      return ({
        title: c.title,
        key: c.path
      });
    }) : null)
  });
});

export default function UpdateRole(props) {
  const {role} = props;

  // 用于暴露外部ref能访问的属性
  useImperativeHandle(props.onRef, ()=>{
    return {
      getCheckedKeys: checkedKeys,
    };
  });
  

  const treeData = [      //  树型结构的根节点
    {
      title: '平台权限',
      key: '0-0',
      children: menu
    },
  ];

  const [checkedKeys, setCheckedKeys] = useState(role.menus);
  const [selectedKeys, setSelectedKeys] = useState([]);


  // 点击复选框时触发的回调
  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  // 点击树节点触发的回调
  const onSelect = (selectedKeysValue, info) => {
    // console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Form.Item 
      label='角色名称'
    >
      <Input value={role.name} disabled />
      <Tree
        style={{marginTop:20}}
        defaultExpandAll={true}
        checkable
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    </Form.Item>
  )
}
