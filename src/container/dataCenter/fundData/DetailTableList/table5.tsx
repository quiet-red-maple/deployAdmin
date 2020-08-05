import React, { useState, useEffect } from 'react';
import { Table, Form, Select, Button, Row, Col, Input, DatePicker, Statistic } from 'antd';
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
  match: any;
}

const Table6 = (props: Props) => {

  const {sendRequest, dataCenter} = props;

  const { lendingList, fundAll, projectAll } = dataCenter;

  const [searchValue, setSearchValue] = useState({});

  useEffect(() => {
    const params = {
      ...searchValue,
      corpId: props.id,
    };
    sendRequest(params, 'dataCenter/getLendingList')
  }, [searchValue])

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
      title: '放款结果',
      dataIndex: 'lendingResult',
      key: 'lendingResult',
      render: (record: any) => {
        return record === '1' || record === 1 ? '成功' : '-';
      },
    },
    {
      title: '本次放款金额',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '借据编号',
      dataIndex: 'iouNo',
      key: 'iouNo',
    },
    {
      title: '执行利率',
      dataIndex: 'executionInterestRate',
      key: 'executionInterestRate',
    },
    {
      title: '起息日期',
      dataIndex: 'interestStartDate',
      key: 'interestStartDate',
    },
    {
      title: '到期日期',
      dataIndex: 'interestEndDate',
      key: 'interestEndDate',
    },
    {
      title: '还款方式',
      dataIndex: 'repayType',
      key: 'repayType',
      render: (record: any) => {
        switch (record) {
          case '1':
            return '提前还款交易';
          case '2':
            return '正常还款交易';
          case '3':
            return '逾期还款交易';
          case '4':
            return '保证金划扣';
          case '5':
            return '贷款核销';

          default:
            break;
        }
      },
    },
    {
      title: '放款时间',
      dataIndex: 'putoutDate',
      key: 'putoutDate',
    },
  ];

  const onChange = (pageNumber: number) => {
    const data = {
      ...searchValue,
      pageNum: pageNumber,
      pageSize: 10,
      corpId: props.id,
    }
    sendRequest(data, 'dataCenter/getLendingList')
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
          name: '放款记录表',
          corpId: props.id,
        };
        sendRequest(params, 'dataCenter/lendingExport')
      }
    });
  };

  const { getFieldDecorator } = props.form;

  const fundAllList = fundAll.map((item: any, index: number) => {
    return <Option value={item.code} key={index}>{item.name}</Option>
    })

    const projectAllList = projectAll.map((item: any, index: number) => {
      return <Option value={item.code} key={index}>{item.name}</Option>
      })

  const data = lendingList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1
  }))

  const total = lendingList.total;

  const pageNum = lendingList.pageNum;

  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row gutter={24}>
          <Col span={6}>
            <Item {...formItemLayout} label="资金方" style={{ width: '100%' }}>
              {getFieldDecorator('fundId',{
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
            <Item {...formItemLayout} label="放款结果" style={{ width: '100%' }}>
              {getFieldDecorator('lendingResult')(
                <Select style={{ width: '100%' }} allowClear={true}>
                <Option value={'1'}>成功</Option>
                <Option value={'2'}>失败</Option>
              </Select>
              )}
            </Item>
          </Col>

          <Col span={6}>
            <Item {...formItemLayout} label="还款方式" style={{ width: '100%' }}>
              {getFieldDecorator('repayType')(
                <Select style={{ width: '100%' }} allowClear={true}>
                <Option value={'RPT-02'}>等额本金</Option>
                <Option value={'RPT-03'}>一次还本付息</Option>
                <Option value={'RPT-04'}>按月付息到期还本</Option>
                <Option value={'RPT-18'}>联通还款</Option>
                <Option value={'RPT-23'}>前3期按月付息，后9期等额本金</Option>
                <Option value={'RPT-25'}>超期月供</Option>
              </Select>
              )}
            </Item>
          </Col>

          <Col span={6} style={{ paddingTop: 10 }}>
            <Item {...formItemLayout} label="起息日期" style={{ width: '100%' }}>
              {getFieldDecorator('interestStartDate')(<RangePicker style={{ width: '100%' }}/>)}
            </Item>
          </Col>

          <Col span={6} style={{ paddingTop: 10 }}>
            <Item {...formItemLayout} label="到期日期" style={{ width: '100%' }}>
              {getFieldDecorator('interestEndDate')(<RangePicker style={{ width: '100%' }}/>)}
            </Item>
          </Col>

          <Col span={6} style={{ paddingTop: 10 }}>
            <Item {...formItemLayout} label="放款时间" style={{ width: '100%' }}>
              {getFieldDecorator('putoutDate')(<RangePicker style={{ width: '100%' }}/>)}
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
          scroll={{ x: '120%' }}
          pagination={{
            showQuickJumper: true,
            total: total,
            current: pageNum,
            onChange: onChange,
            showTotal: () => `总计${total} 条`
          }}
        />
      </div>
    </div>
  );
};
const newTable: any = Table6

export default newTable;
