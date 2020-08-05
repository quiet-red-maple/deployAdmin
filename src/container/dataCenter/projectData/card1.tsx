import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Radio, Select } from 'antd';
import { Echarts } from '@/components';
import echartsOption from '@/config/echartsOption';

const { Option } = Select;

interface Props {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
}

const Card1 = (props: Props) => {
  const { circular } = echartsOption;
  const styles = props.style;
  const { charApplication } = props.dataCenter;
  const [time, setTime] = useState('0');

  useEffect(() => {
    const params = {};
    props.sendRequest(params, 'dataCenter/getCharApplication')
  }, [])

  const onChange = (e: any) => {
    setTime(e.target.value)
  };

  const extraDom1 = () => {
    return (
      <div>
        <Radio.Group onChange={onChange} defaultValue="0" size="small">
          <Radio.Button value="0">最近一年</Radio.Button>
          <Radio.Button value="1">最近30天</Radio.Button>
          <Radio.Button value="2">最近一周</Radio.Button>
          <Radio.Button value="3">当天</Radio.Button>
        </Radio.Group>
      </div>
    );
  };

  const data = charApplication && charApplication[time] ? charApplication[time] : [];

  return (
    <Card
    title="各项目进件总数"
    bordered={false}
    className={styles.asset_data_card}
    // extra={extraDom1()}
    bodyStyle={{
      height: 400,
    }}
  >
    <div style={{paddingBottom: 20}}>
        <Radio.Group onChange={onChange} defaultValue="0" size="small">
          <Radio.Button value="0">最近一年</Radio.Button>
          <Radio.Button value="1">最近30天</Radio.Button>
          <Radio.Button value="2">最近一周</Radio.Button>
          <Radio.Button value="3">当天</Radio.Button>
        </Radio.Group>
      </div>
    <Echarts option={circular(data, '进件总数')} height={300}/>
  </Card>
  )
}

export default Card1