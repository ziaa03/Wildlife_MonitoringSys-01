import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import ProfilePage from './profile-page';
import LandingPage from './landing-page';
import DiscoverPage from './discover-page';
import MapScreen from './map-screen';
import EducationalContent from './educational-content';
import DonationPage from './donation-page';
import SettingsPage from './settings-page';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'NexaTextDemo-Bold': require('./assets/fonts/NexaTextDemo-Bold.ttf'),
        'NexaTextDemo-Light': require('./assets/fonts/NexaTextDemo-Light.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or return a loading spinner here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Discover" component={DiscoverPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="EducationalContent" component={EducationalContent} />
        <Stack.Screen name="DonationPage" component={DonationPage} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
