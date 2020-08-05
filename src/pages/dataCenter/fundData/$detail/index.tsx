import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Statistic, Select, Radio, Progress, Table, Input } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styles from '../style.css';
import SearchForm from '@/container/dataCenter/fundData/SearchForm';

interface Props {
  dispatch: any;
  dataCenter: any;
  index: any;
  history: any;
  match: any;
}

const FunData = (props: Props) => {

  const { dispatch, dataCenter, index } = props;
  const { fundDetailStatistics, fundDetailClientList } = dataCenter;
  const [searchValue, setSearchValue] = useState({})

  const sendRequest = (value: any, type: string) => {
    dispatch({
      type: type,
      payload: value,
    });
  };
  const {
    assetNum,
    creditSum,
    creditUserNum,
    fundNum,
    lendingSum,
    lendingUserNum,
    overdueNum
  } = fundDetailStatistics;

  useEffect(() => {
    const newId = props.match.params.detail.split('=')[1];
    const params = {
      fundId: newId
    };
    sendRequest(params, 'dataCenter/getFundDetailStatistics');
    sendRequest({}, 'index/getProjectAll');
  }, []);
  useEffect(() => {
    const newId = props.match.params.detail.split('=')[1];
    const params = {
      ...searchValue,
      fundId: newId
    };
    sendRequest(params, 'dataCenter/getFundDetailClientList');
  }, [searchValue]);
  
  const newId = props.match.params.detail.split('=')[1];
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
      align: 'center',
    },
    {
      title: '资产方',
      dataIndex: 'fundId',
      key: 'fundId',
      align: 'center',
    },
    {
      title: '所属项目',
      dataIndex: 'fundName',
      key: 'fundName',
      align: 'center'
    },
    {
      title: '经销商编码',
      dataIndex: 'projectType',
      key: 'projectType',
      align: 'center'
    },
    {
      title: '经销商公司全称',
      dataIndex: 'distributorName',
      key: 'distributorName',
      align: 'center'
    },
    {
      title: '区域',
      dataIndex: 'distributorName2',
      key: 'distributorName2',
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
      title: '授信额度',
      dataIndex: 'creditAmount',
      key: 'creditAmount',
      sorter: true,
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '授信起始时间',
      dataIndex: 'creditStartDate',
      key: 'creditStartDate',
      align: 'center'
    },
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

  // const onChange = (pageNumber: number) => {
  //   const newId = props.match.params.detail.split('=')[1];
  //   const params = {
  //     ...searchValue,
  //     pageNum: pageNumber,
  //     fundId: newId,
  //     pageSize: 10,
  //   };
  //   sendRequest(params, 'dataCenter/getFundDetailClientList');
  // };

  const onSorterTable = (pagination: any, filters: any, sorter: any) => {
    const params = {
      ...searchValue,
      pageNum: pagination.current,
      fundId: newId,
      pageSize: 10,
      sidx: sorter.order ? "credit_amount" : undefined,
      order: sorter.order
    };
    sendRequest(params, 'dataCenter/getFundDetailClientList');
  }

  const data = fundDetailClientList.list.map((item: any, index: number) => ({
    ...item, 
    key: index + 1
  }))

  const total = fundDetailClientList.total;

  const pageNum = fundDetailClientList.pageNum;

  return (
    <div>
      <Card
        title="资金数据"
        bordered={false}
        className={styles.asset_data_card}
      >
        <Row gutter={16} className={styles.row_div}>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="对接资产方总数（个）" value={assetNum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="申请用户数（个）" value={fundNum} />
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
            <Statistic title="在贷余额（元）" value={overdueNum} />
          </Col>

        </Row>
      </Card>
      <Card
        title="资产客户列表"
        bordered={false}
        className={styles.asset_data_card}
        // extra={
        //   <Search
        //     placeholder="查找资产方编码/名称"
        //     enterButton="搜索"
        //     size="large"
        //     onSearch={value => console.log(value)}
        //   />
        // }
      >
        <SearchForm style={styles} setSearchValue={setSearchValue} index={index}/>
        <div style={{paddingTop: 20}}>
        <Table
          // dataSource={data}
          dataSource={[{}]}
          columns={columns}
          scroll={{x:'150%'}}
          bordered
          onChange={onSorterTable}
          pagination={{
            showQuickJumper: true,
            total: total,
            // onChange: onChange,
            current: pageNum,
            showTotal: () => `总计${total} 条`
          }}
        />
        </div>
      </Card>
    </div>
  )
}

export default connect(({ dataCenter, index }: any) => ({ dataCenter, index }))(FunData)