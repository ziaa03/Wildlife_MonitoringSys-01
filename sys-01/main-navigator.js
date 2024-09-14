// MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ProfilePage from './ProfilePage';
import MainLayout from './MainLayout';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Home Screen */}
      <Stack.Screen name="Home">
        {(props) => (
          <MainLayout {...props} title="Home">
            <HomeScreen />
          </MainLayout>
        )}
      </Stack.Screen>

      {/* Profile Screen */}
      <Stack.Screen name="Profile">
        {(props) => (
          <MainLayout {...props} title="Profile">
            <ProfilePage />
          </MainLayout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNavigator;
