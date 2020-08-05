import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { Card1, Card2, Card3 } from '@/container/dataCenter/assetPackageData';
import styles from './style.css';

interface Props {
  dispatch: any;
  datacenter: any;
}

const AssetData = (props: Props) => {

  return (
    <div>
      <Card1 style={styles}/>
      <Card2 style={styles}/>
      <Card3 style={styles}/>
    </div>
  );
};

export default connect(({ datacenter }: any) => ({ datacenter }))(AssetData);
