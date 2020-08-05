import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Card1, Card2, Card3, Card4, Card5, Card6, Card7 } from '@/container/index';
import { connect } from 'dva';
import styles from './style.css';

interface Props {
  dispatch: any;
  index: any;
}

const Index = (props: Props) => {
  const { dispatch, index } = props;

  const sendRequest = (value: any, type: string) => {
    dispatch({
      type: type,
      payload: value,
    });
  };

  useEffect(() => {
    // sendRequest({}, 'index/getStatistic');
    // sendRequest({}, 'index/getProjectAll')
  }, [])

  return (
    <div>
      欢迎使用项目管理系统
    </div>
  );
};

export default connect(({ index }: any) => ({ index }))(Index);
