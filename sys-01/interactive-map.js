import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Sidebar from './sidebar-nav';
import { useNavigation } from '@react-navigation/native';
import Header from './header-nav';
import MapboxGL from '@rnmapbox/maps';

// MapboxGL.setAccessToken('pk.eyJ1Ijoic3RldmU5ODg3IiwiYSI6ImNtMXcxcnpxMjA3aHAycXM5OW5sa2d4bjcifQ.jqGSbtXP52xYvXyKl_5t3A');

const InteractiveMap = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <View style={styles.container}>
      <Header 
        onMenuPress={toggleSidebar} 
        profileImageSource={require('./assets/profile-placeholder.jpg')} 
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Interactive Map</Text>
      </View>

    <View style={styles.container}>
      <Header onMenuPress={toggleSidebar} profileImageSource={require('./assets/profile-placeholder.jpg')} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Interactive Map</Text>
        <View style={styles.mapContainer}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera zoomLevel={12} centerCoordinate={[longitude, latitude]} /> {/* Replace with your coordinates */}
          </MapboxGL.MapView>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  headerTitle: {
    color: 'black',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});

export default InteractiveMap;