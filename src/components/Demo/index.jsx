import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
const Item = Form.Item

export default function Demo() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const {username, password} = values;   //  获取输入的用户名和密码
    const response = reqLogin(username, password);

    // 使用 then() 方法获取响应内容
    response.then(value => {
      console.log(value);
    const {response} = value.request;
    const resp = JSON.parse(response);
    const {status,data} = resp;
      if(status === 0){
        // 保存 user
        memoryUtils.user = data;
        storageUtils.saveUser(data);
        message.success('欢迎回来~!');
        navigate('/admin/home?title=首页',{replace: true});
      }
    });
  }

    return ( 
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          username: 'admin1'
        }}
        onFinish={onFinish}
      >
        <Item
          name="username"
          
          rules={[  //  声明式验证：直接使用定义好的验证规则进行验证
            {
              required: true,
              message: '请输入您的用户名!',
            },
            {
              min: 6,
              max: 12,
              message: '用户名最少6位,不得超过12位!',
            },
            {
              pattern: /^[a-zA-Z][0-9a-zA-Z_]+$/,
              message:'用户名必须以字母开头包含数字、字母或下划线组成',
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入您的密码!',
            },
            {
              min: 6,
              max: 12,
              message: '密码至少6位,不大于12位!',
            },
            {
              pattern: /^[a-zA-Z0-9]+[0-9a-zA-Z_]+$/,
              message:'密码必须以字母或数字开头包含字母、数字或下划线组成',
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Item>
        <Item className='rememberme'>
          <Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Item>

        </Item>

        <Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          
        </Item>
      </Form>
    )
  }

/*
  1.前台表单验证
  2.收集表单输入数据
*/ 
