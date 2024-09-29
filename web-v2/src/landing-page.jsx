import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Card, Button, List } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, HeartOutlined, AlertOutlined, NotificationOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const LandingPage = () => {
  const [heroImage, setHeroImage] = useState('');
  const [newsFeed, setNewsFeed] = useState([]);
  const discoverSectionRef = useRef(null);

  useEffect(() => {
    setHeroImage('/src/assets/latest.jpg');
    setNewsFeed([
      { title: 'New Orangutan Arrival', description: 'A young orangutan has been rescued and brought to the center.' },
      { title: 'Volunteer Program Update', description: 'New opportunities to volunteer with the Wildlife Center.' },
      { title: 'Conservation Achievements', description: 'Celebrating our success in protecting endangered species.' }
    ]);
  }, []);

  const scrollToDiscover = () => {
    if (discoverSectionRef.current) {
      discoverSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section with Backdrop */}
      <div className="hero-section" style={{backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="hero-overlay">
          <Row gutter={0} align="middle" className="hero-content">
            <Col xs={24} md={12}>
              <div className="hero-text">
                <Title level={1}>Discover the beauty of Borneo's wildlife and join us in our conservation efforts.</Title>
                <Paragraph>
                  The Semenggoh Wildlife Centre is a sanctuary for orangutans in Borneo. Established in 1975, the centre is dedicated to the rehabilitation of orangutans that have been injured, orphaned, or rescued from captivity.
                </Paragraph>
                <Button type="primary" size="large" onClick={scrollToDiscover} className="discover-button">
                  Discover More
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>


      {/* Discover Section */}
      <div ref={discoverSectionRef} className="discover-section">
        <Title level={2} className="section-title">Discover Our Programs</Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="discover-card"
              cover={<img alt="Orangutan Encounters" src="/src/assets/latest.jpg" />}
            >
              <Card.Meta 
                title="Orangutan Encounters" 
                description="Get up close with our gentle giants and learn about their behavior and conservation."
              />
              <Button type="primary" icon={<EnvironmentOutlined />} block className="discover-button">
                Explore
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="discover-card"
              cover={<img alt="Feeding Sessions" src="/src/assets/visit1.jpg" />}
            >
              <Card.Meta 
                title="Feeding Sessions" 
                description="Watch our orangutans during meal times and understand their dietary needs. Book your feeding slot now!"
              />
              <Button type="primary" icon={<CalendarOutlined />} block className="discover-button">
                Schedule
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="discover-card"
              cover={<img alt="Conservation Efforts" src="/src/assets/visit2.jpg" />}
            >
              <Card.Meta 
                title="Conservation Efforts" 
                description="Learn about our protection programs and how you can contribute to wildlife preservation."
              />
              <Button type="primary" icon={<HeartOutlined />} block className="discover-button">
                Support
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Poacher Alert System Section */}
      <div className="info-section alert-section">
        <Row justify="center">
          <Col xs={24}>
            <Card className="alert-card" title={<><AlertOutlined /> Poacher Alert System</>} bordered={false}>
              <Paragraph>
                <Text strong>Stay informed:</Text> Receive real-time alerts about poaching activity in nearby areas and help us protect endangered species. Our monitoring system sends out instant notifications whenever suspicious activities are detected.
              </Paragraph>
              <Button type="primary" size="large" className="alert-button">Sign up for Alerts</Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* News Feed Section */}
      <div className="info-section news-section">
        <Row justify="center">
          <Col xs={24}>
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
      </div>

      {/* Visitation Info Section */}
      <div className="info-section visit-section">
        <Row justify="center">
          <Col xs={24}>
            <Card title="Admission Info" className="admission-card" bordered={false}>       
              <Paragraph>
                <strong>Foreigners: </strong>Adults RM10, Children (6-17) RM5 <br />
                <strong>Malaysian:  </strong>Adults RM5, Children (6-17) RM2
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;