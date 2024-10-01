
// about us tab

import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Card, Button, List } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, HeartOutlined, AlertOutlined, NotificationOutlined } from '@ant-design/icons';
import LocomotiveScroll from 'locomotive-scroll';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const LandingPage = () => {
  const [heroImage, setHeroImage] = useState('');
  const [newsFeed, setNewsFeed] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setHeroImage('/src/assets/latest.jpg');
    setNewsFeed([
      { title: 'New Orangutan Arrival', description: 'A young orangutan has been rescued and brought to the center.' },
      { title: 'Volunteer Program Update', description: 'New opportunities to volunteer with the Wildlife Center.' },
      { title: 'Conservation Achievements', description: 'Celebrating our success in protecting endangered species.' }
    ]);

    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed'
    });

    // Cleanup function
    return () => {
      if (scroll) scroll.destroy();
    }
  }, []);

  const scrollToDiscover = () => {
    const discoverSection = document.querySelector('.discover-section');
    if (discoverSection) {
      scrollRef.current.scrollTo(discoverSection);
    }
  };

  return (
    <div className="landing-page" data-scroll-container ref={scrollRef}>
      {/* Hero Section with Backdrop */}
      <div className="hero-section" data-scroll-section style={{backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="hero-overlay">
          <Row gutter={0} align="middle" className="hero-content">
            <Col xs={24} md={12}>
              <div className="hero-text">
                <Title level={1} data-scroll data-scroll-speed="1">Discover the beauty of Borneo's wildlife and join us in our conservation efforts.</Title>
                <Paragraph data-scroll data-scroll-speed="2">
                  The Semenggoh Wildlife Centre is a sanctuary for orangutans in Borneo. Established in 1975, the centre is dedicated to the rehabilitation of orangutans that have been injured, orphaned, or rescued from captivity.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>

{/* Discover Section */}
<div className="discover-section" data-scroll-section>
  <Title level={2} className="section-title" data-scroll>Explore</Title>
  <Row gutter={[24, 24]} justify="center">
    <Col xs={24} sm={12} md={8} data-scroll>
      <Card
        hoverable
        className="discover-card"
        cover={<img alt="Interactive Map" src="/src/assets/map.png" />}
      >
        <Card.Meta 
          title="Interactive Map" 
          description="Explore our interactive map to learn about the various habitats and species within the wildlife center."
        />
        <Button type="primary" icon={<EnvironmentOutlined />} block className="discover-button">
          Explore
        </Button>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={8} data-scroll>
      <Card
        hoverable
        className="discover-card"
        cover={<img alt="Feeding Sessions" src="/src/assets/visit1.jpg" />}
      >
        <Card.Meta 
          title="Feeding Sessions" 
          description="Watch our orangutans during meal times and understand their dietary needs. Book your feeding slot now!"
        />
        <Link to="/bookings">
          <Button type="primary" icon={<CalendarOutlined />} block className="discover-button">
            Schedule
          </Button>
        </Link>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={8} data-scroll>
      <Card
        hoverable
        className="discover-card"
        cover={<img alt="Educational Resources" src="/src/assets/visit2.jpg" />}
      >
        <Card.Meta 
          title="Educational Resources" 
          description="Explore the wonders of Semenggoh Wildlife Centre and learn how you can contribute to conservation efforts."
        />
        <Link to="/support">
          <Button type="primary" icon={<HeartOutlined />} block className="discover-button">
            Support
          </Button>
        </Link>
      </Card>
    </Col>
  </Row>


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
        <Paragraph className="description-text">
          <strong>Foreigners: </strong>Adults RM10, Children (6-17) RM5 <br />
          <strong>Malaysian:  </strong>Adults RM5, Children (6-17) RM2
        </Paragraph>
      </Card>
    </Col>
  </Row>
</div>
    </div>
    </div>
  );
};

export default LandingPage;