import React, { useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';

interface Props {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
}

const Card1 = (props: Props) => {
  const styles = props.style;

  const { statistics } = props.dataCenter;

  useEffect(() => {
    props.sendRequest({}, 'dataCenter/getStatistics')
  }, [])
  
  const { todayCreditUserSum, todayLendingUserNum, todayCreditSum, todayLendingSum } = statistics;
  
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

          <Col span={6}>
            <Statistic title="本月获得授信用户数（个）" value={todayCreditUserSum} />
          </Col>

          <Col span={6}>
            <Statistic title="本月获得放款用户数（个）" value={todayLendingUserNum} />
          </Col>

          <Col span={6}>
            <Statistic title="本月授信总额（元）" value={todayCreditSum} />
          </Col>

          <Col span={6}>
            <Statistic title="本月获得放款总额（元）" value={todayLendingSum} />
          </Col>

        </Row>
      </Card>
  )
}

export default Card1