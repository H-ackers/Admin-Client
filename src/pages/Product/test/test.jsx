import React,{useState, useEffect} from 'react';
import { Table } from 'antd';
import qs from 'qs';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const getRandomuserParams = params => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

export class Test extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination) => {
    this.fetch({
      pagination,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
          data: data.results,
          pagination: {
            ...params.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        columns={columns}
        rowKey={record => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
