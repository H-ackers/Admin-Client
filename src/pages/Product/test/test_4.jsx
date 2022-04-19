import React from 'react';
import { Table, Button } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    menus: [],
    _id: "62531382ebb5ca1bd4a28b25",
    name: "客服01",
    create_time: 1649611650221,
    __v: 0
  },
  {
    menus: [],
    _id: "625405d8e4cb2b4f28806c8d",
    name: "test01",
    create_time: 1649673688754,
    __v: 0
  }
];


export default class App extends React.Component {
  state = { selectedRowKeys: [], role: {} };


  onSelectChange = (selectedRowKeys, roleObj) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    console.log('roleObj changed: ', roleObj)
    this.setState({ 
      selectedRowKeys,
      role: roleObj
    })
  }
  

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const onRow = roleObj => {
    return {
      onClick: event => {
        this.onSelectChange([roleObj._id],roleObj);
      },
    };
  };
    return (
      <div>
        <Table 
          rowKey='_id'
          rowSelection={rowSelection} 
          onRow={onRow}
          columns={columns} 
          dataSource={data} 
        />
      </div>
    );
  }
}