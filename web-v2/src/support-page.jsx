import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, InputNumber, List, Avatar, Collapse } from 'antd';
import { DollarOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const SupportPage = () => {
  const [donationAmount, setDonationAmount] = useState(50);
  const [totalRaised, setTotalRaised] = useState(75000);
  const [goalAmount] = useState(100000);
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    setTopDonors([
      { name: 'John Doe', amount: 1000 },
      { name: 'Jane Smith', amount: 750 },
      { name: 'Bob Johnson', amount: 500 },
    ]);
  }, []);

  const handleDonate = () => {
    setTotalRaised(prevTotal => prevTotal + donationAmount);
    alert(`Thank you for your donation of $${donationAmount}!`);
  };

  const educationalResources = [
    {
      title: 'Responsible Tourism',
      type: 'Content',
      link: '/resources/Responsible-Tourism-Guide'
    },
    {
      title: 'Wildlife Education',
      type: 'Content',
      link: '/resources/Borneo-Wildlife-Content'
    },
  ];

  return (
    <div className="donations-page">
      <div className="support-hero-section" style={{backgroundImage: `url('/src/assets/bridge.jpg')`}}>
        <div className="support-hero-overlay">
          <Row gutter={0} align="middle" className="hero-content">
            <Col xs={24} md={12}>
              <div className="support-hero-text">
                <Title level={2}>Explore the wonders of our wildlife centre and Support Our Conservation Efforts</Title>
                <Paragraph>
                  Your donation helps us protect and rehabilitate Borneo's endangered wildlife, especially orangutans.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="donation-section">
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={12}>
            <Card title="Make a Donation" className="donation-card">
              <InputNumber
                min={1}
                max={10000}
                defaultValue={50}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={setDonationAmount}
                style={{ width: '100%', marginBottom: '20px' }}
              />
              <Button type="primary" icon={<DollarOutlined />} onClick={handleDonate} block>
                Donate Now
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="top-donors-section">
        <Card title="Top Donors" className="top-donors-card">
          <List
            itemLayout="horizontal"
            dataSource={topDonors}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.name}
                  description={`Donated $${item.amount}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      <div className="education-section">
        <Title level={2} className="education-section-title">Educational Resources</Title>
        <Paragraph>
          Learn more about our conservation efforts and the wildlife we protect with these resources:
        </Paragraph>
        <Collapse>
          {educationalResources.map((resource, index) => (
            <Panel 
              header={
                <span>
                  {resource.title} - {resource.type}
                </span>
              } 
              key={index}
            >
              <p>{resource.title} provides valuable information about our conservation efforts.</p>
              <Button type="primary" href={resource.link} target="_blank">
                Access Resource
              </Button>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default SupportPage;