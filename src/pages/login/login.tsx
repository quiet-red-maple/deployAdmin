import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Checkbox } from 'antd';
import { history } from 'umi';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
  dispatch: any;
  logins: any;
  setLogin: (value: boolean) => any;
}

const Login = (props: Props) => {
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [checkNick]);

  const onCheckboxChange = (e: any) => {
    setCheckNick(e.target.checked);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    props.dispatch({
      type: 'logins/fetch',
      payload: values,
      // 请求完成后返回的结果
      callback: (res: any) => {
        if (res && res.status.code === '000000') {
          let remember = values.remember;
          let token = res.body.token;
          let user = JSON.stringify(res.body);
          if (remember) {
            localStorage.clear();
            sessionStorage.clear();
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
          } else {
            sessionStorage.clear();
            localStorage.clear();
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', user);
          }
          history.push('/');
          // setTimeout(() => {
          //   router.push('/')
          // }, 500)
        }
      },
    });
  };

  // const { getFieldDecorator } = props.form;
  return (
    <Form
      form={form}
      name="Login"
      style={{ width: 400, zIndex: 999999 }}
      onFinish={handleSubmit}
    >
      <h1>登 录</h1>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
      // name="remember"
      // valuePropName="checked"
      >
        <Checkbox
          style={{ color: 'white' }}
          checked={checkNick}
          onChange={onCheckboxChange}
        >
          记住登录
        </Checkbox>
        {/* <Checkbox style={{ color: 'white' }}>记住登录</Checkbox> */}
        <a style={{ float: 'right' }}>忘记密码</a>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          登 录
        </Button>
        {/* <a onClick={() => props.setLogin(false)}>注册</a> */}
      </Form.Item>
    </Form>
  );
};

export default connect(({ logins }: any) => ({ logins }))(Login);
