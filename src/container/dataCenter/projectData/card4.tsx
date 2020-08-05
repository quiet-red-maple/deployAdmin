import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Radio } from 'antd';
import { Echarts } from '@/components';
import echartsOption from '@/config/echartsOption';

interface Props {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
}

const Card1 = (props: Props) => {
  const styles = props.style;
  const { bar } = echartsOption;

  const { charmaxLending } = props.dataCenter;

  const [time, setTime] = useState('0');

  const onChange = (e: any) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    const params = {};
    props.sendRequest(params, 'dataCenter/getCharmaxLending')
  }, [])

  const data = charmaxLending[time] ? charmaxLending[time] : [];

  return (
      <Card
        title="各项目最高放款金额"
        bordered={false}
        className={styles.asset_data_card}
        bodyStyle={{
          // height: 275
        }}
        extra={
          <Radio.Group onChange={onChange} defaultValue="0" size="small">
            <Radio.Button value="0">最近一年</Radio.Button>
            <Radio.Button value="1">最近30天</Radio.Button>
            <Radio.Button value="2">最近一周</Radio.Button>
            <Radio.Button value="3">当天</Radio.Button>
          </Radio.Group>
        }
      >
        <Echarts option={bar(data)} height={300}/>
      </Card>
  )
}

export default Card1