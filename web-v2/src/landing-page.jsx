import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, List, Carousel } from 'antd';
import { EnvironmentOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const [newsFeed, setNewsFeed] = useState([]);

  // Set hero images with correct paths (either public folder or imported)
  useEffect(() => {
    setNewsFeed([
      { title: 'New Orangutan Arrival', description: 'A young orangutan has been rescued and brought to the center.' },
      { title: 'Volunteer Program Update', description: 'New opportunities to volunteer with the Wildlife Center.' },
      { title: 'Conservation Achievements', description: 'Celebrating our success in protecting endangered species.' }
    ]);
  }, []);

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
      {/* Hero Section with Auto-scrolling Carousel */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
         <Carousel autoplay>
          <div style={{ backgroundColor: 'red', height: '60vh' }}></div>
          <div style={{ backgroundColor: 'blue', height: '60vh' }}></div>
          <div style={{ backgroundColor: 'green', height: '60vh' }}></div>
        </Carousel>
        
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
          {[{
            title: "Interactive Map",
            description: "Explore our interactive map to learn about various habitats.",
            imgSrc: "/src/assets/map.png",
            buttonText: "Explore",
            linkTo: "#"
          }, {
            title: "Feeding Sessions",
            description: "Watch orangutans during meal times. Book your slot!",
            imgSrc: "/src/assets/visit1.jpg",
            buttonText: "Schedule",
            linkTo: "/bookings"
          }, {
            title: "Educational Resources",
            description: "Learn how you can contribute to conservation efforts.",
            imgSrc: "/src/assets/visit2.jpg",
            buttonText: "Support",
            linkTo: "/support"
          }].map((item) => (
            <Col xs={24} sm={12} md={8} key={item.title}>
              <motion.div variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card
                  hoverable
                  className="discover-card"
                  cover={<img alt={item.title} src={item.imgSrc} />}
                >
                  <Card.Meta 
                    title={item.title} 
                    description={item.description}
                  />
                  <Link to={item.linkTo}>
                    <Button type="primary" icon={<EnvironmentOutlined />} block>
                      {item.buttonText}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>

      {/* News and Admission Info Section */}
      <div className="info-section">
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="news-card bordered-card" title={<><NotificationOutlined /> Latest News</>} bordered={true}>
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

          <Col xs={24} md={12}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card title="Admission Info" className="admission-card bordered-card" bordered={true}>
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
