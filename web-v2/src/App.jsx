import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Spin, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import LandingPage from './landing-page';
import LoginScreen from './login-page';
import MainLayout from './main-layout';
import PoacherAlertSystem from './alert-system';
import BookingsPage from './bookings';
import SupportPage from './support-page';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load Google Fonts dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    link.onload = () => setFontsLoaded(true);

    // Fallback in case the font doesn't load
    setTimeout(() => setFontsLoaded(true), 3000);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  if (!fontsLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#52c41a' } }}>
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