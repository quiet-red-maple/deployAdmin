import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Radio, Select } from 'antd';
import { Echarts } from '@/components';
import echartsOption from '@/config/echartsOption';

const { Option } = Select;

interface Props {
  style: any;
  index: any;
  sendRequest: (params: any, type: string) => any;
}

const Card3 = (props: Props) => {
  const { bar2 } = echartsOption;
  const styles = props.style;

  const { creaitAndLending, projectAll } = props.index;

  const [projectId, setProjectId] = useState<null | string>(null);
  const [time, setTime] = useState('0');

  useEffect(() => {
    const params = {
      projectId: projectId === 'all' ? null : projectId,
    };
    props.sendRequest(params, 'index/getCreaitAndLending');
  }, [projectId]);

  const onChange = (e: any) => {
    setTime(e.target.value);
  };

  const handleChange = (value: any) => {
    setProjectId(value);
  };

  const domList = projectAll.map((item: any, index: number) => {
    return <Option value={item.code} key={index}>{item.name}</Option>
  })

  const extraDom1 = () => {
    return (
      <div>
        <span style={{ padding: 20 }}>请选择项目:</span>
        <Select style={{ width: 200 }} defaultValue={'all'} onChange={handleChange}>
          <Option value="all">所有项目</Option>
          {domList}
        </Select>
      </div>
    );
  };

  const dataArray = creaitAndLending[time] ? creaitAndLending[time].data : [];
  const nameArray = creaitAndLending[time] ? creaitAndLending[time].names : [];

  const data = {
    dataArray,
    nameArray,
    company: '元',
    companyName: '金额',
  };

  const text = time === '1' ? '30天' : '一年';

  const creditCountArray = creaitAndLending[time] ? creaitAndLending[time].data[0].value : [];
  const putoutCountArray = creaitAndLending[time] ? creaitAndLending[time].data[1].value : [];
  const creditCountResult =
    creditCountArray.length > 0
      ? creditCountArray.reduce((total: number, num: number) => {
          return Number(total) + Number(num);
        })
      : 0;
  const putoutCountResult =
    putoutCountArray.length > 0
      ? putoutCountArray.reduce((total: number, num: number) => {
          return Number(total) + Number(num);
        })
      : 0;

  return (
    <Card
      title="授信/放款金额统计（增量数据）"
      bordered={false}
      className={styles.asset_data_card}
      extra={extraDom1()}
      bodyStyle={{
        height: 400,
      }}
    >
      <Radio.Group onChange={onChange} size="small" defaultValue={'0'} style={{ paddingTop: 8 }}>
        <Radio.Button value="0">最近一年</Radio.Button>
        <Radio.Button value="1">最近30天</Radio.Button>
      </Radio.Group>
      <h4 style={{ float: 'right', padding: 10 }}>
        最近{text}累计授信金额：<span style={{ color: '#7da3ff' }}>
          {/* {creditCountResult.toFixed(2)} */}
          <Statistic value={creditCountResult.toFixed(2)} className={styles.statistic_money}/>
          元
          </span>
        <span style={{ paddingLeft: 10, paddingRight: 10 }}>|</span>
        最近{text}累计授信用户：<span style={{ color: '#6cbbff' }}>
          {/* {putoutCountResult.toFixed(2)} */}
          <Statistic value={putoutCountResult.toFixed(2)} className={styles.statistic_money}/>
          元</span>
      </h4>
      <div style={{paddingTop: 20}}>
      <Echarts option={bar2(data)} height={300} />
      </div>
    </Card>
  );
};

export default Card3;
