import React from 'react';
import { Card, Row, Col, Statistic, Radio } from 'antd';

interface Props {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
}

const Card1 = (props: Props) => {
  const styles = props.style;
  const { charApplication } = props.dataCenter;
  const allValue = charApplication['3'] ? charApplication['3'].data.map((item: any, index: number) => {
    return item.value
  }) : [];

  const allAmount = allValue.length > 0 ? allValue.reduce((pre: number, next: number) => {
    return Number(pre) + Number(next);
  }) : 0;

  return (
    <Card
      title="今日数据"
      bordered={false}
      className={styles.asset_data_card}
      bodyStyle={{
        height: 400,
      }}
    >
      <Row gutter={24} className={styles.row_div}>
        <Col xxl={24} xl={24} xs={24}>
          <Statistic title="今日进件总数（条）" className={styles.statistic_1} value={allAmount} />
        </Col>

        {/* <Col xxl={24} xl={24} xs={24}>
            <Statistic title="今日放款总额（万）" className={styles.statistic_2} value={8000} />
          </Col>

          <Col xxl={24} xl={24} xs={24}>
            <Statistic title="今日获得放款用户数（个）" className={styles.statistic_3} value={60} />
          </Col> */}
      </Row>
    </Card>
  );
};

export default Card1;
