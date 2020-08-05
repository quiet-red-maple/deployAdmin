import React from 'react';
import { DashboardOutlined, AuditOutlined } from '@ant-design/icons';

interface MenuConfig {
  id: string,
  path: string,
  name: string,
  icon?: JSX.Element;
  MenuConfig?: Array<MenuConfig>;
}

const Home: MenuConfig = {
  id: 'home',
  path: '/',
  name: '首页',
  icon: <DashboardOutlined />,
}

// const DataCenter: MenuConfig = {
//   id: 'dataCenter',
//   path: '/dataCenter',
//   name: '数据中心',
//   icon: <AuditOutlined />,
//   MenuConfig: [
//     {
//       id: 'assetData',
//       name: '资产端数据',
//       path: '/assetData',
//     },
//     {
//       id: 'fundData',
//       name: '资金端数据',
//       path: '/fundData',
//     },
//     {
//       id: 'projectData',
//       name: '项目数据',
//       path: '/projectData',
//     },
//   ]
// }

const ServerAdmin: MenuConfig = {
  id: 'serverAdmin',
  path: '/',
  name: '服务器管理',
  icon: <DashboardOutlined />,
}

const ProjectAdmin: MenuConfig = {
  id: 'projectAdmin',
  path: '/',
  name: '项目管理',
  icon: <DashboardOutlined />,
}

export const PageAll = [
  Home,
  ServerAdmin,
  ProjectAdmin
]

// 面包屑导航配置
export const PathAll = () => {
  // 只有一级目录时
  // return PageAll.map((item, index) => ({
  //   path: item.path,
  //   breadcrumb: item.name,
  // }))

  // 最多二级目录时
  let secondList: any = [];
  let thirdList: any = [];
  const firstPage: any = PageAll.map((item, index) => {
    if (item.MenuConfig) {
      item.MenuConfig.map((item2, index2) => {
        let data = {
          path: item2.path,
          id: item2.id,
          breadcrumb: item2.name,
        }
        if (item2.MenuConfig) {
          item2.MenuConfig.map((item3, index2) => {
            let data = {
              path: item3.path,
              id: item3.id,
              breadcrumb: item3.name,
            }
            thirdList.push(data)
          })
        }
        secondList.push(data)
      })

    }
    return {
      path: item.path,
      id: item.id,
      breadcrumb: item.name,
    }
  })

  let pathAllList = firstPage.concat(secondList).concat(thirdList);

  return pathAllList
}
// 左侧导航
export const PathCurrent = () => {
  return PageAll.map((item, index) => ({
    ...item
  }))
}