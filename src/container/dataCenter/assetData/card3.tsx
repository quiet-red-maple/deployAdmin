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

const Card3 = (props: Props) => {
  const { bar } = echartsOption;
  const styles = props.style;
  const { charLoan } = props.dataCenter;
  const [time, setTime] = useState('0');

  useEffect(() => {
    props.sendRequest({}, 'dataCenter/getCharLoan')
  }, [])

  const onChange = (e: any) => {
    setTime(e.target.value)
  };

  const data = charLoan[time] ? charLoan[time] : [];

  return (
    <Card
    title="各资产方放款总额排行"
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

export default Card3