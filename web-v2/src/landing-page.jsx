import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Card, Row, Col, Typography, Space} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, EnvironmentOutlined, CalendarOutlined, HeartOutlined } from '@ant-design/icons';
import './styles.css';  // Make sure this import is at the top


const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

const useBodyClass = (className) => {
  useEffect(() => {
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
};

const sidebarItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Home',
  },
  {
    key: '2',
    icon: <LaptopOutlined />,
    label: 'About',
  },
  {
    key: '3',
    icon: <NotificationOutlined />,
    label: 'Visit Us',
  },
  {
    key: '4',
    icon: <NotificationOutlined />,
    label: 'Contact',
  },
];

const WildlifeCenterLandingPage = () => {
  useBodyClass('main-page-body');
  const [collapsed, setCollapsed] = useState(true); // State to control sidebar collapsed/expanded

  return (
    <Layout className="layout wildlife-center-layout" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/src/assets/logo.png" alt="Wildlife Center Logo" className="logo" />
          <Title level={3} style={{ color: 'white', margin: 0, marginLeft: 5 }}>
            Semenggoh Wildlife Center
          </Title>
        </div>

        {/* Horizontal Navigation Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ flex: 1, justifyContent: 'flex-end' }}
          items={[
            { key: 'home', label: 'Home' },
            { key: 'about', label: 'About' },
            { key: 'visit', label: 'Visit Us' },
            { key: 'contact', label: 'Contact' },
          ]}
        />
      </Header>

      {/* Layout with Sidebar and Content */}
      <Layout>
        {/* Left Sidebar */}
        <Sider
          width={200}
          theme="light"
          collapsible
          collapsed={collapsed}
          onMouseEnter={() => setCollapsed(false)}  // Expand sidebar on hover
          onMouseLeave={() => setCollapsed(true)}   // Collapse sidebar on mouse leave
          style={{
            position: 'absolute',
            left: 0,
            top: 64,  // To stay below the header
            bottom: 50,  // To stay above the footer
            backgroundColor: '#f0f2f5',
            transition: 'width 0.2s ease',
            zIndex: 1000, // Ensures it's above content
            height: 'calc(100vh - 114px)', // Full height between header and footer
            overflow: 'hidden',  // Hide content on collapse
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%' }}
            items={sidebarItems}
          />
        </Sider>

        {/* Main Content Area */}
        <Layout
          style={{
            padding: '24px',
            position: 'relative',
            zIndex: 1,  // Content stays below the sidebar when it expands
          }}
        >
          <Content>
            <Row gutter={[16, 16]} justify="center">
              <Col span={24} md={12}>
                <img
                  src="/src/assets/latest.jpg"
                  alt="Wildlife Center"
                  style={{ width: '100%', borderRadius: 8 }}
                  className="fade-in"
                />
              </Col>
              <Col span={24} md={12}>
                <Title level={2} className="fade-in">Welcome to Our Wildlife Center</Title>
                <Paragraph className="fade-in">
                  Our wildlife center is dedicated to the conservation and protection of local fauna. 
                  We provide a safe haven for injured and orphaned animals, offering rehabilitation 
                  services and educational programs to promote wildlife awareness.
                </Paragraph>
              </Col>
            </Row>

            <Row justify="center" style={{ marginTop: 32, marginBottom: 32 }}>
              <Space size="large">
                <Button
                  type="primary"
                  icon={<EnvironmentOutlined className="shortcut-button-icon" />}
                  className="shortcut-button"
                >
                  Map
                </Button>
                <Button
                  type="primary"
                  icon={<CalendarOutlined className="shortcut-button-icon" />}
                  className="shortcut-button"
                >
                  Bookings
                </Button>
                <Button
                  type="primary"
                  icon={<HeartOutlined className="shortcut-button-icon" />}
                  className="shortcut-button"
                >
                  Donate
                </Button>
              </Space>
            </Row>

            <Card title="Visitation Information" style={{ marginBottom: 32 }} className="fade-in">
              <Paragraph>
                <Text strong>Hours:</Text> Monday - Sunday, 9:00 AM - 5:00 PM
              </Paragraph>
              <Paragraph>
                <Text strong>Admission:</Text> Adults $15, Children (3-12) $10, Seniors $12
              </Paragraph>
              <Paragraph>
                <Text strong>Address:</Text> 123 Wildlife Lane, Nature City, NC 12345
              </Paragraph>
            </Card>
          </Content>
        </Layout>
      </Layout>

      {/* Footer */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white', zIndex: 10 }}>
        <Row gutter={[16, 16]}>
          <Col span={24} md={8}>
            <Title level={4} style={{ color: 'white' }}>About Us</Title>
            <Paragraph style={{ color: 'white' }}>
              We are committed to wildlife conservation and education.
            </Paragraph>
          </Col>
          <Col span={24} md={8}>
            <Title level={4} style={{ color: 'white' }}>Contact</Title>
            <Paragraph style={{ color: 'white' }}>
              Phone: (555) 123-4567<br />
              Email: info@wildlifecenter.org
            </Paragraph>
          </Col>
          <Col span={24} md={8}>
            <Title level={4} style={{ color: 'white' }}>Follow Us</Title>
            <Paragraph style={{ color: 'white' }}>
              Facebook | Twitter | Instagram
            </Paragraph>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default WildlifeCenterLandingPage;
