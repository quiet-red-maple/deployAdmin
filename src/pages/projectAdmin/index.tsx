import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { history } from 'umi';

interface Props {

}

const ProjectAdmin: React.FC = (props: Props) => {

  const gotoDetail = () => {
    history.push(`${history.location.pathname}/detail`)
  }

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
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '项目访问地址',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
    },
    {
      title: '项目部署地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center'
    },
    {
      title: '项目服务地址',
      dataIndex: 'password',
      key: 'password',
      align: 'center'
    },
    {
      title: '项目用户密码',
      dataIndex: 'password2',
      key: 'password2',
      align: 'center'
    },
    {
      title: '源码仓库地址',
      dataIndex: 'yuanm',
      key: 'yuama',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      render: () => {
        return <a onClick={gotoDetail}>查看详情</a>
      }
    },
  ];


  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default ProjectAdmin