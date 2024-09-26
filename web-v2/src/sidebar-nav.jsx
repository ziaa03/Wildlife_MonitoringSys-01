import React, { useEffect } from 'react';
import { Menu, Drawer } from 'antd';
import { HomeOutlined, CompassOutlined, QuestionCircleOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle any side effects when isOpen changes
  }, [isOpen]);

  const handleMenuClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <Drawer
      title="Menu"
      placement="left"
      onClose={onClose}
      visible={isOpen}
      bodyStyle={{ padding: 0 }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => handleMenuClick('/landing')}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<CompassOutlined />} onClick={() => handleMenuClick('/discover')}>
          Discover
        </Menu.Item>
        <Menu.Item key="3" icon={<QuestionCircleOutlined />} onClick={() => handleMenuClick('/trailhunt')}>
          Challenges
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4" icon={<UserOutlined />} onClick={() => handleMenuClick('/profile')}>
          Profile
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />} onClick={() => handleMenuClick('/settingspage')}>
          Settings
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

export default Sidebar;
