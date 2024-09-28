import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Space, Carousel, Divider } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, HeartOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const LandingPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages([
      '/src/assets/latest.jpg',
      '/src/assets/visit1.jpg',
      '/src/assets/visit2.jpg',
      '/src/assets/visit3.jpeg',
    ]);
  }, []);

  return (
    <div className="landing-page">
      <Row>
        <Col span={24} className="hero-section">
          <Carousel autoplay effect="fade" className="image-carousel">
            {images.map((image, index) => (
              <div key={index}>
                <div className="carousel-image" style={{backgroundImage: `url(${image})`}} />
              </div>
            ))}
          </Carousel>
          <div className="hero-content">
            <Title level={1} className="fade-in">Semenggoh Wildlife Center</Title>
            <Paragraph className="fade-in">
              Discover the beauty of Borneo's orangutans
            </Paragraph>
            <Button type="primary" size="large" icon={<ArrowDownOutlined />} className="fade-in">
              Learn More
            </Button>
          </div>
        </Col>
      </Row>

      <Row justify="center" align="middle" className="content-section">
        <Col xs={24} md={18} lg={16} xl={14}>
          <Title level={2} className="fade-in text-center">Welcome to Our Sanctuary</Title>
          <Paragraph className="fade-in text-center">
            The Semenggoh Wildlife Centre, established in 1975, is a sanctuary for orangutans in Borneo. 
            We are dedicated to the rehabilitation of orangutans that have been injured, orphaned, or rescued from captivity. 
            Our centre is nestled within the lush Semenggoh Nature Reserve, a protected rainforest area.
          </Paragraph>
        </Col>
      </Row>

      <Divider />

      <Row justify="center" className="info-section">
        <Col xs={24} md={20} lg={18} xl={16}>
          <Card title="Visitation Information" className="fade-in info-card">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Title level={4}>Hours</Title>
                <Paragraph>Monday - Sunday<br />9:00 AM - 5:00 PM</Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <Title level={4}>Admission</Title>
                <Paragraph>Adults: $15<br />Children (3-12): $10<br />Seniors: $12</Paragraph>
              </Col>
              <Col xs={24} md={8}>
                <Title level={4}>Location</Title>
                <Paragraph>123 Wildlife Lane<br />Nature City, NC 12345</Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;