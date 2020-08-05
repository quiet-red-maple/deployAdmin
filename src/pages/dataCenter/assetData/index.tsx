import React, { useState } from 'react';
import { Row, Col, Select, Radio, Progress, Table, Input } from 'antd';
import { Card1, Card2, Card3, Card4, Card5 } from '@/container/dataCenter/assetData';
import { connect } from 'dva';
import styles from './style.css';

const { Option } = Select;

interface Props {
  history: any;
  dispatch: any;
  dataCenter: any;
}

const AssetData = (props: Props) => {
  const { dispatch, dataCenter } = props;

  const sendRequest = (value: any, type: string) => {
    dispatch({
      type: type,
      payload: value,
    });
  };

  return (
    <div>
      <Card1 style={styles} sendRequest={sendRequest} dataCenter={dataCenter}/>
      <Row gutter={24}>
        <Col xxl={8} xl={8}>
          <Card2 style={styles} sendRequest={sendRequest} dataCenter={dataCenter}/>
        </Col>
        <Col xxl={8} xl={8}>
          <Card3 style={styles} sendRequest={sendRequest} dataCenter={dataCenter}/>
        </Col>
        <Col xxl={8} xl={8}>
          <Card4 style={styles} sendRequest={sendRequest} dataCenter={dataCenter}/>
        </Col>
      </Row>
      <Card5 style={styles} history={props.history} sendRequest={sendRequest} dataCenter={dataCenter}/>
    </div>
  );
};

export default connect(({ dataCenter }: any) => ({ dataCenter }))(AssetData);
