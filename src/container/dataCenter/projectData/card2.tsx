import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Progress, Radio } from 'antd';

interface Props {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
}

const Card4 = (props: Props) => {
  const styles = props.style;
  const { charLending } = props.dataCenter;

  const [time, setTime] = useState('0');

  useEffect(() => {
    const params = {};
    props.sendRequest(params, 'dataCenter/getCharLending');
  }, []);

  const onChange = (e: any) => {
    setTime(e.target.value);
  };

  const domList = charLending[time]
    ? charLending[time].data.map((item: any, index: number) => {
        const lendingSum = charLending[time].lendingSum;
        const percent: number = Number(((item.value / lendingSum) * 100).toFixed(2));
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <Col span={18}>
              <Progress percent={percent} status="active" />
            </Col>
            <Col span={6}>
              <a>{item.value}</a> 元
            </Col>
          </div>
        );
      })
    : null;

  return (
    <Card
      title="各项目放款总额排行"
      bordered={false}
      className={styles.asset_data_card}
      bodyStyle={{
        height: 400,
      }}
      // extra={
      //   <Radio.Group onChange={onChange} defaultValue="0" size="small">
      //     <Radio.Button value="0">最近一年</Radio.Button>
      //     <Radio.Button value="1">最近30天</Radio.Button>
      //     <Radio.Button value="2">最近一周</Radio.Button>
      //     <Radio.Button value="3">当天</Radio.Button>
      //   </Radio.Group>
      // }
    >
      <div>
      <Radio.Group onChange={onChange} defaultValue="0" size="small">
          <Radio.Button value="0">最近一年</Radio.Button>
          <Radio.Button value="1">最近30天</Radio.Button>
          <Radio.Button value="2">最近一周</Radio.Button>
          <Radio.Button value="3">当天</Radio.Button>
        </Radio.Group>
      </div>
      <Row gutter={24} className={styles.all_line}>
        {domList}
      </Row>
    </Card>
  );
};

export default Card4;
