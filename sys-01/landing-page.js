import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image, FlatList, Dimensions } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './sidebar-nav';
import MapView, { Marker } from 'react-native-maps';  // Import MapView
import Header from './header-nav';

const LandingPage = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
    console.log('Navigating to Profile');
  };

  const landingPageImage = require('./assets/latest.jpg');
  const visitImages = [
    require('./assets/visit1.jpg'),
    require('./assets/visit2.jpg'),
    require('./assets/visit3.jpeg')
  ];

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const renderDot = (index) => (
    <View
      key={index}
      style={[
        styles.dot,
        {
          backgroundColor: currentIndex === index ? '#00695C' : '#CCC',
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <Header 
        onMenuPress={toggleSidebar} 
        onProfilePress={() => {}}
        profileImageSource={require('./assets/profile-placeholder.jpg')} 
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section with Image Background */}
        <View style={styles.heroSectionWrapper}>
          <ImageBackground
            source={landingPageImage}
            style={styles.heroSection}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.title}>Semenggoh Wildlife Centre</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Discover')}>
                <Text style={styles.buttonText}>
                  Discover <FontAwesome5 name="arrow-right" size={16} color="#fff" />
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Welcome Message */}
        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Welcome to Semenggoh Wildlife Centre</Text>
          <Text style={styles.sectionText}>
            The Semenggoh Wildlife Centre is a sanctuary for orangutans in Borneo. Established in 1975, the centre is dedicated to the rehabilitation of orangutans that have been injured, orphaned, or rescued from captivity. The centre is located within the Semenggoh Nature Reserve, a protected rainforest area.
          </Text>
        </View>

        {/* Interactive Map and Bookings Section */}
        <View style={styles.iconSection}>
          <TouchableOpacity onPress={() => navigation.navigate('MapScreen')} style={styles.iconButton}>
            <FontAwesome5 name="map-marker-alt" size={28} color="#00695C" />
            <Text style={styles.iconText}>Interactive Map</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Bookings')} style={styles.iconButton}>
            <FontAwesome5 name="calendar-check" size={28} color="#00695C" />
            <Text style={styles.iconText}>Your Bookings</Text>
          </TouchableOpacity>
        </View>

        {/* Separator Line */}
        <View style={[styles.lineSeparator, { marginBottom: 25 }]} />

        {/* Plan Your Visit Section (Horizontal Scroll with Images) */}
        <View style={styles.horizontalSection}>
          <Text style={styles.sectionTitle}>Plan Your Visit</Text>
          <Text style={styles.sectionText}>
            Located in Borneo's stunning Semenggoh Nature Reserve. Learn about the best times to visit and what to expect.
          </Text>
          <FlatList
            ref={flatListRef}
            horizontal
            data={visitImages}
            renderItem={({ item, index }) => (
              <View style={styles.imageCard}>
                <Image source={item} style={styles.image} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            snapToInterval={Dimensions.get('window').width}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.dotsContainer}>
            {visitImages.map((_, index) => renderDot(index))}
          </View>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('VisitDetails')}>
            <Text style={styles.ctaButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Separator Line */}
        <View style={styles.lineSeparator} />

        {/* Visitation Information (Text Only) */}
        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Visitation Information</Text>
          <Text style={styles.sectionText}>Off Jalan Puncak Borneo, 93250 Siburan</Text>
          <Text style={styles.sectionText}>Phone: 082-618 325</Text>
          <Text style={styles.sectionText}>Open Daily: 8am - 4:30pm</Text>
          <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate('Discover')}>
            <Text style={styles.mapButtonText}>View on Map</Text>
          </TouchableOpacity>
        </View>

        {/* Footer inside ScrollView */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Semenggoh Wildlife Centre</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:info@semenggohwildlife.org')}>
              <Text style={styles.footerLink}>Contact</Text>
            </TouchableOpacity>
            <Text style={styles.footerDivider}>|</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.semenggohwildlife.org')}>
              <Text style={styles.footerLink}>Website</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  profileButton: {
    // You can adjust padding if needed
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Added to avoid footer being cut off
  },
  heroSectionWrapper: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  heroSection: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: 'rgba(0, 77, 64, 0.8)',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  mapSection: {
    marginVertical: 20,
    height: 250,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapButton: {
    backgroundColor: '#00695C',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  mapButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  horizontalSection: {
    marginBottom: 20,
  },
  horizontalScrollView: {
    paddingHorizontal: 20,
  },
  imageCard: {
    width: Dimensions.get('window').width,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  lineSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textSection: {
    padding: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#00695C',
    marginBottom: 14,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    textAlign: 'center',
    marginBottom: 15,
  },
  ctaButton: {
    backgroundColor: 'rgba(0, 77, 64, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 15,
  },
  ctaButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  mapButton: {
    marginTop: 15,
    backgroundColor: 'rgba(0, 77, 64, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  mapButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  iconSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#00695C',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    padding: 5,
  },
  footerDivider: {
    color: '#FFF',
    paddingHorizontal: 10,
  },
});

export default LandingPage;
