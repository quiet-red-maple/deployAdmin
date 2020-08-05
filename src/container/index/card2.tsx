import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

interface Props {
  style: any;
  index: any;
  sendRequest: (params: any, type: string) => any;
}

const Card2 = (props: Props) => {
  const styles = props.style;

  const { statisticData } = props.index;
  const { orderInputNum, orderOutPutNum } = statisticData;

  return (
      <Card
        title="订单数据统计"
        bordered={false}
        className={styles.asset_data_card}
        bodyStyle={{
          // height: 275
        }}
      >
        <Row gutter={24} className={styles.row_div2}>

          <Col span={24}>
            <Statistic title="链平方共接收订单数据（条）" value={orderInputNum} />
          </Col>

          <Col span={24}>
            <Statistic title="链平方整理后输出（条）" value={orderOutPutNum} />
          </Col>
        </Row>
      </Card>
  )
}

export default Card2