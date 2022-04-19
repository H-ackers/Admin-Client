import React,{ useState } from 'react';
import { Form, Input, Select } from 'antd';
const {Option} = Select;


export default  function Model() {
  const [form] = Form.useForm();

  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: '',
    },
  ]);
  return (
    <>
      <Form
          name='add and update category'
          form={form}
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
            console.log(form.getFieldsValue());
          }}
        >
          
          <Form.Item 
            name='belong' 
            label="所属分类" 
          >
            <Select name='select'>
              <Option value='0'>一级分类1</Option>
              <Option value='1'>一级分类2</Option>
              <Option value='2'>一级分类3</Option>
              <Option value='3'>一级分类4</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='title'
            label="分类名称" 
            rules={[
              {
                required: true,
                message: '分类名称不能为空!',
              },
              {
                pattern: /^[^\s]*$/,
                message:'不能包含空格',
              }
            ]}
          >
            <Input placeholder='请输入分类名称'/>
          </Form.Item>
        </Form>
    </>
  );
};
