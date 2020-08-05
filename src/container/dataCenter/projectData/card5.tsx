import React, { useState, useEffect } from 'react';
import { Card, Table, Input, Statistic } from 'antd';
import { ColumnProps } from 'antd/es/table';
const { Search } = Input;

interface Props {
  style: any;
  dataCenter: any;
  history: any;
  sendRequest: (data: any, type: string) => any;
}

const Card7 = (props: Props) => {
  const styles = props.style;
  const [searchValue, setSearchValue] = useState({});
  const { projectList } = props.dataCenter;

  useEffect(() => {
    const params = {
      ...searchValue
    }
    props.sendRequest(params, 'dataCenter/getProjectList')
  }, [searchValue])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center'
    },
    {
      title: '项目哈希编码',
      dataIndex: 'currentCode',
      key: 'currentCode',
      align: 'center'
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      align: 'center'
    },
    {
      title: '总授信用户数（个）',
      dataIndex: 'creditUserNum',
      key: 'creditUserNum',
      align: 'center'
    },
    {
      title: '总放款用户数（个）',
      dataIndex: 'lendingUserNum',
      key: 'lendingUserNum',
      align: 'center'
    },
    {
      title: '已授信金额（元）',
      dataIndex: 'creditSum',
      key: 'creditSum',
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '已放款总额（元）',
      dataIndex: 'lendingSum',
      key: 'lendingSum',
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '在贷余额（元）',
      dataIndex: 'loanBalanceNum',
      key: 'loanBalanceNum',
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'operate',
      align: 'center',
      render: (record) => {
        return <a onClick={() => gotoDetail(record)}>查看详情</a>
      }
    },
  ];

  const gotoDetail = (record: any) => {
    props.history.push({
      pathname: `/dataCenter/projectData/detail=${record.id}`,
      state: {
        record
      }
    })
  }

  const onSearch = (value: any) => {
    if (!value) {
      setSearchValue({
        assetName: undefined,
        currentCode: undefined
      })
      return
    }
      setSearchValue({
        assetName: value,
        currentCode: value
      })
  }

  const onChange = (pageNumber: number) => {
    const params = {
      ...searchValue,
      pageNum: pageNumber,
      pageSize: 10,
    };
    props.sendRequest(params, 'dataCenter/getProjectList')
  };

  const data = projectList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1
  }))

  const total = projectList.total;

  const pageNum = projectList.pageNum;

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
        onSearch={onSearch}
      />
    }
  >
    <Table
      // dataSource={data}
      dataSource={[{}]}
      columns={columns}
      scroll={{ x: '150%' }}
      bordered
      pagination={{
        showQuickJumper: true,
        current: pageNum,
        total: total,
        onChange: onChange,
        showTotal: () => `总计${total} 条`
      }}
    />
  </Card>
  )
}

export default Card7