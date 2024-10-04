import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Form, Input, DatePicker, InputNumber, Select, Space } from 'antd';
import { CalendarOutlined, TeamOutlined, DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const BookingsPage = () => {
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    setHeroImage('/src/assets/booking-page.jpg');
  }, []);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Here you would typically send the booking data to your backend
  };

  return (
    <div className="booking-page">
      <div className="hero-section" style={{backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '50vh'}}>
        <div className="hero-overlay">
          <Row gutter={0} align="middle" justify="center" className="hero-content">
            <Col xs={24} md={16} style={{ textAlign: 'center' }}>
              <Title level={1} style={{ color: 'white' }}>Book Your Visit to Semenggoh Wildlife Centre</Title>
              <Paragraph style={{ color: 'white' }}>
                Experience the wonders of Borneo's wildlife and contribute to orangutan conservation.
              </Paragraph>
            </Col>
          </Row>
        </div>
      </div>

      <div className="booking-section" style={{ padding: '40px 0' }}>
        <Row justify="center">
          <Col xs={24} md={16}>
            <Card title={<Space><CalendarOutlined /> Book Your Visit</Space>} className="booking-card">
              <Form name="booking_form" onFinish={onFinish} layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="date" label="Visit Date" rules={[{ required: true, message: 'Please select a date' }]}>
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="time" label="Preferred Time" rules={[{ required: true, message: 'Please select a time' }]}>
                      <Select placeholder="Select time">
                        <Option value="morning">Morning (9:00 AM - 10:00 AM)</Option>
                        <Option value="afternoon">Afternoon (3:00 PM - 4:00 PM)</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="adults" label="Number of Adults" rules={[{ required: true, message: 'Please enter number of adults' }]}>
                      <InputNumber min={1} max={10} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="children" label="Number of Children (6-17 years)">
                      <InputNumber min={0} max={10} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="nationality" label="Nationality" rules={[{ required: true, message: 'Please select your nationality' }]}>
                  <Select placeholder="Select nationality">
                    <Option value="malaysian">Malaysian</Option>
                    <Option value="foreign">Foreign</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your full name' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<CalendarOutlined />} size="large" block>
                    Book Now
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="info-section" style={{ background: '#f0f2f5', padding: '40px 0' }}>
        <Row justify="center">
          <Col xs={24} md={16}>
            <Card title={<Space><InfoCircleOutlined /> Admission Information</Space>} className="info-card">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Card type="inner" title="Malaysian Citizens">
                    <Paragraph><TeamOutlined /> Adults: RM5</Paragraph>
                    <Paragraph><TeamOutlined /> Children (6-17): RM2</Paragraph>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card type="inner" title="Malaysian Citizens">
                    <Paragraph><TeamOutlined /> Adults: RM5</Paragraph>
                    <Paragraph><TeamOutlined /> Children (6-17): RM2</Paragraph>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card type="inner" title="Foreign Visitors">
                    <Paragraph><TeamOutlined /> Adults: RM10</Paragraph>
                    <Paragraph><TeamOutlined /> Children (6-17): RM5</Paragraph>
                  </Card>
                </Col>
              </Row>
              <Paragraph style={{ marginTop: '20px' }}>
                <DollarOutlined /> Payment is to be made at the entrance. Please bring exact change if possible.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Additional Information */}
      <div className="additional-info" data-scroll-section style={{ background: '#f0f2f5', padding: '40px 0' }}>
        <Row justify="center">
          <Col xs={24} md={16}>
            <Card title={<Space><InfoCircleOutlined /> Important Information</Space>} className="info-card">
              <Paragraph>
                - Visiting hours are from 8:30 AM to 4:30 PM daily.<br />
                - Feeding sessions are conducted twice daily, at 9:00 AM and 3:00 PM.<br />
                - Please arrive at least 30 minutes before the feeding time.<br />
                - Wear comfortable clothes and shoes suitable for jungle trekking.<br />
                - Bring insect repellent and drinking water.<br />
                - Photography is allowed, but please do not use flash.<br />
                - For the safety of visitors and orangutans, please follow all guidelines provided by the staff.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BookingsPage;