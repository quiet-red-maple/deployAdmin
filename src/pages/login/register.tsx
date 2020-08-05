import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, message, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends FormComponentProps {
  dispatch: any;
  login: any;
  setLogin: (value: boolean) => any;
}

const Register = (props: Props) => {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.dispatch({
          type: 'login/setRegister',
          payload: values,
          // 请求完成后返回的结果
          callback: (res: any) => {
            if (res && res.code === 200) {
              message.success('注册成功请登录');
              setTimeout(() => {
                props.setLogin(true)
              }, 1000)
            }
          }
        })
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit} style={{ width: 400, zIndex: 999999 }}>
      <h1>注 册</h1>
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入用户名!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="6 - 16位密码，区分大小写"
          />,
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('repeatpass', {
          rules: [{ required: true, message: '请再次输入密码!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="确认密码"
          />,
        )}
      </Form.Item>

      <Form.Item>
        <Row gutter={24}>
          <Col span={14}>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请输入图形验证码!' }],
            })
            (
            <Input 
            placeholder="输入图形验证码"
            prefix={<Icon type="insurance" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            )}
          </Col>
          <Col span={10}>
            <div>123</div>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Row gutter={24}>
          <Col span={14}>
            {getFieldDecorator('ver', {
              rules: [{ required: true, message: '请输入短信验证码!' }],
            })(
            <Input 
            placeholder="输入短信验证码"
            prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            )}
          </Col>
          <Col span={10}>
            <Button style={{width: '100%'}}>获取短信验证码</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          注 册
          </Button>
        <a onClick={() => props.setLogin(true)}>登录</a>
      </Form.Item>
    </Form>
  )
}

export default connect(({ login }: any) => ({ login }))(Register)