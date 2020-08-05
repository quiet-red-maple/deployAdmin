import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Input, DatePicker, Alert, Statistic } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const { RangePicker } = DatePicker;
const Item = Form.Item;

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: {
    span: 12,
  },
};

interface Props extends FormComponentProps {
  sendRequest: (data: any, type: string) => any;
  dataCenter: any;
  id: string | number;
}

const Table2 = (props: Props) => {

  const {sendRequest, dataCenter} = props;

  const { orderList } = dataCenter;

  const [searchValue, setSearchValue] = useState({});

  useEffect(() => {
    const params = {
      ...searchValue,
      corpId: props.id
    };
    sendRequest(params, 'dataCenter/getOrderList')
  }, [searchValue])

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    // {
    //   title: '经销商编号',
    //   dataIndex: 'customerCode',
    //   key: 'customerCode',
    // },
    // {
    //   title: '经销商名称',
    //   dataIndex: 'customerName',
    //   key: 'customerName',
    // },
    {
      title: '订单编号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '数量（箱）',
      dataIndex: 'orderedQuantity',
      key: 'orderedQuantity',
    },
    {
      title: '金额（元）',
      dataIndex: 'actualAmount',
      key: 'actualAmount',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '采购日期',
      dataIndex: 'creationDate',
      key: 'creationDate',
    },
    {
      title: '收款酒厂账户名',
      dataIndex: 'ownerName',
      key: 'ownerName4',
    },
  ];

  const onChange = (pageNumber: number) => {
    const params = {
      ...searchValue,
      corpId: props.id,
      pageNum: pageNumber,
      pageSize: 10,
    };
    sendRequest(params, 'dataCenter/getOrderList')
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setSearchValue(values)
      }
    });
  };

  const clearForm = () => {
    props.form.resetFields();
    setSearchValue({})
  };

  const exportFile = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...searchValue,
          name: '订单表',
          corpId: props.id,
        };
        sendRequest(params, 'dataCenter/orderExport')
      }
    });
  };

  const data = orderList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1
  }))

  const total = orderList.total;

  const pageNum = orderList.pageNum;

  const { getFieldDecorator } = props.form;

  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row gutter={24}>
          {/* <Col span={6}>
            <Item label="经销商编号" {...formItemLayout} style={{ width: '100%' }}>
              {getFieldDecorator('customerCode')(<Input />)}
            </Item>
          </Col>

          <Col span={6}>
            <Item {...formItemLayout} label="经销商名称" style={{ width: '100%' }}>
              {getFieldDecorator('customerName')(<Input />)}
            </Item>
          </Col> */}

          <Col span={6}>
            <Item {...formItemLayout} label="订单编号" style={{ width: '100%' }}>
              {getFieldDecorator('orderNumber')(<Input />)}
            </Item>
          </Col>

          <Col span={6}>
            <Item {...formItemLayout} label="采购日期" style={{ width: '100%' }}>
              {getFieldDecorator('creationDate')(<RangePicker />)}
            </Item>
          </Col>

          <Col span={6} style={{ paddingTop: 10 }}>
            <Item {...formItemLayout} label="收款酒厂账户名" style={{ width: '100%' }}>
              {getFieldDecorator('name')(<Input />)}
            </Item>
          </Col>

          <div style={{ float: 'right', paddingTop: 15 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
              查询
            </Button>
            <Button onClick={clearForm} style={{ marginRight: 20 }}>
              清除
            </Button>
            <Button onClick={exportFile} style={{ marginRight: 10 }}>
              导出
            </Button>
          </div>
        </Row>
      </Form>
      {/* <Alert message={`累计总进货额:${123}元， 累计总进货数量:${123}件`} type="info" showIcon style={{marginTop: 20}}/> */}
      <div style={{ paddingTop: 20 }}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          // loading={global}
          // scroll={{ x: '150%' }}
          pagination={{
            showQuickJumper: true,
            total: total,
            onChange: onChange,
            current: pageNum,
            showTotal: () => `总计${total} 条`
          }}
        />
      </div>
    </div>
  );
};

const newTable: any = Table2

export default newTable;
