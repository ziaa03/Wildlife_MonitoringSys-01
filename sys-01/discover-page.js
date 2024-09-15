import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Sidebar from './sidebar-nav';
import { useNavigation } from '@react-navigation/native';
import Header from './header-nav';

const FeatureCard = ({ icon, title, description, imageUrl, onPress }) => (
  <TouchableOpacity activeOpacity={0.8} style={styles.featureCard} onPress={onPress}>
    <Image source={imageUrl} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color="#00695C" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
      <FontAwesome name="chevron-right" size={20} color="#00695C" style={styles.arrowIcon} />
    </View>
  </TouchableOpacity>
);

const DiscoverPage = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
    console.log('Navigating to Profile');
  };

  const features = [
    {
      icon: 'eye-outline',
      title: 'Latest Sightings',
      description: 'Real-time wildlife updates',
      imageUrl: require('./assets/latest.jpg'),
      navigateTo: 'LatestSightings',
    },
    {
      icon: 'book-outline',
      title: 'Learn',
      description: 'Educational resources',
      imageUrl: require('./assets/semenggoh.jpg'),
      navigateTo: 'EducationalContent',
    },
    {
      icon: 'heart-outline',
      title: 'Donate',
      description: 'Support wildlife protection',
      imageUrl: require('./assets/orangutan-cute.jpg'),
      navigateTo: 'DonationPage',
    },
  ];

  return (
    <View style={styles.container}>
      <Header 
        onMenuPress={toggleSidebar} 
        onProfilePress={() => {}}
        profileImageSource={require('./assets/profile-placeholder.jpg')} 
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Discover Wildlife</Text>
        <FlatList
          data={features}
          renderItem={({ item }) => (
            <FeatureCard 
              {...item} 
              onPress={() => navigation.navigate(item.navigateTo)}
            />
          )}
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
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 15,
    marginTop: 20,
  },
  menuButton: {
    marginRight: 16,
  },
  headerSpacer: {
    flex: 1,
  },
  headerTitle: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  listContainer: {
    padding: 16,
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
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    color: '#00695C',
    fontFamily: 'Poppins-Bold',
  },
  featureDescription: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'Poppins-SemiBold',
  },
  arrowIcon: {
    marginLeft: 16,
  },
});

export default DiscoverPage;