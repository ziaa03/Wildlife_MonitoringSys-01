// TO DO:
// this will be the first page --> home in sidebar nav 
// try to display the pfp from the profile page on all pages (DONE)
// allow scrolling for the images displayed (DONE)
// fix navigation to other pages (!!) --> nested navigationContainer error (DONE)
// 'Your bookings' navigates to Bookings and 'Learn More' button navigates to VisitDetails page but not implemented yet (!)

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ImageBackground, Image, FlatList, Dimensions, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './sidebar-nav';
import Header from './header-nav';

// Import images
import plant01 from './assets/plant-01.jpeg';
import latest from './assets/latest.jpg';
import visit1 from './assets/visit1.jpg';
import visit2 from './assets/visit2.jpg';
import visit3 from './assets/visit3.jpeg';
import profilePlaceholder from './assets/profile-placeholder.jpg';


FSDFJEOJ
const tasks = {
  'Flora Identification': {
    description: 'Identify different types of plants and trees as you explore the trail.',
    imageUrl: plant01, 
  },
  'Fauna Trivia': {
    description: 'Answer wildlife trivia questions as you spot different animals.',
    imageUrl: plant01, 
  },
};

const { width } = Dimensions.get('window');

const heroImages = [
  { id: '1', source: latest, title: 'Semenggoh Wildlife Centre', navigateTo: 'Discover' },
  { id: '2', source: plant01, title: 'Wildlife Trivia Challenge', navigateTo: 'TrailHunt' },
];

const visitImages = [
  visit1,
  visit2,
  visit3
];

