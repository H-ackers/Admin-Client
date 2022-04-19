import React,{ useState, useImperativeHandle } from 'react';
import { Form, Input, Select } from 'antd';
const {Option} = Select;


export default function UserForm(props) {
  const {user, roleList} = props;
  const {username, phone, email, role_id} = user;

  const [form] = Form.useForm();
  // 存储捕获的输入信息状态等
  const [fields, setFields] = useState([]);

  // 初始化 form 为空对象
  const [formValues, setFormValues] = useState({});

  // 用于暴露外部ref能访问的属性
  useImperativeHandle(props.onRef, ()=>{
    return {
      fields: fields,
      formValues: formValues,
    };
  });


  return (
    <Form
      name='user info'
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 17,
      }}
      initialValues={{
        username: username,
        phone: phone,
        email: email,
        role_id: role_id,
      }}
      form={form}
      fields={fields}
      onFieldsChange={(_, allFields) => {
        setFields(allFields);       //  捕获输入信息状态等
        setFormValues(form.getFieldsValue())
      }}
    >
      <Form.Item 
        name='username' 
        label="用户名" 
        rules={[
          {
            required: true,
            message: '用户名不能为空!',
          },
          // {
          //   pattern: /^[^\s]*$/,
          //   message:'不能包含空格',
          // },
          {
            pattern: /^[A-Za-z][A-Za-z0-9]{4,15}$/,
            message: '用户名须以字母开头,5-16位字母或数字组成,不含有空格!',
          }
        ]}
      >
        <Input placeholder='请输入用户名'/>
      </Form.Item>
      {
        user._id ? null : <Form.Item
          name='password'
          label="密码" 
          rules={[
            {
              required: true,
              message: '密码不能为空!',
            },
            {
              pattern: /^[A-Za-z0-9]{5,12}$/,
              message: '密码须以5-12位字母或数字组成,不含有空格',
            },
          ]}
        >
          <Input type='password' placeholder='请输入密码'/>
        </Form.Item>
      }
      <Form.Item 
        name='phone' 
        label="手机号" 
        rules={[
          {
            required: false,
            message: '手机号不能为空!',
          },
          {
            pattern: /^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}$/,
            message: '请输入正确格式的手机号',
          }
        ]}
      >
        <Input type='tel' placeholder='请输入手机号'/>
      </Form.Item>
      <Form.Item
        name='email'
        label="邮箱" 
        rules={[
          {
            required: false,
            message: '邮箱不能为空!',
          },
          {
            pattern: /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/,
            message: '电子邮箱格式不正确'
          }
        ]}
      >
        <Input type='email' placeholder='请输入邮箱' />
      </Form.Item>
      <Form.Item 
        name='role_id' 
        label="角色" 
      >
        <Select name='select'  placeholder="请选择角色">
          {
            roleList.map(r=>{
              const {_id, name} = r;
              return <Option key={_id} value={_id}>{name}</Option>
            })
          }
        </Select>
      </Form.Item>
    </Form>
  )
};