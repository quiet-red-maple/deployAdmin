import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import SearchForm from './SearchForm';

interface Props {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
  match: any;
  history: any;
}

const Card7 = (props: Props) => {
  const styles = props.style;
  const { corpbasicList } = props.dataCenter;
  const [searchValue, setSearchValue] = useState({});

  useEffect(() => {
    const newId = props.match.params.detail.split('=')[1];
    const params = {
      id: newId,
      ...searchValue
    }
    props.sendRequest(params, 'dataCenter/getCorpbasicList')
  }, [searchValue])


  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center'
    },
    {
      title: '经销商哈希编码',
      dataIndex: 'customerCode2',
      key: 'customerCode2',
      align: 'center',
    },
    {
      title: '经销商编码',
      dataIndex: 'customerCode',
      key: 'customerCode',
      align: 'center',
    },
    {
      title: '经销商名称',
      dataIndex: 'customerName',
      key: 'customerName',
      // filters: [{ text: '雪花', value: 'xue' }, { text: '微众', value: 'wei' }],
      align: 'center'
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'taxNo',
      key: 'taxNo',
      align: 'center'
    },
    {
      title: '法人代表姓名',
      dataIndex: 'ownerName',
      key: 'ownerName',
      align: 'center'
    },
    {
      title: '法人身份证号码',
      dataIndex: 'ownerIdentityCard',
      key: 'ownerIdentityCard',
      align: 'center'
    },
    {
      title: '法人联系电话',
      dataIndex: 'ownerContact',
      key: 'ownerContact',
      align: 'center'
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
      key: 'contactName',
      // sorter: true,
      align: 'center'
    },
    {
      title: '联系人手机号码',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
      align: 'center'
    },
    {
      title: '经销商内部评级',
      dataIndex: 'internalRating',
      key: 'internalRating',
      align: 'center'
    },
    {
      title: '是否签署有效合约',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center'
    },
    {
      title: '经销商区域',
      dataIndex: 'salesRegion',
      key: 'salesRegion',
      align: 'center'
    },
    {
      title: '合作时长（月)',
      dataIndex: 'cooperationMonth',
      key: 'cooperationMonth',
      align: 'center'
    },
    {
      title: '所属项目',
      dataIndex: 'projectN',
      key: 'projectN',
      align: 'center'
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

  const onChange = (pageNumber: number) => {
    const newId = props.match.params.detail.split('=')[1];
    const params = {
      id: newId,
      ...searchValue,
      pageNum: pageNumber,
      pageSize: 10,
    };
    
    props.sendRequest(params, 'dataCenter/getCorpbasicList')
  };

  const data = corpbasicList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1
  }))

  const total = corpbasicList.total;

  const pageNum = corpbasicList.pageNum;
 
  return (
    <Card
    title="客户列表"
    bordered={false}
    className={styles.asset_data_card}
  >
    <SearchForm style={styles} sendRequest={props.sendRequest} dataCenter={props.dataCenter} setSearchValue={setSearchValue}/>
    <Table
      // dataSource={data}
      dataSource={[{}]}
      columns={columns}
      scroll={{ x: '150%' }}
      bordered
      pagination={{
        showQuickJumper: true,
        total: total,
        onChange: onChange,
        current: pageNum,
        showTotal: () => `总计${total} 条`
      }}
    />
  </Card>
  )
}

export default Card7