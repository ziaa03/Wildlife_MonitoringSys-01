import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: "https://images4.alphacoders.com/987/987880.jpg" }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Semenggoh Wildlife Centre</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainNavigator')}>
            <Text style={styles.buttonText}>Explore <FontAwesome name="arrow-right" size={16} color="#fff" /></Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Feature Highlights */}
      <View style={styles.featuresContainer}>
        <FeatureCard icon="paw" title="Wildlife Monitoring" description="Track and view real-time wildlife data." />
        <FeatureCard icon="map" title="Interactive Map" description="Navigate the reserve with ease." />
        <FeatureCard icon="info-circle" title="Visitor Info" description="Get all the details you need to plan your visit." />
      </View>

      {/* Plan Your Visit */}
      <View style={styles.visitSection}>
        <Text style={styles.sectionTitle}>Plan Your Visit</Text>
        <Text style={styles.sectionText}>
          Located in the Semenggoh Nature Reserve, the Semenggoh Wildlife Centre is the premier destination to see orangutans in Malaysia. 
          A trip to Borneo isn't complete without viewing these majestic creatures up close. Discover the best times to visit and what to expect.
        </Text>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('VisitDetails')}>
          <Text style={styles.ctaButtonText}>Learn More</Text>
        </TouchableOpacity>
      </View>

      {/* Visitation Information */}
      <View style={styles.visitationSection}>
        <Text style={styles.sectionTitle}>Visitation Information</Text>
        <Text style={styles.sectionText}>Off To Jalan Puncak Borneo 93250 Siburan · 13 km</Text>
        <Text style={styles.sectionText}>Phone: 082-618 325</Text>
        <Text style={styles.sectionText}>Open: Everyday 8am - 4:30pm</Text>
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
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <View style={styles.featureCard}>
    <FontAwesome name={icon} size={40} color="#007f66" />
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  backgroundImage: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageStyle: {
    opacity: 0.8,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007f66',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#007f66',
    fontFamily: 'Poppins-Bold',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  visitSection: {
    padding: 20,
    backgroundColor: '#e6f7f1',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#007f66',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#007f66',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  visitationSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  mapButton: {
    marginTop: 10,
    backgroundColor: '#007f66',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    backgroundColor: '#007f66',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  footerLink: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginVertical: 5,
  },
});

export default LandingPage;
