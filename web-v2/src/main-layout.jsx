import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    { key: '/', icon: <UserOutlined />, label: <Link to="/">Home</Link> },
    { key: '/about', icon: <LaptopOutlined />, label: <Link to="/about">About</Link> },
    { key: '/visit', icon: <NotificationOutlined />, label: <Link to="/visit">Visit Us</Link> },
    { key: '/contact', icon: <NotificationOutlined />, label: <Link to="/contact">Contact</Link> },
  ];

  const getBreadcrumbItems = () => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = [
      {
        title: <Link to="/">Home</Link>,
        key: 'home',
      },
    ];

    pathSnippets.forEach((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const segment = pathSnippets[index];
      const capitalizedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbItems.push({
        title: <Link to={url}>{capitalizedSegment}</Link>,
        key: url,
      });
    });

    return breadcrumbItems;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo-container">
          <img src="/src/assets/logo.png" alt="Wildlife Center Logo" className="logo" />
          <h1 className="header-title">Semenggoh Wildlife Center</h1>
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu
            theme="dark"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
            mode="inline"
            items={sidebarItems}
          />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} items={getBreadcrumbItems()} />
            <div className="main-content-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
        © 2024 Semenggoh Wildlife Centre. All rights reserved.
      </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;