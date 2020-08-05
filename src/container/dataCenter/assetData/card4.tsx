import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Progress, Radio, Statistic } from 'antd';

interface Props {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
}

const Card4 = (props: Props) => {
  const styles = props.style;
  const { charPassPercent } = props.dataCenter;
  const [time, setTime] = useState('0');

  useEffect(() => {
    props.sendRequest({}, 'dataCenter/getCharPassPercent')
  }, [])

  const onChange = (e: any) => {
    setTime(e.target.value)
  };

  const domList = charPassPercent[time]
    ? charPassPercent[time].data.map((item: any, index: number) => {
        const lendingSum = charPassPercent[time].lendingSum;
        const percent: number = Number(((item.value / lendingSum) * 100).toFixed(2));
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <Col span={18}>
              <Progress percent={percent} status="active" />
            </Col>
            <Col span={6}>
              {/* <a>{item.value}</a> 元 */}
              <Statistic value={item.value} className={styles.statistic_money}/>元
            </Col>
          </div>
        );
      })
    : null;
  
  return (
    <Card
    title="各项目通过率排行"
    bordered={false}
    className={styles.asset_data_card}
    bodyStyle={{
      height: 400,
    }}
  >
    <Radio.Group onChange={onChange} defaultValue="0" size="small" style={{paddingTop: 8, paddingBottom: 20}}>
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

export default Card4