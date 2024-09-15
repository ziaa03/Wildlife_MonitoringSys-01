import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './sidebar-nav';
import Header from './header-nav';

const DonationPage = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleDonatePress = () => {
    if (!amount) {
      Alert.alert('Oops!', 'Please enter a donation amount. Even a small amount makes a big difference!');
      return;
    }

    // Here you can integrate with a payment gateway or handle donation logic
    Alert.alert('Thank You!', `You're amazing! You’ve donated $${amount}. We appreciate your support so much!`);
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Header 
        onMenuPress={toggleSidebar} 
        onProfilePress={() => {}}
        profileImageSource={require('./assets/profile-placeholder.jpg')} 
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Help Us Make a Difference!</Text>
        <Text style={styles.description}>
          We’re so glad you’re here to support wildlife conservation. Choose an amount that feels right for you and make a big impact!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="How much would you like to donate?"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.donateButton} onPress={handleDonatePress}>
          <Text style={styles.donateButtonText}>Give a Helping Hand!</Text>
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    color: 'black', 
    marginBottom: 16,
    paddingTop: 20,
  },
  description: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: 'black', // Matching color
    marginBottom: 24,
    lineHeight: 24, // Improve readability
  },
  input: {
    height: 50,
    borderColor: '#004D40', // Matching color
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  donateButton: {
    backgroundColor: '#00796B', // Matching color
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  donateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#00796B', // Matching color
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  arrowIcon: {
    // Optionally, you can add margin or padding to adjust positioning if needed
  },
});

export default DonationPage;
