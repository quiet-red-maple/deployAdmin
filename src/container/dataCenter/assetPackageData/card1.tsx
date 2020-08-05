import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

interface Props {
  style: any;
}

const Card1 = (props: Props) => {
  const styles = props.style;
  return (
      <Card
        title="资产包数据"
        bordered={false}
        className={styles.asset_data_card}
        bodyStyle={{
          // height: 275
        }}
      >
        <Row gutter={24} className={styles.row_div}>

          <Col span={4}>
            <Statistic title="资产包数（个）" value={60000} />
          </Col>

          <Col span={4}>
            <Statistic title="资产笔数（笔）" value={2000} />
          </Col>

          <Col span={4}>
            <Statistic title="累计资产规模（万元）" value={2000} />
          </Col>

          <Col span={4}>
            <Statistic title="剩余资产规模（万元）" value={2000} />
          </Col>

          <Col span={4}>
            <Statistic title="资产方个数（个）" value={2000} />
          </Col>

        </Row>
      </Card>
  )
}

export default Card1