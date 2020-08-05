import React, { useEffect, useState } from 'react';
import { Card, Input, Table, Statistic } from 'antd';
import { ColumnProps } from 'antd/es/table';

const { Search } = Input;

interface Props {
  style: any;
  history: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
}

const Card4 = (props: Props) => {
  const styles = props.style;
  const { assetList } = props.dataCenter;
  const [searchValue, setSearchValue] = useState({});

  useEffect(() => {
    const data = {
      ...searchValue
    }
    props.sendRequest(data, 'dataCenter/getAssetList')
  }, [searchValue])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    },
    {
      title: '资产方哈希编码',
      dataIndex: 'clientCode',
      key: 'clientCode',
      align: 'center',
    },
    {
      title: '资产方客户名称',
      dataIndex: 'clientName',
      key: 'clientName',
      align: 'center',
    },
    {
      title: '经销商数量（个）',
      dataIndex: 'fundNum2',
      key: 'fundNum2',
      align: 'center',
    },
    {
      title: '已获得授信用户数（个）',
      dataIndex: 'creditUserNum',
      key: 'creditUserNum',
      align: 'center',
      render: (record) => {
        return <Statistic value={record} className={styles.statistic_money}/>
      }
    },
    {
      title: '已获得放款用户数（个）',
      dataIndex: 'lendingUserNum',
      key: 'lendingUserNum',
      align: 'center',
      render: (record) => {
        return <Statistic value={record} className={styles.statistic_money}/>
      }
    },
    {
      title: '已获得授信总额（元）',
      dataIndex: 'creditSum',
      key: 'creditSum',
      align: 'center',
      render: (record) => {
        return <Statistic value={record} className={styles.statistic_money}/>
      }
    },
    {
      title: '已获得放款总额（元）',
      dataIndex: 'lendingSum',
      key: 'lendingSum',
      align: 'center',
      render: (record) => {
        return <Statistic value={record} className={styles.statistic_money}/>
      }
    },
    {
      title: '已对接资金方数量（个）',
      dataIndex: 'fundNum',
      key: 'fundNum',
      align: 'center',
      render: (record) => {
        return <Statistic value={record} className={styles.statistic_money}/>
      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'operate',
      align: 'center',
      render: record => {
        return <a onClick={() => gotoDetail(record)}>查看详情</a>;
      },
    },
  ];

  const gotoDetail = (record: any) => {
    props.history.push({
      pathname: `/dataCenter/assetData/detail=${record.assetId}`,
      state: {
        record
      }
    })
  }

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

  const onChange = (pageNumber: number) => {
    const params = {
      ...searchValue,
      pageNum: pageNumber,
      pageSize: 10,
    };
    props.sendRequest(params, 'dataCenter/getAssetList')
  };

  const data = assetList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1
  }))

  const total = assetList.total;

  const pageNum = assetList.pageNum;

  return (
    <Card
      title="资产方列表"
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
      dataSource={[
        {}
      ]} 
      columns={columns} 
      bordered 
      scroll={{x: 1500}}
      pagination={{
        showQuickJumper: true,
        current: pageNum,
        total: total,
        onChange: onChange,
        showTotal: () => `总计${total} 条`
      }}
      />
    </Card>
  );
};

export default Card4;
