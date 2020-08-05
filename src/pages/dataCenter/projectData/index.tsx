import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Select, Radio, Progress, Table, Input } from 'antd';
import { connect } from 'dva';
import {
  Card1, Card2, Card3, Card4, Card5
} from '@/container/dataCenter/projectData'
import styles from './style.css';

interface Props {
  dispatch: any;
  dataCenter: any;
  history: any;
}

const FunData = (props: Props) => {
  const { dispatch, dataCenter } = props;

  const sendRequest = (value: any, type: string) => {
    dispatch({
      type: type,
      payload: value,
    });
  };

  return (
    <div>
      <Row gutter={24}>
        <Col xxl={8} xl={8} lg={12}>
          <Card1 style={styles} sendRequest={sendRequest} dataCenter={dataCenter}/>
        </Col>
        <Col xxl={8} xl={8} lg={12}>
        <Card2 style={styles} sendRequest={sendRequest} dataCenter={dataCenter}/>
        </Col>

        <Col xxl={8} xl={8} lg={24}>
          <Card3 style={styles} sendRequest={sendRequest} dataCenter={dataCenter}/>
        </Col>
      </Row>
      <Card4 style={styles} sendRequest={sendRequest} dataCenter={dataCenter}/>
      <Card5 style={styles} sendRequest={sendRequest} dataCenter={dataCenter} history={props.history}/>
    </div>
  )
}

export default connect(({ dataCenter }: any) => ({ dataCenter }))(FunData)