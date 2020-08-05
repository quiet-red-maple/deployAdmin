import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Statistic, Select, Radio, Progress, Table, Input } from 'antd';
import { Echarts } from '@/components';
import echartsOption from '@/config/echartsOption';
import { ColumnProps } from 'antd/es/table';
import styles from './style.css';
// import SearchForm from '@/container/dataCenter/fundData/SearchForm';

const { Option } = Select;
const { Search } = Input;

interface Props {
  dispatch: any;
  dataCenter: any;
  history: any;
}

const FunData = (props: Props) => {
  const [time1, setTime1] = useState('0');
  const [time2, setTime2] = useState('0');
  const [searchValue, setSearchValue] = useState({});
  const { dispatch, dataCenter } = props;
  const { circular, bar } = echartsOption;
  const { fundStatistics, fundList, fundCharLending } = dataCenter;
  const {
    todayCreditSum,
    todayCreditUserNum,
    todayLendingSum,
    todayLendingUserNum,
  } = fundStatistics;

  const sendRequest = (value: any, type: string) => {
    dispatch({
      type: type,
      payload: value,
    });
  };

  useEffect(() => {
    const params = {};
    sendRequest(params, 'dataCenter/getFundStatistics');
    sendRequest(params, 'dataCenter/getFundCharLending');
  }, []);

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    },
    {
      title: '资金方哈希编码',
      dataIndex: 'clientCode',
      key: 'clientCode',
      align: 'center',
    },
    {
      title: '资金方名称',
      dataIndex: 'clientName',
      key: 'clientName',
      align: 'center',
    },
    {
      title: '累计服务用户数（个）',
      dataIndex: 'creditUserNum',
      key: 'creditUserNum',
      align: 'center',
    },
    {
      title: '已授信总额',
      dataIndex: 'creditSum',
      key: 'creditSum',
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '已放款总额',
      dataIndex: 'lendingSum',
      key: 'lendingSum',
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '在贷余额（元）',
      dataIndex: 'lendingSum',
      key: 'lendingSum2',
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '已对接资产方数量（个）',
      dataIndex: 'fundNum',
      key: 'fundNum',
      align: 'center',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '项目数量（个）',
      dataIndex: 'fundNum',
      key: 'fundNum2',
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
      render: record => {
        return <a onClick={() => gotoFunDataDetail(record)}>查看详情</a>;
      },
    },
  ];

  const gotoFunDataDetail = (record: any) => {
    props.history.push(`/dataCenter/fundData/detail=${record.assetId}`)
  }

  const onChange1 = (e: any) => {
    setTime1(e.target.value)
  };

  const onChange2 = (e: any) => {
    setTime2(e.target.value)
  };

  const onChange = (pageNumber: number) => {
    const params = {
      ...searchValue,
      pageNum: pageNumber,
      pageSize: 10,
    };
    sendRequest(params, 'dataCenter/getFundList')
  };

  useEffect(() => {
    const params = {
      ...searchValue,
    };
    sendRequest(params, 'dataCenter/getFundList')
  }, [searchValue])

  const onSearch = (value: any) => {
    if (!value) {
      setSearchValue({
        clientName: undefined,
        clientCode: undefined
      })
      return
    }
      setSearchValue({
        clientName: value,
        clientCode: value
      })
  }

  const data = fundList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1,
  }));

  const charLendingData = fundCharLending[time1] ? fundCharLending[time1] : {};
  const charLendingData2 = fundCharLending[time2] ? fundCharLending[time2] : {};

  const total = fundList.total;

  const pageNum = fundList.pageNum;

  return (
    <div>
      <Card title="资金数据" bordered={false} className={styles.asset_data_card}>
        <Row gutter={16} className={styles.row_div}>
          <Col span={6}>
            <Statistic title="本月获得授信用户数（个）" value={todayCreditUserNum} />
          </Col>

          <Col span={6}>
            <Statistic title="本月获得放款用户数（个）" value={todayLendingUserNum} />
          </Col>

          <Col span={6}>
            <Statistic title="本月获得授信总额（元）" value={todayCreditSum} />
          </Col>

          <Col span={6}>
            <Statistic title="本月获得放款总额（元）" value={todayLendingSum} />
          </Col>
        </Row>
      </Card>

      <Row gutter={24}>
        <Col xxl={12} xl={12} xs={12}>
          <Card
            title="各资金方放款总额"
            bordered={false}
            className={styles.asset_data_card}
            // extra={extraDom1()}
            bodyStyle={{
              height: 400,
            }}
          >
            <Radio.Group
              onChange={onChange1}
              defaultValue="0"
              size="small"
              style={{ paddingTop: 8 }}
            >
              <Radio.Button value="0">最近一年</Radio.Button>
              <Radio.Button value="1">最近30天</Radio.Button>
              <Radio.Button value="2">最近一周</Radio.Button>
            </Radio.Group>
            <Echarts option={circular(charLendingData, '放款总额')} height={300} />
          </Card>
        </Col>

        <Col xxl={12} xl={12} xs={12}>
          <Card
            title="各资金方放款总额"
            bordered={false}
            className={styles.asset_data_card}
            // extra={extraDom1()}
            bodyStyle={{
              height: 400,
            }}
          >
            <Radio.Group
              onChange={onChange2}
              defaultValue="0"
              size="small"
              style={{ paddingTop: 8 }}
            >
              <Radio.Button value="0">最近一年</Radio.Button>
              <Radio.Button value="1">最近30天</Radio.Button>
              <Radio.Button value="2">最近一周</Radio.Button>
            </Radio.Group>
            <Echarts option={bar(charLendingData2)} height={300} />
          </Card>
        </Col>
      </Row>
      <Card
        title="资金客户列表"
        bordered={false}
        className={styles.asset_data_card}
        extra={
          <Search
            placeholder="查找资金方编码/名称"
            enterButton="搜索"
            size="large"
            onSearch={onSearch}
          />
        }
      >
        <div style={{ paddingTop: 20 }}>
          <Table 
          // dataSource={data} 
          dataSource={[{key: 1}]} 
          columns={columns} 
          scroll={{x: '150%'}}
          bordered 
          pagination={{
            showQuickJumper: true,
            total: total,
            onChange: onChange,
            current: pageNum,
            showTotal: () => `总计${total} 条`
          }}
          />
        </div>
      </Card>
    </div>
  );
};

export default connect(({ dataCenter }: any) => ({ dataCenter }))(FunData);
