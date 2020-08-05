import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface Props {

}

const ServerAdmin: React.FC = (props: Props) => {

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns: ColumnsType<any> = [
    {
      title: '服务器名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '服务器地址',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
    },
    {
      title: '服务器账号',
      dataIndex: 'address',
      key: 'address',
      align: 'center'
    },
    {
      title: '服务器密码',
      dataIndex: 'password',
      key: 'password',
      align: 'center'
    },
  ];

  
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default ServerAdmin