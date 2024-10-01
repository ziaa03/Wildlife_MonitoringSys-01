import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll'; // Import Locomotive Scroll
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Import the styles
import { UserOutlined, LaptopOutlined, NotificationOutlined, CalendarOutlined, TrophyOutlined, SettingOutlined, EnvironmentOutlined, ClockCircleOutlined, HeartOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const scrollRef = useRef(null); // Use a ref for the scroll container

  const sidebarItems = [
    { key: '/', icon: <UserOutlined />, label: <Link to="/">Home</Link> },
    { key: '/about', icon: <LaptopOutlined />, label: <Link to="/about">About Us</Link> },
    { key: '/alerts', icon: <NotificationOutlined />, label: <Link to="/alerts">Alerts</Link> },
    { key: '/bookings', icon: <CalendarOutlined />, label: <Link to="/bookings">Bookings</Link> },
    { key: '/challenges', icon: <TrophyOutlined />, label: <Link to="/challenges">Challenges</Link> },
    { key: '/settings', icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
    { key: '/support', icon: <HeartOutlined />, label: <Link to="/support">Support</Link> },
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

  useEffect(() => {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current, // Use the ref for the scroll container
      smooth: true,
      lerp: 0.1,
      getDirection: true,
    });

    // Destroy scroll on component unmount
    return () => {
      if (locoScroll) locoScroll.destroy();
    };
  }, []);

  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={`header ${scrolled ? 'scrolled' : ''}`}>
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

        {/* Main content wrapper with Locomotive Scroll */}
        <Layout className="site-layout" ref={scrollRef} data-scroll-container>
          <Content style={{ margin: '0 16px' }}>
            {/* Breadcrumb */}
            <Breadcrumb style={{ margin: '16px 0' }} items={getBreadcrumbItems()} />

            {/* Main Content */}
            <div className="main-content-background" data-scroll-section style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>

          {/* Footer */}
          <Footer className="site-footer">
            <Row gutter={[16, 16]} justify="space-between" align="top">
              <Col xs={24} sm={12} md={6}>
                <Text strong><ClockCircleOutlined /> Hours</Text>
                <br />
                <Text>Monday - Sunday, 8:00 AM - 4:30 PM</Text>
              </Col>
              <Col xs={24} md={6}>
                <Text strong><EnvironmentOutlined /> Address</Text>
                <br />
                <Text>Off To Jalan Puncak Borneo, 93250 Siburan</Text>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Text strong>© 2024 Semenggoh Wildlife Centre</Text>
                <br />
                <Text>All rights reserved</Text>
              </Col>
            </Row>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
