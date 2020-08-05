import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Input, DatePicker, Statistic, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const { MonthPicker } = DatePicker;
const Item = Form.Item;

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: {
    span: 12,
  },
};

interface Props extends FormComponentProps {
  // setSearchValue: (data: any) => void;
  sendRequest: (data: any, type: string) => any;
  dataCenter: any;
  id: string | number;
}

const Table3 = (props: Props) => {

  const {sendRequest, dataCenter} = props;

  const { monthorderList } = dataCenter;

  const [searchValue, setSearchValue] = useState({});

  useEffect(() => {
    const params = {
      ...searchValue,
      corpId: props.id,
    };
    sendRequest(params, 'dataCenter/getMonthorderList')
  }, [searchValue])

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '采购月份',
      dataIndex: 'peroidMonth',
      key: 'peroidMonth',
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
      title: '月进货额',
      dataIndex: 'amount',
      key: 'amount',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '月进货频次',
      dataIndex: 'frequency',
      key: 'frequency',
    }
  ];

  const onChange = (pageNumber: number) => {
    const data = {
      ...searchValue,
      pageNum: pageNumber,
      corpId: props.id,
      pageSize: 10,
    }
    sendRequest(data, 'dataCenter/getMonthorderList')
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.peroidMonth) {
          values.peroidMonth = values.peroidMonth.format('YYYY-MM')
        }
        setSearchValue(values);
      }
    });
  };

  const clearForm = () => {
    props.form.resetFields();
    setSearchValue({});
  };

  const exportFile = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...searchValue,
          name: '月度汇总信息表',
          corpId: props.id,
        };
        sendRequest(params, 'dataCenter/monthorderExport')
      }
    });
  };

  const { getFieldDecorator } = props.form;

  const data = monthorderList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1
  }))

  const total = monthorderList.total;

  const pageNum = monthorderList.pageNum;

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

        {/* <Col span={6}>
          <Item {...formItemLayout} label='月进货额' style={{ width: '100%' }}>
            {getFieldDecorator('amount')(
              <Input/>
            )}
          </Item>
        </Col> */}

        <Col span={6}>
          <Item {...formItemLayout} label='采购月份' style={{ width: '100%' }}>
            {getFieldDecorator('peroidMonth')(
              <MonthPicker style={{ width: '100%' }}/>
            )}
          </Item>
        </Col>

        <div style={{ float: 'right' }}>
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
    <Alert message={`累计总进货额:${123}元， 累计总进货数量:${123}件`} type="info" showIcon style={{marginTop: 20}}/>
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

const newTable: any = Table3

export default newTable;
