import React,{ useState } from 'react';
import { ModalContext } from '..';
import memoryUtils from '../../../utils/memoryUtils';
import { Form, Input, Select } from 'antd';
const {Option} = Select;


const CustomizedForm = (props) => {
  const { onChange, fields } = props;

  const {Consumer} = ModalContext;
  const [form] = Form.useForm();
  // 把当前表单中的 form 保存到内存中
  memoryUtils.form = form.getFieldsValue();


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
          fields={fields}
          onFieldsChange={(_, allFields) => {
            onChange(allFields);
          }}
        >
          
          <Form.Item 
            name='belong' 
            label="所属分类" 
            style={{display: show}}
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
        </Form>)
        }
      }
    </Consumer>
  )
};

export const Model = () => {
  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: '',
    },
  ]);
  return (
    <>
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
    </>
  );
};
