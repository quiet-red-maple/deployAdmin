import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

interface Props {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
  match: any;
}

const Card1 = (props: Props) => {
  const styles = props.style;

  const { assetDetailStatistics } = props.dataCenter;
  return (
      <Card
        title="资产数据"
        bordered={false}
        className={styles.asset_data_card}
        bodyStyle={{
          // height: 275
        }}
      >
        <Row gutter={24} className={styles.row_div}>

        <Col xxl={4} xl={8} xs={8}>
            <Statistic title="资产方用户数（个）" value={assetDetailStatistics.assetNum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="累计获得授信用户数（个）" value={assetDetailStatistics.creditUserNum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="累计获得放款用户数（个）" value={assetDetailStatistics.lendingUserNum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="已对接资金方数（个）" value={assetDetailStatistics.fundNum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="累计获得授信总额（元）" value={assetDetailStatistics.creditSum} />
          </Col>

          <Col xxl={4} xl={8} xs={8}>
            <Statistic title="累计获得放款总额（元）" value={assetDetailStatistics.lendingSum} />
          </Col>

        </Row>
      </Card>
  )
}

export default Card1