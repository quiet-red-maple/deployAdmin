import React, { useState } from 'react';
import { connect } from 'dva';
import BackgroundCanvas from './backgroundCanvas';
import style from './style.less';
import Login from './login';
import Register from './register';

interface Props {
  dispatch: any;
}

const Logins = (props: Props) => {

  const [login, setLogin] = useState(true);

  const sendRequest = (value: any, type: string, callBack: any) => {
    props.dispatch({
      type: type,
      payload: value,
      callBack: callBack
    });
  };

  return (
    <div className={style.login} id='back_dom'>
      <BackgroundCanvas />
      {/* <Form onSubmit={handleSubmit} style={{ width: 300, zIndex: 999999 }}>
        <h1>登 录</h1>
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
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox style={{ color: 'white' }}>记住登录</Checkbox>)}
          <a style={{ float: 'right' }}>
            忘记密码
          </a>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登 录
          </Button>
          <NavLink to={'/register'}>注册</NavLink>
        </Form.Item>
      </Form> */}
      {
        login 
        ? 
        <Login 
        setLogin={setLogin} 
        // sendRequest={sendRequest}
        />
        : <Register setLogin={setLogin}/>
      }
    </div>
  )
}

export default connect(({ logins }: any) => ({ logins }))(Logins)