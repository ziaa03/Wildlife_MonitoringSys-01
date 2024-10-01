import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'; // For button icon
import './styles.css';

const LAPTOP_IP = 'cos30045.xyz'; // Your laptop's IP address

const { Title } = Typography;

const LoginScreen = () => {
  const navigate = useNavigate(); // Use navigate for routing

  const handleLogin = (values) => {
    const { username, password } = values;

    fetch(`https://${LAPTOP_IP}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
        user_password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.login) { // Check for data.login
          message.success('Login successful');
          navigate('/about');
        } else {
          message.error(data.message || 'Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        message.error('Failed to connect to the server. Please try again later.');
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <Title level={2} className="login-title">
          Semenggoh Wildlife Centre
        </Title>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleLogin}
          className="login-form"
        >
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<ArrowRightOutlined />}
              block
              className='login-button'
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* Additional Options */}
        <div className="other-buttons">
          <Button type="link" className="forgot-password">
            Forgot Password?
          </Button>
          <Button type="link" className="register-button">
            Create an Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;