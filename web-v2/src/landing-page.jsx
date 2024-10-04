import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, List } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, HeartOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import Framer Motion

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const [heroImage, setHeroImage] = useState('');
  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    setHeroImage('/src/assets/latest.jpg');
    setNewsFeed([
      { title: 'New Orangutan Arrival', description: 'A young orangutan has been rescued and brought to the center.' },
      { title: 'Volunteer Program Update', description: 'New opportunities to volunteer with the Wildlife Center.' },
      { title: 'Conservation Achievements', description: 'Celebrating our success in protecting endangered species.' }
    ]);
  }, []);

  // Motion variants for animation
  const heroTextVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="hero-overlay">
          <Row gutter={0} align="middle" className="hero-content">
            <Col xs={24} md={12}>
              <motion.div className="hero-text" variants={heroTextVariant} initial="hidden" animate="visible">
                <Title level={1}>Discover the beauty of Borneo's wildlife and join us in our conservation efforts.</Title>
                <Paragraph>
                  The Semenggoh Wildlife Centre is a sanctuary for orangutans in Borneo. Established in 1975, the centre is dedicated to the rehabilitation of orangutans that have been injured, orphaned, or rescued from captivity.
                </Paragraph>
              </motion.div>
            </Col>
          </Row>
        </div>
      </motion.div>

      {/* Discover Section */}
      <div className="discover-section">
        <Title level={2} className="section-title">Explore</Title>
        <Row gutter={[24, 24]} justify="center">
  <Col xs={24} sm={12} md={8}>
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
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
    </motion.div>
  </Col>

  <Col xs={24} sm={12} md={8}>
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
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
    </motion.div>
  </Col>

  <Col xs={24} sm={12} md={8}>
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
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
    </motion.div>
  </Col>
</Row>

      </div>

      {/* News Section */}
      <div className="info-section news-section">
        <Row justify="center">
          <Col xs={24}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
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
            </motion.div>
          </Col>
        </Row>
      </div>

      {/* Admission Info Section */}
      <div className="info-section visit-section">
        <Row justify="center">
          <Col xs={24}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card title="Admission Info" className="admission-card" bordered={false}>
                <Paragraph className="description-text">
                  <strong>Foreigners: </strong>Adults RM10, Children (6-17) RM5 <br />
                  <strong>Malaysian:  </strong>Adults RM5, Children (6-17) RM2
                </Paragraph>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;
