import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  UserOutlined, LaptopOutlined, NotificationOutlined, 
  CalendarOutlined, TrophyOutlined, SettingOutlined, 
  HeartOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

// Custom hook for smooth scrolling
const useSmoothScroll = () => {
  useEffect(() => {
    const smoothScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      const targetId = href.replace(/.*\#/, '');
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({
        behavior: 'smooth',
      });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
    };
  }, []);
};

const MainLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useSmoothScroll();

  const menuItems = [
    { key: '/', icon: <UserOutlined />, label: 'Home' },
    { key: '/about', icon: <LaptopOutlined />, label: 'About Us' },
    { key: '/alerts', icon: <NotificationOutlined />, label: 'Alerts' },
    { key: '/bookings', icon: <CalendarOutlined />, label: 'Bookings' },
    { key: '/challenges', icon: <TrophyOutlined />, label: 'Challenges' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
    { key: '/support', icon: <HeartOutlined />, label: 'Support' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', borderRadius: '15px', overflow: 'hidden' }}>
      <Header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/src/assets/logo.png" alt="Wildlife Center Logo" className="logo" />
          <h1 className="header-title">Semenggoh Wildlife Center</h1>
        </motion.div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: <Link to={item.key}>{item.label}</Link>,
          }))}
        />
      </Header>

      <Content>
        <motion.div
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </Content>

      <Footer className="site-footer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Text strong>© 2024 Semenggoh Wildlife Centre</Text>
          <br />
          <Text>All rights reserved</Text>
        </motion.div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;