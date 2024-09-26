import React from 'react';
import { Layout, Button } from 'antd';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'; // Make sure to add your logo file

const { Header } = Layout;

const CustomHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <Header style={{ 
      background: '#ffffff', 
      padding: '0 50px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button 
          type="text" 
          icon={<Menu size={24} />} 
          onClick={onMenuClick}
          style={{ marginRight: '20px' }}
        />
        <img src={logo} alt="Semenggoh Wildlife Centre" style={{ height: '40px' }} />
      </div>
      <nav>
        <Button type="link" onClick={() => navigate('/map')}>Interactive Map</Button>
        <Button type="link" onClick={() => navigate('/bookings')}>Bookings</Button>
        <Button type="link" onClick={() => navigate('/donation')}>Donations</Button>
      </nav>
    </Header>
  );
};

export default CustomHeader;