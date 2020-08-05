import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd';
import { connect } from 'dva';
import { Table1, Table2, Table3, Table4, Table5, Table6, Table7 } from '@/container/dataCenter/fundData/DetailTableList';
import styles from '../../style.css';

const { TabPane } = Tabs;

interface Props {
  history: any;
  dispatch: any;
  dataCenter: any;
  index: any;
  match: any;
}

const Detail = (props: Props) => {

  let { dispatch, dataCenter, index } = props;

  dataCenter = { ...dataCenter, ... index }

  const sendRequest = (value: any, type: string) => {
    dispatch({
      type: type,
      payload: value,
    });
  };

  useEffect(() => {
    const params = {};
    sendRequest(params, 'dataCenter/getFundAll');
    sendRequest(params, 'index/getProjectAll');
  }, [])

  const callback = (key: string) => {
    // console.log(key);
  }

  
  const newId = props.match.params.customerDetail.split('=')[1];

  const domList = [
    {
      id: '1',
      title: '基本信息',
      dom: <Table1 sendRequest={sendRequest} dataCenter={dataCenter} id={newId}/>
    },
    {
      id: '2',
      title: '订单信息',
      dom: <Table2 sendRequest={sendRequest} dataCenter={dataCenter} id={newId}/>
    },
    {
      id: '3',
      title: '月度汇总信息',
      dom: <Table3 sendRequest={sendRequest} dataCenter={dataCenter} id={newId}/>
    },
    {
      id: '4',
      title: '授信记录',
      dom: <Table4 sendRequest={sendRequest} dataCenter={dataCenter} id={newId}/>
    },
    {
      id: '5',
      title: '放款记录',
      dom: <Table5 sendRequest={sendRequest} dataCenter={dataCenter} id={newId}/>
    },
    {
      id: '6',
      title: '还款记录',
      dom: <Table6 sendRequest={sendRequest} dataCenter={dataCenter} id={newId}/>
    },
    {
      id: '7',
      title: '还款计划',
      dom: <Table7 sendRequest={sendRequest} dataCenter={dataCenter} id={newId}/>
    }
  ]

  const tabDom = domList.map((item, index) => {
    return <TabPane tab={item.title} key={item.id} className={styles.detail_tab_list}>{item.dom}</TabPane>
  })

  const back = () => {
    props.history.goBack()
  }

  return (
    <div>
      {/* <Button onClick={back} type="primary">返回</Button> */}
      <div className={styles.detailTab}>
        <Tabs defaultActiveKey="1" onChange={callback} style={{ paddingTop: 20 }}>
          {tabDom}
        </Tabs>
      </div>
    </div>
  )
}

export default connect(({ dataCenter, index }: any) => ({ dataCenter, index }))(Detail)