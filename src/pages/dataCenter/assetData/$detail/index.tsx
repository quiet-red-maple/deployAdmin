import React, { useState, useEffect } from 'react';
import {
  Card6, Card7
} from '@/container/dataCenter/assetData';
import { connect } from 'dva';
import styles from '../style.css';

interface Props {
  match: any;
  dispatch: any;
  dataCenter: any;
  history: any;
  location: any;
}
const Detail = (props: Props) => {
  const { dispatch, dataCenter } = props;
  const sendRequest = (value: any, type: string) => {
    dispatch({
      type: type,
      payload: value,
    });
  };

  const title = props.location.state.record.clientName;
  const titleCode = props.location.state.record.clientCode

  useEffect(() => {
    const newId = props.match.params.detail.split('=')[1];
    const params = {
      assetId: newId
    }
    sendRequest(params, 'dataCenter/getAssetDetailStatistics')
  }, [])
  return (
    <div>
<h1 style={{ fontSize: 25 }}>{title}（哈希编码: {titleCode}）</h1>
      <Card6 style={styles} sendRequest={sendRequest} dataCenter={dataCenter} match={props.match}/>
      <Card7 style={styles} sendRequest={sendRequest} dataCenter={dataCenter} match={props.match} history={props.history}/>
    </div>
  )
}

export default connect(({ dataCenter }: any) => ({ dataCenter }))(Detail)