import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from './header-nav';

const Bookings = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [visitors, setVisitors] = useState('');

  const handleBooking = () => {
    // Implement booking logic here
    console.log('Booking submitted:', { date, time, visitors });
    // You could navigate to a confirmation page or show a success message
  };

  return (
    <View style={styles.container}>
      <Header 
        onMenuPress={() => navigation.openDrawer()}
        profileImageSource={require('./assets/profile-placeholder.jpg')} 
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Text style={styles.title}>Book Your Visit</Text>
          <Text style={styles.subtitle}>Plan your adventure at Semenggoh Wildlife Centre</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <FontAwesome5 name="calendar" size={20} color="#00695C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              value={date}
              onChangeText={setDate}
            />
          </View>

          <View style={styles.inputGroup}>
            <FontAwesome5 name="clock" size={20} color="#00695C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Select Time"
              value={time}
              onChangeText={setTime}
            />
          </View>

          <View style={styles.inputGroup}>
            <FontAwesome5 name="user-friends" size={20} color="#00695C" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Number of Visitors"
              value={visitors}
              onChangeText={setVisitors}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Visiting Hours</Text>
          <Text style={styles.infoText}>Open Daily: 8am - 4:30pm</Text>
          <Text style={styles.infoText}>Feeding Times: 9am - 10am, 3pm - 3:30pm</Text>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Visitor Tips</Text>
          <View style={styles.tipItem}>
            <FontAwesome5 name="leaf" size={16} color="#00695C" style={styles.tipIcon} />
            <Text style={styles.tipText}>Wear comfortable, earth-toned clothing</Text>
          </View>
          <View style={styles.tipItem}>
            <FontAwesome5 name="tint" size={16} color="#00695C" style={styles.tipIcon} />
            <Text style={styles.tipText}>Bring water and stay hydrated</Text>
          </View>
          <View style={styles.tipItem}>
            <FontAwesome5 name="camera" size={16} color="#00695C" style={styles.tipIcon} />
            <Text style={styles.tipText}>Photography allowed, but no flash</Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  heroSection: {
    backgroundColor: '#00695C',
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontFamily: 'Poppins-Regular',
  },
  bookButton: {
    backgroundColor: '#00695C',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  infoSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#00695C',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    marginBottom: 5,
  },
  tipsSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#00695C',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipIcon: {
    marginRight: 10,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#444',
  },
});

export default Bookings;