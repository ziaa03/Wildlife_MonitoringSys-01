import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Carousel, List } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, HeartOutlined, AlertOutlined, NotificationOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const LandingPage = () => {
  const [images, setImages] = useState([]);
  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    // Simulating image loading
    setImages([
      '/src/assets/latest.jpg',
      '/src/assets/visit1.jpg',
      '/src/assets/visit2.jpg',
      '/src/assets/visit3.jpeg',
    ]);

    // Simulating news feed loading
    setNewsFeed([
      { title: 'New Orangutan Arrival', description: 'A young orangutan has been rescued and brought to the center.' },
      { title: 'Volunteer Program Update', description: 'New opportunities to volunteer with the Wildlife Center.' },
      { title: 'Conservation Achievements', description: 'Celebrating our success in protecting endangered species.' }
    ]);
  }, []);

  return (
    <div className="landing-page">
      {/* Carousel Section */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Carousel autoplay effect="fade" className="image-carousel">
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Wildlife Center ${index + 1}`}
                  style={{ width: '100%', height: '700px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Hero Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 32, textAlign: 'center' }}>
        <Col span={24}>
          <Title level={2} className="fade-in">Welcome to Semenggoh Wildlife Center</Title>
          <Paragraph className="fade-in">
            The Semenggoh Wildlife Centre is a sanctuary for orangutans in Borneo. Established in 1975, the centre is dedicated to the rehabilitation of orangutans that have been injured, orphaned, or rescued from captivity.
          </Paragraph>
        </Col>
      </Row>

      {/* Info Cards Section */}
      <Row gutter={[16, 16]} justify="center" className="mt-8">
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="info-card slide-up"
            actions={[
              <Button type="primary" icon={<EnvironmentOutlined />} block>Explore</Button>
            ]}
          >
            <Card.Meta title="Orangutan Encounters" description="Get up close with our gentle giants." />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="info-card slide-up"
            actions={[
              <Button type="primary" icon={<CalendarOutlined />} block>Schedule</Button>
            ]}
          >
            <Card.Meta title="Feeding Sessions" description="Watch our orangutans during meal times." />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="info-card slide-up"
            actions={[
              <Button type="primary" icon={<HeartOutlined />} block>Support</Button>
            ]}
          >
            <Card.Meta title="Conservation Efforts" description="Learn about our protection programs." />
          </Card>
        </Col>
      </Row>

      {/* Poacher Alert System Section */}
      <Row justify="center" style={{ marginTop: 50, textAlign: 'center' }}>
        <Col xs={24} sm={20} md={12}>
          <Card className="alert-card scale-up" title={<><AlertOutlined /> Poacher Alert System</>} bordered={false}>
            <Paragraph className="fade-in">
              <Text strong>Stay informed:</Text> Receive real-time alerts about poaching activity in the nearby areas and help us protect endangered species. Our monitoring system sends out instant notifications whenever suspicious activities are detected.
            </Paragraph>
            <Button type="danger" size="large" block>Sign up for Alerts</Button>
          </Card>
        </Col>
      </Row>

      {/* News Feed Section */}
      <Row justify="center" style={{ marginTop: 50, textAlign: 'center' }}>
        <Col xs={24} sm={20} md={12}>
          <Card className="news-card" title={<><NotificationOutlined /> Latest News</>} bordered={false}>
            <List
              itemLayout="vertical"
              dataSource={newsFeed}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta title={item.title} description={item.description} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Visitation Info Section */}
      <Row justify="center" style={{ marginTop: 32, textAlign: 'center' }}>
        <Col xs={24} sm={20} md={12}>
          <Card title="Visitation Information" className="fade-in visit-card">
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
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
