import React, { useEffect, useState } from 'react';
import { Table, Form, Row, Col, Button, Select, DatePicker, Input, Statistic } from 'antd';
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

const Table7 = (props: Props) => {

  const {sendRequest, dataCenter} = props;

  const { repayList, repaymenplanList, fundAll } = dataCenter;

  const [searchValue, setSearchValue] = useState({});

  useEffect(() => {
    const params = {
      ...searchValue,
      corpId: props.id
    };
    sendRequest(params, 'dataCenter/getRepaymenplanList')
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
      title: '还款结果',
      dataIndex: 'repayResult',
      key: 'repayResult',
      render: (record: any) => {
        return record === '1' || record === 1 ? '成功' : '-';
      },
    },
    {
      title: '本次还款金额',
      dataIndex: 'repayAmount',
      key: 'repayAmount',
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
      title: '还款流水号',
      dataIndex: 'repayNo',
      key: 'repayNo',
    },
    {
      title: '还款日期',
      dataIndex: 'repayDate',
      key: 'repayDate',
    },
    {
      title: '还款类型',
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
  ];

  const columns2 =  [
    {
      title: '日期',
      dataIndex: 'shouldRepaymentDate',
      key: 'shouldRepaymentDate',
    },
    {
      title: '本期应还金额（元）',
      dataIndex: 'shouldRepaymentAmount',
      key: 'shouldRepaymentAmount',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '逾期利息（元）',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '实际应还（元）',
      dataIndex: 'repayResult',
      key: 'repayResult',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '已还款金额（元）',
      dataIndex: 'repayAmount',
      key: 'repayAmount',
      render: (record: any) => {
        return <Statistic value={record} className="statistic_money"/>
      }
    },
    {
      title: '状态',
      dataIndex: 'repayStatus',
      key: 'repayStatus',
    }
  ];

  const onChange = (pageNumber: number) => {
    const data = {
      ...searchValue,
      pageNum: pageNumber,
      pageSize: 10,
      id: props.id
    }
    sendRequest(data, 'dataCenter/getRepaymenplanList')
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.fundId === 'all') {
          values.fundId = undefined
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
          name: '还款计划表',
          corpId: props.id,
        };
        sendRequest(params, 'dataCenter/repayMenPlanExport')
      }
    });
  };

  const fundAllList = fundAll.map((item: any, index: number) => {
    return <Option value={item.code} key={index}>{item.name}</Option>
    })


  const { getFieldDecorator } = props.form;

  const data1 = repaymenplanList.list.map((item: any, index: number) => ({
    ...item,
    key: index + 1
  }))

  const total = repaymenplanList.total;

  const pageNum = repaymenplanList.pageNum;

  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit} style={{paddingBottom: 20}}>
          <Row gutter={24}>
          <Col span={6}>
              <Item label="资金方" {...formItemLayout} style={{ width: '100%' }}>
                {getFieldDecorator('fundId',{
                  initialValue: 'all'
                })(
                <Select style={{ width: '100%' }}>
                <Option value="all">所有资金方</Option>
                {fundAllList}
              </Select>
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
        <Table
        dataSource={data1}
        columns={columns2}
        bordered
        pagination={{
          showQuickJumper: true,
          current: pageNum,
          total: total,
          onChange: onChange,
          showTotal: () => `总计${total} 条`
        }}
        />
    </div>
  );
};

const newTable: any = Table7

export default newTable;
