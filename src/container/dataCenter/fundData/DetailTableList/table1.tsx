import React, { useEffect } from 'react';
import { Descriptions } from 'antd';

interface Props {
  sendRequest: (data: any, type: string) => any;
  dataCenter: any;
  id: number | string;
}

const Table1 = (props: Props) => {

  const {sendRequest, dataCenter} = props;

  const { corpbasicInfo } = dataCenter;

  useEffect(() => {
    const params = {
      id: props.id
    };
    sendRequest(params, 'dataCenter/getCorpbasicInfo')
  }, [])

  return (
    <Descriptions bordered>
      <Descriptions.Item label="经销商编号">{corpbasicInfo.customerCode}</Descriptions.Item>
      <Descriptions.Item label="经销商名称">{corpbasicInfo.customerName}</Descriptions.Item>
      <Descriptions.Item label="统一社会信用代码">{corpbasicInfo.taxNo}</Descriptions.Item>
      <Descriptions.Item label="法人代表姓名">{corpbasicInfo.ownerName}</Descriptions.Item>
      <Descriptions.Item label="法人身份证号码"
      // span={2}
      >
        {corpbasicInfo.ownerIdentityCard}
    </Descriptions.Item>
      <Descriptions.Item label="法人联系电话">{corpbasicInfo.ownerContact}</Descriptions.Item>
      <Descriptions.Item label="联系人">{corpbasicInfo.ownerName}</Descriptions.Item>
      <Descriptions.Item label="联系人手机号码">{corpbasicInfo.ownerContact}</Descriptions.Item>
      <Descriptions.Item label="经销商内部评级">{'A'}</Descriptions.Item>
      <Descriptions.Item label="收款账号户名">{corpbasicInfo.wineryAccountName}</Descriptions.Item>
      <Descriptions.Item label="收款银行">{corpbasicInfo.wineryAccountBank}</Descriptions.Item>
      <Descriptions.Item label="开户网点">{corpbasicInfo.openBank}</Descriptions.Item>
      <Descriptions.Item label="收款账号">{corpbasicInfo.wineryAccount}</Descriptions.Item>
      <Descriptions.Item label="是否签署有效合约">{'-'}</Descriptions.Item>
      <Descriptions.Item label="合作时长（月）">{corpbasicInfo.monthPeriod}</Descriptions.Item>
      <Descriptions.Item label="经销商区域">{corpbasicInfo.salesRegion}</Descriptions.Item>
      <Descriptions.Item label="合并编号">{corpbasicInfo.salesRegion}</Descriptions.Item>
    </Descriptions>
  )
}

export default Table1