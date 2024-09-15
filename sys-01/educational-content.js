import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './sidebar-nav';
import Header from './header-nav';

const EducationalContent = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const toggleSection = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === index ? null : index);
  };

  const sections = [
    {
      title: 'Responsible Tourism',
      icon: 'leaf',
      content: 'Learn how to be a responsible visitor and minimize your impact on the environment.',
      details: `Responsible tourism at Semenggoh Wildlife Centre involves:
      
      • Maintaining a safe distance from orangutans
      • Not feeding the animals
      • Staying quiet during observation
      • Following designated paths
      • Properly disposing of waste
      • Supporting local conservation efforts
      • Respecting park rules and regulations
      
      By practicing responsible tourism, you help protect the orangutans and their habitat.`
    },
    {
      title: 'Wildlife Education',
      icon: 'paw',
      content: 'Discover the diverse species that call Semenggoh Wildlife Centre home.',
      details: `Semenggoh Wildlife Centre is home to various species, including:
      
      • Orangutans: The star attraction, with over 20 individuals
      • Gibbons: Small, acrobatic apes
      • Hornbills: Large, colorful birds with distinctive beaks
      • Sun Bears: The world's smallest bear species
      • Crocodiles: Found in the centre's rivers and streams
      
      Learn about their behaviors, habitats, and conservation status during your visit.`
    },
    {
      title: 'Conservation Efforts',
      icon: 'tree',
      content: 'Explore our ongoing conservation projects and how you can contribute.',
      details: `Semenggoh's conservation efforts include:
      
      • Orangutan rehabilitation and release programs
      • Habitat preservation and restoration
      • Research on orangutan behavior and ecology
      • Community education and outreach
      • Anti-poaching initiatives
      
      You can contribute by:
      • Donating to conservation projects
      • Volunteering (if available)
      • Spreading awareness about orangutan conservation
      • Adopting sustainable practices in your daily life`
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
      <ScrollView style={styles.content}>
        <Text style={styles.headerTitle}>Learn</Text>
        <Text style={styles.introText}>
          Explore the wonders of Semenggoh Wildlife Centre and learn how you can contribute to conservation efforts.
        </Text>
        {sections.map((section, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.sectionCard}
              onPress={() => toggleSection(index)}
            >
              <FontAwesome name={section.icon} size={24} color="#00695C" style={styles.sectionIcon} />
              <View style={styles.sectionTextContainer}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionContent}>{section.content}</Text>
              </View>
              <Ionicons 
                name={expandedSection === index ? "chevron-down" : "chevron-forward"} 
                size={24} 
                color="#00695C" 
              />
            </TouchableOpacity>
            {expandedSection === index && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedText}>{section.details}</Text>
              </View>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#00796B" style={styles.arrowIcon} />
          <Text style={styles.backButtonText}>Back to Discover</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20, // Added to avoid footer being cut off
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#00796B',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  arrowIcon: {
    // Add margin or padding to adjust positioning if needed
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginBottom: 16,
  },
  introText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    marginBottom: 24,
    lineHeight: 24, // Improve readability
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionIcon: {
    marginRight: 16,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#00695C',
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    lineHeight: 20, // Improve readability
  },
  expandedContent: {
    backgroundColor: '#e6f3f1',
    borderRadius: 16,
    padding: 16,
    marginTop: -8, // Adjust spacing to fit nicely with the card
    marginBottom: 16,
  },
  expandedText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    lineHeight: 20, // Improve readability
  },
});

export default EducationalContent;