const LandingPage = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentVisitIndex, setCurrentVisitIndex] = useState(0);
  const heroFlatListRef = useRef(null);
  const visitFlatListRef = useRef(null);
  const scrollIntervalRef = useRef(null); // Ref for the interval ID

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // object to customize the criteria for determining which items are considered viewable - 50% of the item must be visible to be considered viewable
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // lets the app know which image is currently in view - updates the currentIndex state
  const onHeroViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentHeroIndex(viewableItems[0].index);
    }
  }, []);

  const onVisitViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVisitIndex(viewableItems[0].index);
    }
  }, []);

  const renderHeroItem = ({ item }) => (
    <View style={styles.heroSectionWrapper}>
      <ImageBackground source={item.source} style={styles.heroSection}>
        <View style={styles.heroOverlay}>
          <Text style={styles.title}>{item.title}</Text>
          {item.title === 'Wildlife Trivia Challenge' ? (
            <Pressable style={styles.triviaButton} onPress={() => navigation.navigate(item.navigateTo)}>
              <Text style={styles.triviaButtonText}>
                Start Trivia <FontAwesome5 name="arrow-right" size={16} color="#fff" />
              </Text>
            </Pressable>
          ) : (
            <Pressable style={styles.button} onPress={() => navigation.navigate(item.navigateTo)}>
              <Text style={styles.buttonText}>
                Discover <FontAwesome5 name="arrow-right" size={16} color="#fff" />
              </Text>
            </Pressable>
          )}
        </View>
      </ImageBackground>
    </View>
  );

  const scrollAutomatically = () => {
    // Clear any existing interval
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }

    // Set up a new interval to scroll automatically
    scrollIntervalRef.current = setInterval(() => {
      setCurrentHeroIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % heroImages.length;
        heroFlatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000); // Change this value for the scroll interval
  };

  useEffect(() => {
    scrollAutomatically();
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  const renderDot = (index, currentIndex) => (
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
        profileImageSource={profilePlaceholder} 
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
       {/* hero sections with flatlist scrolling (automated) */}
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={heroImages}
        renderItem={renderHeroItem}
        keyExtractor={item => item.id}
        onViewableItemsChanged={onHeroViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.heroSectionContainer}
        ref={heroFlatListRef}
      />

      <View style={styles.scrollContent}>
        {/* other sections */}
        <View style={styles.dotsContainer}>
          {heroImages.map((_, index) => renderDot(index, currentHeroIndex))}
        </View>
      </View>

        {/* welcome message */}
        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Welcome to Semenggoh Wildlife Centre</Text>
          <Text style={styles.sectionText}>
            The Semenggoh Wildlife Centre is a sanctuary for orangutans in Borneo. Established in 1975, the centre is dedicated to the rehabilitation of orangutans that have been injured, orphaned, or rescued from captivity. The centre is located within the Semenggoh Nature Reserve, a protected rainforest area.
          </Text>
        </View>

        {/* other buttons - map and bookings? */}
        <View style={styles.iconSection}>
          <Pressable onPress={() => navigation.navigate('MapScreen')} style={styles.iconButton}>
            <FontAwesome5 name="map-marker-alt" size={28} color="#00695C" />
            <Text style={styles.iconText}>Interactive Map</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Bookings')} style={styles.iconButton}>
            <FontAwesome5 name="calendar-check" size={28} color="#00695C" />
            <Text style={styles.iconText}>Bookings</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('DonationPage')} style={styles.iconButton}>
            <FontAwesome5 name="heart" size={28} color="#00695C" />
            <Text style={styles.iconText}>Donations</Text>
          </Pressable>
        </View>

        <View style={[styles.lineSeparator, { marginBottom: 25 }]} />

        {/* plan your visit section with scrollable images */}
        <View style={styles.horizontalSection}>
          <Text style={styles.sectionTitle}>Plan Your Visit</Text>
          <Text style={styles.sectionText}>
            Located in Borneo's stunning Semenggoh Nature Reserve. Learn about the best times to visit and what to expect.
          </Text>
          <FlatList
            ref={visitFlatListRef}
            horizontal
            data={visitImages}
            renderItem={({ item }) => (
              <View style={styles.imageCard}>
                <Image source={item} style={styles.image} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onViewableItemsChanged={onVisitViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            snapToInterval={Dimensions.get('window').width}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.dotsContainer}>
            {visitImages.map((_, index) => renderDot(index, currentVisitIndex))}
          </View>
          <Pressable style={styles.visitPlanning} onPress={() => navigation.navigate('VisitDetails')}>   
            <Text style={styles.visitPlanningText}>Learn More</Text>
          </Pressable>
        </View>

        <View style={styles.lineSeparator} />

        {/* visitation information */}
        <View style={styles.textSection}>
          <Text style={styles.sectionTitle}>Visitation Information</Text>
          <Text style={styles.sectionText}>Off Jalan Puncak Borneo, 93250 Siburan</Text>
          <Text style={styles.sectionText}>Phone: 082-618 325</Text>
          <Text style={styles.sectionText}>Open Daily: 8am - 4:30pm</Text>
          <Pressable style={styles.mapButton} onPress={() => Linking.openURL('https://www.semenggohwildlife.org')}>
            <Text style={styles.mapButtonText}>View on Map</Text>
          </Pressable>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Semenggoh Wildlife Centre</Text>
          <View style={styles.footerLinks}>
            <Pressable onPress={() => Linking.openURL('mailto:info@semenggohwildlife.org')}>
              <Text style={styles.footerLink}>Contact</Text>
            </Pressable>
            <Text style={styles.footerDivider}>|</Text>
            <Pressable onPress={() => Linking.openURL('https://sarawakforestry.com/semenggoh-nature-reserve/')}>
              <Text style={styles.footerLink}>Website</Text>
            </Pressable>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  heroSectionContainer: {
    flexDirection: 'row',
  },
  heroSectionWrapper: {
    width: width,
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
    textShadow: '1px 1px 1px #000',
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
  triviaButton: {
    backgroundColor: 'rgba(0, 77, 64, 0.8)',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  triviaButtonText: {
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
  activityButton: {
    backgroundColor: 'rgba(0, 77, 64, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 15,
  },
  activityButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
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
  visitPlanning: {
    backgroundColor: 'rgba(0, 77, 64, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 15,
  },
  visitPlanningText: {
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