import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { history } from 'umi';
import {
  LogoutOutlined,
} from '@ant-design/icons';
import Login from '@/pages/login';
import { PathAll, PathCurrent } from '../config/auth';
import './layout.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface Props {
  children: any;
}

const SiderDemo = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : localStorage.getItem('token');
  const user: any = sessionStorage.getItem('user')
    ? sessionStorage.getItem('user')
    : localStorage.getItem('user');
  let userName = user ? JSON.parse(user).nickname : '';

  useEffect(() => {
    // 当user或者token不存在时跳转登陆页
    if (!user || !token) {
      history.push('/login');
    }
  }, []);

  const getUrl = (e: any) => {
    if (e.key === 'home') {
      history.push('/');
    } else {
      history.push(`/${e.key}`);
    }
  };

  const logOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    history.push('/login');
  };

  const PathCurrents = PathCurrent();

  let Menus = PathCurrents.map(item => {
    return item;
  });

  // getNewList当前角色权限  PathCurrent()所有权限
  const currentMenu = Menus.map((item: any, index: number) => {
    if (!item) {
      return [];
    } else if (!item.MenuConfig) {
      return (
        <Menu.Item key={item.id}>
          {item.icon}
          <span>{item.name}</span>
        </Menu.Item>
      );
    } else {
      return (
        <SubMenu
          key={item.id}
          title={
            <span>
              {item.icon}
              <span>{item.name}</span>
            </span>
          }
        >
          {item.MenuConfig.map((item2: any, index2: number) => {
            return (
              <Menu.Item key={`${item.id}/${item2.id}`}>
                {item2.icon}
                {item2.name}
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    }
  });

  // 默认路由，默认打开导航
  const currentPath = location.pathname;
  const names = currentPath.split('/');
  const defaultPath =
    location.pathname === '/' ? 'home' : `${names[1]}/${names[2]}`;
  const defaultOpenKeys = names[1];

  // 面包屑相关，额外添加路由
  const changePassword = [{ path: '/changePassword', breadcrumb: '修改密码' }];

  const routes = PathAll().concat(changePassword);

  const Breadcrumbs = () => {
    return routes.map((item: any, index: number) => {
      return (
        <Breadcrumb.Item key={item.id}>{item.breadcrumb}</Breadcrumb.Item>
      );
    }).filter((item: any, index: number) => {
      return names.includes(item.key)
    });
  };

  if (location.pathname === '/login') {
    return <Login />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }} className="index_menu">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">项目部署管理平台</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[defaultPath]}
          selectedKeys={[defaultPath]}
          defaultOpenKeys={[defaultOpenKeys]}
          mode="inline"
          onClick={getUrl}
        >
          {currentMenu}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header">
          <div className="logo_icon">
            <Menu
              className="wlayout__menu"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
              // theme="dark"
            >
              <SubMenu
                title={<span>您好、{'12'}</span>}
                className="wlmenu__settings"
              >
                <Menu.Item key="logout" onClick={logOut}>
                  <LogoutOutlined />
                  退出登录
                </Menu.Item>
                {/* <Item key="changPassword" onClick={changPassword}>
                  <Icon type="redo" />
                  修改密码
                </Item> */}
              </SubMenu>
            </Menu>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {Breadcrumbs()}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
