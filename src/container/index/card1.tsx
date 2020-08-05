import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';

interface Props {
  style: any;
  index: any;
  sendRequest: (params: any, type: string) => any;
}

const Card1 = (props: Props) => {
  const styles = props.style;
  const { statisticData } = props.index;

  const { assetNum, fundNum, projectNum } = statisticData;
  
  return (
      <Card
        title="平台渠道统计"
        bordered={false}
        className={styles.asset_data_card}
        bodyStyle={{
          // height: 522
        }}
      >
        <Row gutter={24} className={styles.row_div1}>

          <Col span={12}>
            <Statistic title="资产方总数（个）" value={assetNum} />
          </Col>

          <Col span={12}>
            <Statistic title="资金方总数（个）" value={fundNum} />
          </Col>

          <Col span={12}>
            <Statistic title="平台项目总数（个）" value={projectNum} />
          </Col>
        </Row>
      </Card>
  )
}

export default Card1