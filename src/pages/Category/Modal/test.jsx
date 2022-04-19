import React from 'react';
import { Form,Select,Input } from 'antd';
import { ModalContext } from '..';
const {Option} = Select;


// 添加商品分类的 Form 组件
export default function AddForm() {
  const {Consumer} = ModalContext;
  const [form] = Form.useForm();
  console.log(form.getFieldsValue());

  return (
    <Consumer>
      {
        value => {
        const {categoryList, show, parentId, memoryUtils} = value
        const {name} = memoryUtils.category

        return (
        <Form
          name='add and update category'
          form={form}
          initialValues={{belong:parentId, title:name}}
        >
          
          <Form.Item 
            name='belong' 
            label="所属分类" 
            style={{display: show}}
            shouldUpdate
          >
            <Select name='select'>
              <Option value='0'>一级分类</Option>
              {
                categoryList.map(cItem => {
                  const {_id, name} = cItem
                  return <Option key={_id} value={_id}>{name}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            name='title'
            label="分类名称" 
            
            style={{display: 'block'}}
            rules={[
              {
                required: true,
                message: 'Username is required!',
              },
            ]}
          >
            <Input placeholder='请输入分类名称'/>
          </Form.Item>
        </Form>)
        }
      }
    </Consumer>
  )
}
