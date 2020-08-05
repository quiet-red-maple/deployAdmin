import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends FormComponentProps {
  dispatch: any;
  member: any;
}

const changePasswordDom = (props: Props) => {

  // const user = sessionStorage.getItem("user");

  // let token = '';

  // if (user) {
  //   const users = JSON.parse(user);
  //   token = users.token
  // }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.dispatch({
          type: 'changePassword/fetch',
          payload: values,
          // 请求完成后返回的结果
          callback: (res: any) => {
            if (res && res.code === 200) {
              message.success('修改密码成功请重新登录')
                // setTimeout(() => {
                //   props.logout()
                //     .then(
                //       res => {
                //         if (!res.error) {
                //           props.history.push('/login')
                //         }
                //       }
                //     )
                // }, 1000)
            }
          }
        })
      }
    });
  }

  const handleConfirmPassword = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = props.form;
    if (value && value !== getFieldValue('newPassword')) {
      callback('两次输入不一致！')
    }

    callback()
  }

  const handleResetClick = () => {
    props.form.resetFields();
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if (value && !reg.test(value)) {
        callback('请输入8-16位密码，包括至少一个字母，一个数字');
    } else {
        callback();
    }
};


  const { getFieldDecorator } = props.form;
  return (
    <div>
      <h2 style={{ paddingBottom: 20 }}>修改密码</h2>
      <Row gutter={24}>
        <Col span={12}>
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
            <Form.Item label="原密码">
              {getFieldDecorator('oldPassword', {
                rules: [{ required: true, message: '请输入原密码!' }],
              })(<Input placeholder="请输入" type="password" />)}
            </Form.Item>

            <Form.Item label="新密码">
              {getFieldDecorator('newPassword', {
                rules: [
                  { required: true, message: '请输入新密码!' },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              })(<Input placeholder="请输入" type="password" />)}
            </Form.Item>

            <Form.Item label="重复新密码">
              {getFieldDecorator('repeatpass', {
                rules: [
                  { required: true, message: '请再次输入新密码!' },
                  { validator: handleConfirmPassword }
                ],
              })(<Input placeholder="请输入" type="password" />)}
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                保存
          </Button>
              <Button type="default" onClick={handleResetClick} style={{ marginLeft: 40 }}>
                取消
          </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default connect(({ changePasswordDom }: any) => ({ changePasswordDom }))(changePasswordDom)