import React from 'react';
import { Card, Table, Input } from 'antd';
import { ColumnProps } from 'antd/es/table';
const { Search } = Input;

interface Props {
  style: any;
}

const Card7 = (props: Props) => {
  const styles = props.style;

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center'
    },
    {
      title: '资产编号',
      dataIndex: 'age',
      key: 'age',
      align: 'center'
    },
    {
      title: '资产包名称',
      dataIndex: 'address',
      key: 'address',
      align: 'center'
    },
    {
      title: '资产笔数',
      dataIndex: 'address',
      key: 'address1',
      align: 'center'
    },
    {
      title: '总规模（万元）',
      dataIndex: 'address',
      key: 'address2',
      align: 'center'
    },
    {
      title: '剩余规模（万元）',
      dataIndex: 'address',
      key: 'address3',
      align: 'center'
    },
    {
      title: '资产方名称（元）',
      dataIndex: 'address',
      key: 'address4',
      align: 'center'
    },
    {
      title: '资金方名称（元）',
      dataIndex: 'address',
      key: 'address5',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'operate',
      align: 'center',
      render: (record) => {
        return <a>查看详情</a>
      }
    },
  ];
 
  return (
    <Card
    title="项目列表"
    bordered={false}
    className={styles.asset_data_card}
    extra={
      <Search
        placeholder="查找资产方编码/名称"
        enterButton="搜索"
        size="large"
        onSearch={value => console.log(value)}
      />
    }
  >
    <Table
      dataSource={[]}
      columns={columns}
      scroll={{ x: '150%' }}
      bordered
    />
  </Card>
  )
}

export default Card7