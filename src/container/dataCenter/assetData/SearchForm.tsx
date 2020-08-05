import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Row, Col, DatePicker, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const { RangePicker } = DatePicker;
const Item = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: {
    span: 12,
  },
};

interface Props extends FormComponentProps {
  style: any;
  dataCenter: any;
  sendRequest: (data: any, type: string) => any;
  setSearchValue: (data: any) => void;
}

const SearchForm = (props: Props) => {
  const styles = props.style;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (values.salesRegion === 'all') {
        values.salesRegion = undefined
      }
      if (!err) {
        props.setSearchValue(values)
      }
    });
  };

  const clearForm = () => {
    props.form.resetFields()
    props.setSearchValue({})
  }

  const exportFile = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          name: '资产端客户列表',
          ...values
        }
        props.sendRequest(params, 'dataCenter/corpbasicExport')
      }
    });
  }

  const { getFieldDecorator } = props.form;

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Row gutter={24} className={styles.form_row}>
        <Col span={6}>
          <Item label="经销商编号"  {...formItemLayout} style={{ width: '100%' }} >
            {getFieldDecorator('customerCode')(
              <Input/>
            )}
          </Item>
        </Col>

        <Col span={6}>
          <Item {...formItemLayout} label='经销商名称' style={{ width: '100%' }}>
            {getFieldDecorator('customerName')(
              <Input/>
            )}
          </Item>
        </Col>

        <Col span={6}>
          <Item {...formItemLayout} label='统一社会信用代码' style={{ width: '100%' }}>
            {getFieldDecorator('taxNo')(
              <Input/>
            )}
          </Item>
        </Col>

        <Col span={6}>
          <Item {...formItemLayout} label='法人代表姓名' style={{ width: '100%' }}>
            {getFieldDecorator('ownerName')(
              <Input/>
            )}
          </Item>
        </Col>

        <Col span={6} >
          <Item {...formItemLayout} label='法人身份证号码' style={{ width: '100%' }}>
            {getFieldDecorator('ownerIdentityCard')(
              <Input/>
            )}
          </Item>
        </Col>

        <Col span={6} >
          <Item {...formItemLayout} label='经销商评级' style={{ width: '100%' }}>
            {getFieldDecorator('internalRating')(
              <Select>
              <Option value={'A'}>A</Option>
              <Option value={'B'}>B</Option>
            </Select>
            )}
          </Item>
        </Col>

        <Col span={6} >
          <Item {...formItemLayout} label='是否签署有效合约' style={{ width: '100%' }}>
            {getFieldDecorator('isActive')(
              <Select>
                <Option value={'1'}>是</Option>
                <Option value={'0'}>否</Option>
              </Select>
            )}
          </Item>
        </Col>

        <Col span={6} >
          <Item {...formItemLayout} label='经销商区域' style={{ width: '100%' }}>
            {getFieldDecorator('salesRegion')(
              <Select>
                <Option value={'all'}>全部地区</Option>
              <Option value={'天津'}>天津</Option>
              <Option value={'河南'}>河南</Option>
              <Option value={'浙江'}>浙江</Option>
            </Select>
            )}
          </Item>
        </Col>

        <Col span={6} >
          <Item {...formItemLayout} label='合作时长(月)' style={{ width: '100%' }}>
            {getFieldDecorator('cooperationTime')(
              <RangePicker style={{width: '100%'}}/>
            )}
          </Item>
        </Col>

        <div style={{float: 'right'}}>
            <Button type='primary' htmlType='submit' style={{marginRight: 20}}>查询</Button>
            <Button onClick={clearForm} style={{marginRight: 20}}>清除</Button>
            <Button onClick={exportFile} style={{marginRight: 10}}>导出</Button>
            </div>
      </Row>
    </Form>
  )
}

const newForm: any = SearchForm
export default newForm