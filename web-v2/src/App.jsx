import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Spin, ConfigProvider } from 'antd'; // Import Ant Design components
import 'antd/dist/reset.css'; // Reset Ant Design styles for consistency
import LandingPage from './landing-page';
import LoginScreen from './login-page';
import MainLayout from './main-layout';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import PoacherAlertSystem from './alert-system';
import BookingsPage from './bookings';
import SupportPage from './support-page';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load Google Fonts dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Simulate font loading (replace with actual logic if needed)
    setTimeout(() => setFontsLoaded(true), 1000);
  }, []);

  if (!fontsLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" /> {/* Center the loader */}
      </div>
    );
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#52c41a' } }}> {/* ConfigProvider for global theme customization */}
      <Router>
        <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/about" element={<LandingPage />} />
          <Route path="/alerts" element={<PoacherAlertSystem />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
        </MainLayout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
