// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Sidebar from './sidebar-nav'; // Import Sidebar component

const FeatureCard = ({ icon, title, description, imageUrl }) => (
  <TouchableOpacity activeOpacity={0.8} style={styles.featureCard}>
    <Image source={imageUrl} style={styles.cardImage} />
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.8)']}
      style={styles.gradient}
    >
      <View style={styles.cardContent}>
        <Ionicons name={icon} size={28} color="#ffffff" />
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const features = [
    {
      icon: 'eye-outline',
      title: 'Latest Sightings',
      description: 'Real-time wildlife updates',
      imageUrl: require('./assets/latest.jpg'),
    },
    {
      icon: 'book-outline',
      title: 'Learn',
      description: 'Educational resources',
      imageUrl: require('./assets/semenggoh.jpg'),
    },
    {
      icon: 'heart-outline',
      title: 'Donate',
      description: 'Support wildlife protection',
      imageUrl: require('./assets/orangutan-cute.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discover Wildlife</Text>
      </View>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <View style={styles.content}>
        <FlatList
          data={features}
          renderItem={({ item }) => <FeatureCard {...item} />}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    marginTop: 20,
  },
  menuButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    padding: 20,
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: 16,
  },
  featureTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 8,
    fontFamily: 'Poppins-Bold',
  },
  featureDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    fontFamily: 'Poppins-Regular',
  },
});

export default HomeScreen;
