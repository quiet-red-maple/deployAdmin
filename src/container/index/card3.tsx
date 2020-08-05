import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

interface Props {
  style: any;
  index: any;
  sendRequest: (params: any, type: string) => any;
}

const Card3 = (props: Props) => {
  const styles = props.style;

  const { statisticData } = props.index;
  const { clientNum, creditUserNum, lendingUserNum, creditSum, lendingSum, loanBalanceNum } = statisticData;

  return (
      <Card
        title="平台数据统计"
        bordered={false}
        className={styles.asset_data_card}
        bodyStyle={{
          // height: 275
        }}
      >
        <Row gutter={24} className={styles.row_div}>

          <Col span={8}>
            <Statistic title="申请用户数（个）" value={clientNum} />
          </Col>

          <Col span={8}>
            <Statistic title="累计授信用户数（个）" value={creditUserNum} />
          </Col>

          <Col span={8}>
            <Statistic title="累计获得放款用户数（个）" value={lendingUserNum} />
          </Col>

          <Col span={8}>
            <Statistic title="总授信额度（元）" value={creditSum} />
          </Col>

          <Col span={8}>
            <Statistic title="累计放款金额（元）" value={lendingSum} />
          </Col>

          <Col span={8}>
            <Statistic title="在贷余额（元）" value={loanBalanceNum} />
          </Col>
        </Row>
      </Card>
  )
}

export default Card3