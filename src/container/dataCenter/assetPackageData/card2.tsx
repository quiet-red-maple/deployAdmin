import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { Echarts } from '@/components';
import echartsOption from '@/config/echartsOption';

interface Props {
  style: any;
}

const Card1 = (props: Props) => {
  const styles = props.style;
  const { bar } = echartsOption;

  return (
      <Card
        title="资产规模增长趋势"
        bordered={false}
        className={styles.asset_data_card}
        bodyStyle={{
          // height: 275
        }}
      >
        {/* <Echarts option={bar({})} height={300}/> */}
      </Card>
  )
}

export default Card1