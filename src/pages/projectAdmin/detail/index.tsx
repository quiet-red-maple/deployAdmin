import React from 'react';
import { Row, Col } from 'antd';
import './style.less';

interface Props {}

const Detail: React.FC = (props: Props) => {
  return (
    <div className="detail_dom">
      <Row>
        <Col span={3}>项目名称</Col>
        <Col span={21}>xxxx康姆</Col>

        <Col span={3}>项目访问地址</Col>
        <Col span={21}>http:www.gds.com</Col>

        <Col span={3}>项目部署地址</Col>
        <Col span={21}>http:www.gds.com/root/sdf</Col>

        <Col span={3}>项目服务地址</Col>
        <Col span={21}>http:www.gds.com</Col>

        <Col span={3}>项目用户密码</Col>
        <Col span={21}>角色：1</Col>

        <Col span={3}>源码仓库地址</Col>
        <Col span={21}>http:www.gds.com</Col>

        <Col span={3}>项目代理地址</Col>
        <Col span={21}>
          <Col span={21}>/slabs ={'>'} http:www.gds.com</Col>
          <Col span={21}>/slabs2 ={'>'} http:www.gds.com</Col>
        </Col>

        <Col span={3}>项目线上文件</Col>
        <Col span={21}><a>build</a></Col>
      </Row>
    </div>
  );
};

export default Detail;
