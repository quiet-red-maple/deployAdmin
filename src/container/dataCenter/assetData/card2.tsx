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

const Card2 = (props: Props) => {
  const { bar, bar2 } = echartsOption;
  const styles = props.style;

  const [time, setTime] = useState('0');

  const { application } = props.dataCenter;

  useEffect(() => {
    props.sendRequest({}, 'dataCenter/getApplication')
  }, [])

  const onChange = (e: any) => {
    setTime(e.target.value)
  };

  const data = application[time] ? application[time] : [];

  return (
    <Card
    title="各资产方进件总数"
    bordered={false}
    className={styles.asset_data_card}
    // extra={extraDom1()}
    bodyStyle={{
      height: 400,
    }}
  >
    <Radio.Group onChange={onChange} defaultValue="0" size="small" style={{paddingTop: 8}}>
          <Radio.Button value="0">最近一年</Radio.Button>
          <Radio.Button value="1">最近30天</Radio.Button>
          <Radio.Button value="2">最近一周</Radio.Button>
        </Radio.Group>
    <Echarts option={bar(data)} height={300}/>
  </Card>
  )
}

export default Card2