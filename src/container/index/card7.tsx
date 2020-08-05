import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Progress, Radio } from 'antd';
import { Echarts } from '@/components';
import echartsOption from '@/config/echartsOption';

interface Props {
  style: any;
  index: any;
  sendRequest: (params: any, type: string) => any;
}

const Card7 = (props: Props) => {
  const styles = props.style;

  const { pie } = echartsOption;

  const { fund } = props.index;

  const [time, setTime] = useState('0');

  useEffect(() => {
    const params = {

    }
    props.sendRequest(params, 'index/getFund')
  }, [])

  const onChange = (e: any) => {
    setTime(e.target.value)
  };

  const data = fund && fund[time] ? fund[time] : [];

  return (
    <Card
    title="各项目资金使用率排行"
    bordered={false}
    className={styles.asset_data_card}
    headStyle={{
      minHeight: 64,
      paddingTop: 5,
    }}
    bodyStyle={{
      height: 400,
    }}
  >
    <Radio.Group onChange={onChange} defaultValue="0" size="small" style={{paddingTop: 8}}>
        <Radio.Button value="0">最近一年</Radio.Button>
        <Radio.Button value="1">最近30天</Radio.Button>
        <Radio.Button value="2">最近一周</Radio.Button>
      </Radio.Group>
      <Echarts option={pie({data})} height={300}/>
  </Card>
  )
}

export default Card7