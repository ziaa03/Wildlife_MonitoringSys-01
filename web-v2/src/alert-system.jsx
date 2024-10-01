import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, List, Badge, Space, Modal } from 'antd';
import { AlertOutlined, CameraOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AdminPoacherAlertSystem = () => {
  const [alerts, setAlerts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // SIMULATED ALERT - GENERATES A NEW ALERT EVERY 10 SECONDS
  useEffect(() => {
    // Simulating incoming alerts from camera traps
    const simulateAlerts = () => {
      const newAlert = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        location: `Zone ${Math.floor(Math.random() * 5) + 1}`,
        imageUrl: `/api/placeholder/400/300?text=Camera+Trap+Image`,
        status: 'New'
      };
      setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
    };

    const intervalId = setInterval(simulateAlerts, 10000); // New alert every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedAlert(null);
  };

  const handleDispatchResponse = () => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === selectedAlert.id ? { ...alert, status: 'Responded' } : alert
      )
    );
    handleModalClose();
  };

  return (
    <div className="admin-poacher-alert-system">
      <Row justify="center" style={{ padding: '20px 0' }}>
        <Col xs={24} md={20}>
          <Title level={1}>Poacher Alert System</Title>
          <Paragraph>
            Monitor and respond to real-time alerts from camera traps detecting potential poacher activity.
          </Paragraph>
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={24} md={20}>
          <Card title={<Space><AlertOutlined /> Live Alerts</Space>} extra={<Badge count={alerts.filter(a => a.status === 'New').length} />}>
            <List
              itemLayout="horizontal"
              dataSource={alerts}
              renderItem={alert => (
                <List.Item 
                  key={alert.id}
                  actions={[<Button type="primary" onClick={() => handleAlertClick(alert)}>View Details</Button>]}
                >
                  <List.Item.Meta
                    avatar={<CameraOutlined style={{ fontSize: '24px', color: alert.status === 'New' ? '#ff4d4f' : '#52c41a' }} />}
                    title={`Alert from ${alert.location}`}
                    description={
                      <Space direction="vertical">
                        <Text>Timestamp: {alert.timestamp}</Text>
                        <Text>Status: <Badge status={alert.status === 'New' ? 'error' : 'success'} text={alert.status} /></Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Alert Details"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
          <Button key="dispatch" type="primary" onClick={handleDispatchResponse}>
            Dispatch Response Team
          </Button>,
        ]}
      >
        {selectedAlert && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <img src={selectedAlert.imageUrl} alt="Camera Trap" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
            <Text strong>Location: {selectedAlert.location}</Text>
            <Text>Timestamp: {selectedAlert.timestamp}</Text>
            <Text>Status: <Badge status={selectedAlert.status === 'New' ? 'error' : 'success'} text={selectedAlert.status} /></Text>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default AdminPoacherAlertSystem;