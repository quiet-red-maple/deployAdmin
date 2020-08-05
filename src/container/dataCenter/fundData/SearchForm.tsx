import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Row, Col, DatePicker, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const { Option } = Select;
const { RangePicker } = DatePicker;
const Item = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: {
    span: 16,
  },
};

const formItemLayout2 = {
  labelCol: { span: 12 },
  wrapperCol: {
    span: 12,
  },
};

interface Props extends FormComponentProps {
  index: any;
  style: any;
  setSearchValue: (data: any) => void;
}

const SearchForm = (props: Props) => {
  const styles = props.style;
  const { projectAll } = props.index;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (values.projectType === 'all') {
        values.projectType = undefined
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
        // dispatch({
        //   type: 'distributorOrder/export',
        //   payload: {
        //     name: '经销商表',
        //     ...values,
        //   },
        // });
      }
    });
  }

  const { getFieldDecorator } = props.form;

  const domList = projectAll.map((item: any, index: number) => {
    return <Option value={item.code} key={index}>{item.name}</Option>
  })

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Row gutter={24} className={styles.form_row}>

      <Col span={6}>
          <Item {...formItemLayout} label='资产方' style={{ width: '100%' }}>
            {getFieldDecorator('projectId')(
              <Input/>
            )}
          </Item>
        </Col>

        <Col span={6}>
          <Item {...formItemLayout} label='所属项目' style={{ width: '100%' }}>
            {getFieldDecorator('projectType',{
              initialValue: 'all'
            })(
              <Select style={{ width: '100%' }} allowClear={true}>
              <Option value="all">所有产品</Option>
              {domList}
            </Select>
            )}
          </Item>
        </Col>

        {/* <Col span={8}>
          <Item {...formItemLayout2} label='经销商公司全称' style={{ width: '100%' }}>
            {getFieldDecorator('distributorName')(
              <Input/>
            )}
          </Item>
        </Col> */}

        <div style={{float: 'right', paddingTop: 5}}>
            <Button type='primary' htmlType='submit' style={{marginRight: 20}}>查询</Button>
            </div>
      </Row>
    </Form>
  )
}

export default SearchForm