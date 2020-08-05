import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

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

const Table4 = (props: Props) => {
  const {sendRequest, dataCenter} = props;

  const { orderStatisticList } = dataCenter;

  const [searchValue, setSearchValue] = useState({});

  useEffect(() => {
    const params = {
      ...searchValue,
      corpId: props.id,
    };
    sendRequest(params, 'dataCenter/getOrderStatisticList')
  }, [searchValue])

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '经销商编号',
      dataIndex: 'customerCode',
      key: 'customerCode',
    },
    {
      title: '经销商名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '累计总进货额',
      dataIndex: 'verifiedDate',
      key: 'verifiedDate',
    },
    {
      title: '累计总进货数量',
      dataIndex: 'creditAmountNo',
      key: 'creditAmountNo',
    },
  ];

  const onChange = (pageNumber: number) => {
    const data = {
      ...searchValue,
      pageNum: pageNumber,
      pageSize: 10,
      corpId: props.id,
    }
    sendRequest(data, 'dataCenter/getOrderStatisticList')
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
          name: '信息汇总表',
          corpId: props.id,
        };
        sendRequest(params, 'dataCenter/orderStatisticExport')
      }
    });
  };

  const { getFieldDecorator } = props.form;

  const data = orderStatisticList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1
  }))

  const total = orderStatisticList.total;

  const pageNum = orderStatisticList.pageNum;

  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row gutter={24}>
          <Col span={8}>
            <Item label="经销商编号" {...formItemLayout} style={{ width: '100%' }}>
              {getFieldDecorator('customerCode')(<Input />)}
            </Item>
          </Col>

          <Col span={8}>
            <Item {...formItemLayout} label="经销商名称" style={{ width: '100%' }}>
              {getFieldDecorator('customerName')(<Input />)}
            </Item>
          </Col>

          {/* <Col span={6}>
          <Item {...formItemLayout} label='销售区域' style={{ width: '100%' }}>
            {getFieldDecorator('salesArea')(
              <Input/>
            )}
          </Item>
        </Col> */}

          <div style={{ float: 'right', paddingTop: 4 }}>
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
      <div style={{ paddingTop: 20 }}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          // loading={global}
          // scroll={{ x: '150%' }}
          pagination={{
            showQuickJumper: true,
            current: pageNum,
            total: total,
            onChange: onChange,
            showTotal: () => `总计${total} 条`
          }}
        />
      </div>
    </div>
  );
};

export default Table4;
