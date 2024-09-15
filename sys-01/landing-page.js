import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, ImageBackground } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './sidebar-nav';

const LandingPage = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const landingPageImage = require('./assets/latest.jpg');

  const handleProfilePress = () => {
    navigation.navigate('Profile');
    console.log('Navigating to Profile');
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
          <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <FontAwesome name="user-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainNavigator')}>
                <Text style={styles.buttonText}>
                  Discover <FontAwesome5 name="arrow-right" size={16} color="#fff" />
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/*Welcome Message*/}
        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Welcome to Semenggoh Wildlife Centre</Text>
          <Text style={styles.sectionText}>
            The Semenggoh Wildlife Centre is a sanctuary for orangutans in Borneo. Established in 1975, the centre is dedicated to the rehabilitation of orangutans that have been injured, orphaned, or rescued from captivity. The centre is located within the Semenggoh Nature Reserve, a protected rainforest area.
          </Text>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <FeatureCard icon="map-marked-alt" title="Interactive Map" />
          <FeatureCard icon="info-circle" title="Your Bookings" />
        </View>

        {/* Plan Your Visit */}
        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Plan Your Visit</Text>
          <Text style={styles.sectionText}>
            Discover the Semenggoh Wildlife Centre, located in Borneo's stunning Semenggoh Nature Reserve. Learn about the best times to visit and what to expect.
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('VisitDetails')}>
            <Text style={styles.ctaButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Visitation Information */}
        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Visitation Information</Text>
          <Text style={styles.sectionText}>Off Jalan Puncak Borneo, 93250 Siburan</Text>
          <Text style={styles.sectionText}>Phone: 082-618 325</Text>
          <Text style={styles.sectionText}>Open Daily: 8am - 4:30pm</Text>
          <TouchableOpacity style={styles.mapButton} onPress={() => Linking.openURL('https://www.google.com/maps/place/Semenggoh+Wildlife+Centre')}>
            <Text style={styles.mapButtonText}>View on Map</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Semenggoh Wildlife Centre</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:info@semenggohwildlife.org')}>
            <Text style={styles.footerLink}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.semenggohwildlife.org')}>
            <Text style={styles.footerLink}>Visit Our Website</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const FeatureCard = ({ icon, title }) => (
  <View style={styles.featureCard}>
    <FontAwesome5 name={icon} size={24} color="#00695C" />
    <Text style={styles.featureTitle}>{title}</Text>
  </View>
);

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
  scrollContent: {
    paddingBottom: 50,
  },
  heroSectionWrapper: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  heroSection: {
    height: 350, // Increased height for better impact
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
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
    backgroundColor: 'rgba(0, 77, 64, 0.8)', // Semi-transparent button
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
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 20,
  },
  featureCard: {
    alignItems: 'center',
    width: '45%',
  },
  featureTitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#00695C',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    fontFamily: 'Poppins-Regular',
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
  lineSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  ctaButton: {
    backgroundColor: '#00695C',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  ctaButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  mapButton: {
    marginTop: 15,
    backgroundColor: '#00695C',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  mapButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  footer: {
    backgroundColor: '#00695C',
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  footerLink: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginVertical: 6,
  },
});

export default LandingPage;