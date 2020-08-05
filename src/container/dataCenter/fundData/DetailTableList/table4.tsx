import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Form, Input, DatePicker, Select, Statistic } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const Item = Form.Item;

const { Option } = Select;
const { RangePicker } = DatePicker;

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

const Table5 = (props: Props) => {
  const { sendRequest, dataCenter } = props;

  const { creditList, fundAll, projectAll } = dataCenter;

  const [searchValue, setSearchValue] = useState({});

  useEffect(() => {
    const params = {
      ...searchValue,
      corpId: props.id,
    };
    sendRequest(params, 'dataCenter/getCreditList');
  }, [searchValue]);

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '资金方',
      dataIndex: 'fundName',
      key: 'fundName',
    },
    {
      title: '产品名称',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '授信结果',
      dataIndex: 'creditResult',
      key: 'creditResult',
      render: (record: any) => {
        switch (record) {
          case '1':
            return '通过'
          case '2':
            return '拒绝'
          default:
            return '-'
        }
      }
    },
    {
      title: '核额日期',
      dataIndex: 'verifiedDate',
      key: 'verifiedDate',
    },
    {
      title: '额度编码',
      dataIndex: 'creditAmountNo',
      key: 'creditAmountNo',
    },
    {
      title: '授信额度',
      dataIndex: 'creditAmount',
      key: 'creditAmount',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '授信起始日期',
      dataIndex: 'creditStartDate',
      key: 'creditStartDate',
    },
    {
      title: '额度状态',
      dataIndex: 'creditAmountStatus',
      key: 'creditAmountStatus',
      render: (record: any) => {
        switch (record) {
          case '0':
            return '未生效'
          case '1':
            return '正常'
          case '2':
            return '冻结'
          case '3':
            return '失效'
          default:
            return '-'
        }
      }
    },
    {
      title: '贷款余额',
      dataIndex: 'loanBalance',
      key: 'loanBalance',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '逾期金额',
      dataIndex: 'pastDue',
      key: 'pastDue',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '放款账户名',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: '放款账户',
      dataIndex: 'accountNo',
      key: 'accountNo',
    },
  ];

  const onChange = (pageNumber: number) => {
    const data = {
      ...searchValue,
      pageNum: pageNumber,
      pageSize: 10,
      corpId: props.id,
    };
    sendRequest(data, 'dataCenter/getCreditList');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.fundId === 'all') {
          values.fundId = undefined
        }
        if (values.projectId === 'all') {
          values.projectId = undefined
        }
        if (values.peroidMonth) {
          values.peroidMonth = values.peroidMonth.format('YYYY-MM-DD');
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
          name: '授信记录表',
          corpId: props.id,
        };
        sendRequest(params, 'dataCenter/creditExport')
      }
    });
  };

  const fundAllList = fundAll.map((item: any, index: number) => {
  return <Option value={item.code} key={index}>{item.name}</Option>
  })

  const projectAllList = projectAll.map((item: any, index: number) => {
    return <Option value={item.code} key={index}>{item.name}</Option>
    })

  const { getFieldDecorator } = props.form;

  const data = creditList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1,
  }));

  const total = creditList.total;

  const pageNum = creditList.pageNum;

  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row gutter={24}>
          <Col span={6}>
            <Item {...formItemLayout} label="资金方" style={{ width: '100%' }} >
              {getFieldDecorator('fundId', {
                initialValue: 'all'
              })(
                <Select>
                  <Option value="all">所有资金方</Option>
                  {fundAllList}
                </Select>
              )}
            </Item>
          </Col>

          <Col span={6}>
            <Item {...formItemLayout} label="产品名称" style={{ width: '100%' }}>
              {getFieldDecorator('projectId', {
                initialValue: 'all'
              })(
                <Select>
                <Option value="all">所有产品</Option>
                {projectAllList}
              </Select>
              )}
            </Item>
          </Col>

          <Col span={6}>
            <Item {...formItemLayout} label="核额日期" style={{ width: '100%' }}>
              {getFieldDecorator('verifiedDate')(<RangePicker style={{ width: '100%' }} />)}
            </Item>
          </Col>

          <Col span={6}>
            <Item {...formItemLayout} label="授信起始日期" style={{ width: '100%' }}>
              {getFieldDecorator('creditStartDate')(<RangePicker style={{ width: '100%' }} />)}
            </Item>
          </Col>

          <Col span={6} style={{ paddingTop: 10 }}>
            <Item {...formItemLayout} label="授信结果" style={{ width: '100%' }}>
              {getFieldDecorator('creditResult')(
                <Select allowClear={true}>
                  <Option value={1}>通过</Option>
                  <Option value={2}>拒绝</Option>
                </Select>,
              )}
            </Item>
          </Col>

          <Col span={6} style={{ paddingTop: 10 }}>
            <Item {...formItemLayout} label="额度状态" style={{ width: '100%' }}>
              {getFieldDecorator('creditAmountStatus')(
                <Select allowClear={true}>
                  <Option value={0}>未生效</Option>
                  <Option value={1}>正常</Option>
                  <Option value={2}>冻结</Option>
                  <Option value={3}>失效</Option>
                </Select>,
              )}
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
      <div style={{ paddingTop: 20 }}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          // loading={global}
          scroll={{ x: '150%' }}
          pagination={{
            showQuickJumper: true,
            current: pageNum,
            total: total,
            onChange: onChange,
            showTotal: () => `总计${total} 条`,
          }}
        />
      </div>
    </div>
  );
};
const newTable: any = Table5

export default newTable;
