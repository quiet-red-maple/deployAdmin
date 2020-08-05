import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Statistic, Input, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from '../style.css';

const { Search } = Input;

interface Props {
  dispatch: any;
  dataCenter: any;
  match: any;
  history: any;
  location: any;
}

const Detail = (props: Props) => {
  const { dispatch, dataCenter } = props;
  const { projectClientList, projectDetailStatistics } = props.dataCenter;
  const [searchValue, setSearchValue] = useState({});

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center'
    },
    {
      title: '经销商哈希编码',
      dataIndex: 'customerCode',
      key: 'customerCode',
      align: 'center'
    },
    // {
    //   title: '资金方',
    //   dataIndex: 'fundName',
    //   key: 'fundName',
    //   align: 'center'
    // },
    // {
    //   title: '产品',
    //   dataIndex: 'projectName',
    //   key: 'projectName',
    //   align: 'center'
    // },
    {
      title: '经销商名称',
      dataIndex: 'distributorName',
      key: 'distributorName',
      align: 'center'
    },
    {
      title: '授信结果',
      dataIndex: 'creditResult',
      key: 'creditResult',
      align: 'center'
    },
    {
      title: '核额日期',
      dataIndex: 'verifiedDate',
      key: 'verifiedDate',
      align: 'center'
    },
    {
      title: '获授信额度',
      dataIndex: 'creditAmount',
      key: 'creditAmount',
      sorter: true,
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    // {
    //   title: '授信起始时间',
    //   dataIndex: 'creditStartDate',
    //   key: 'creditStartDate',
    //   align: 'center'
    // },
    {
      title: '额度状态',
      dataIndex: 'creditAmountStatus',
      key: 'creditAmountStatus',
      align: 'center'
    },
    {
      title: '贷款余额',
      dataIndex: 'loanBalance',
      key: 'loanBalance',
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '逾期金额',
      dataIndex: 'pastDue',
      key: 'pastDue',
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
        return <a onClick={() => gotoFunDataCustomerDetail(record)}>查看详情</a>
      }
    },
  ];

  const gotoFunDataCustomerDetail = (record: any) => {
    const oldUrl = props.match.url;
    props.history.push(`${oldUrl}/customerDetail=${record.id}`)
  }

  const sendRequest = (value: any, type: string) => {
    dispatch({
      type: type,
      payload: value,
    });
  };

  useEffect(() => {
    const params = {
      projectId: newId,
    };
    sendRequest(params, 'dataCenter/getProjectDetailStatistics')
  }, [])

  const newId = props.match.params.detail.split('=')[1];
  useEffect(() => {
    const params = {
      ...searchValue,
      projectId: newId,
    };
    sendRequest(params, 'dataCenter/getProjectClientList')
  }, [searchValue])

  const onSearch = (value: any) => {
    if (!value) {
      setSearchValue({
        distributorName: undefined,
        customerCode: undefined
      })
      return
    }
      setSearchValue({
        distributorName: value,
        customerCode: value
      })
  }

  const onChange = (pageNumber: number) => {
    const params = {
      ...searchValue,
      projectId: newId,
      pageNum: pageNumber,
      pageSize: 10,
    };
    sendRequest(params, 'dataCenter/getProjectClientList')
  };

  const onSorterTable = (pagination: any, filters: any, sorter: any) => {
    const params = {
      ...searchValue,
      pageNum: pagination.current,
      projectId: newId,
      pageSize: 10,
      sidx: sorter.order ? "credit_amount" : undefined,
      order: sorter.order
    };
    sendRequest(params, 'dataCenter/getProjectClientList');
  }

  const data = projectClientList.list.map((item: any, index: number) => ({
    ...item, 
    key: index + 1
  }))

  const total = projectClientList.total;

  const pageNum = projectClientList.pageNum;

  const {
    clientNum, creditUserNum, lendingUserNum, creditSum, lendingSum, loanBalanceNum
  } = projectDetailStatistics;

  const title = props.location.state.record.projectName;
  const titleCode = props.location.state.record.currentCode;

  return (
    <div>
<h1 style={{ fontSize: 25 }}>{title}（{titleCode}）</h1>
      <Card
        title="资产数据"
        bordered={false}
        className={styles.asset_data_card}
      >
        <Row gutter={16} className={styles.row_div}>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="申请用户数（个）" value={clientNum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="已授信用户数（个）" value={creditUserNum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="累计放款用户数（个）" value={lendingUserNum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="已授信额度（元）" value={creditSum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="累计放款总额（元）" value={lendingSum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="在贷余额（元）" value={loanBalanceNum} />
          </Col>
        </Row>
      </Card>
      <Card
        title="客户列表"
        bordered={false}
        className={styles.asset_data_card}
        extra={
          <Search
            placeholder="查找经销商编码/经销商公司全称"
            enterButton="搜索"
            size="large"
            onSearch={onSearch}
          />
        }
      >
        <Table
          dataSource={data}
          columns={columns}
          scroll={{ x: '150%' }}
          bordered
          onChange={onSorterTable}
          pagination={{
            showQuickJumper: true,
            current: pageNum,
            total: total,
            // onChange: onChange,
            showTotal: () => `总计${total} 条`
          }}
        />
      </Card>
    </div>
  )
}

export default connect(({ dataCenter }: any) => ({ dataCenter }))(Detail)