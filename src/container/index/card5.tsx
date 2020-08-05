import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Progress, Radio, Statistic } from 'antd';

interface Props {
  style: any;
  index: any;
  sendRequest: (params: any, type: string) => any;
}

const Card3 = (props: Props) => {
  const styles = props.style;

  const { lending } = props.index;

  const [time, setTime] = useState('0');

  useEffect(() => {
    const params = {}
    props.sendRequest(params, 'index/getLending')
  }, [])

  const onChange = (e: any) => {
    setTime(e.target.value)
  };

  const domList = lending[time] ? lending[time].data.map((item: any, index: number) => {
    const lendingSum = lending[time].lendingSum;
    const percent: number = Number(((item.value / lendingSum) * 100).toFixed(2))
    return (
      <div key={index}>
        <h1>{item.name}</h1>
        <Col span={18}>
          <Progress percent={percent} status="active" />
        </Col>
        <Col span={6}>
        <Statistic value={item.value} className={styles.statistic_money}/>元
          {/* <a>{item.value}</a> 元 */}
        </Col>
      </div>
    )
  }) : null

  return (
    <Card
    title="项目放款金额排行"
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
      <Row gutter={24} className={styles.all_line}>
        {domList}
      </Row>
  </Card>
  )
}

export default Card3