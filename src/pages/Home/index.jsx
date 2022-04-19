import React from 'react';

// // 首页路由
// export default function Home() {
//   return (
//     <div>Home1</div>
//   )
// }
import { Card,Table } from 'antd';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  {
    title: '操作',
    dataIndex: '',
    render: () => <a>Delete</a>,
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
  },
  {
    key: 2,
    name: 'Jim Green',
  },
  {
    key: 3,
    name: 'Not Expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
  },
];

export default function Home() {
    return (
      <Card>
        <Table
          columns={columns}
          dataSource={data}
        />
    </Card>
    )
  }