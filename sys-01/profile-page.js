import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Sidebar from './sidebar-nav';
import Header from './header-nav';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Zia',
    email: '',
    phoneNumber: '',
    address: '',
    profileImage: require('./assets/profile-placeholder.jpg'),
  });

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prevState => !prevState);
  }, []);

  const updateProfile = useCallback((field, value) => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      [field]: value,
    }));
  }, []);

  const handleImagePick = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'You need to grant permission to access the camera roll.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        updateProfile('profileImage', { uri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  }, [updateProfile]);

  const handleNameEdit = useCallback(() => {
    Alert.prompt('Edit Name', 'Enter your new name:', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: (newName) => {
          if (newName && newName.trim()) {
            updateProfile('name', newName.trim());
          }
        },
      },
    ]);
  }, [updateProfile]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigation.navigate('Home') },
      ],
      { cancelable: false }
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header 
        onMenuPress={toggleSidebar} 
        profileImageSource={userProfile.profileImage} 
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={userProfile.profileImage}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <FontAwesome name="camera" size={20} color="#00695C" />
            </View>
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <TouchableOpacity onPress={handleNameEdit}>
              <FontAwesome name="edit" size={20} color="#00695C" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={userProfile.email}
            onChangeText={(text) => updateProfile('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={userProfile.phoneNumber}
            onChangeText={(text) => updateProfile('phoneNumber', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={userProfile.address}
            onChangeText={(text) => updateProfile('address', text)}
          />
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="#00695C" />
          <Text style={styles.actionButtonText}>Logout</Text>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 8,
    elevation: 2,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    color: '#00695C',
    marginRight: 10,
    fontFamily: 'Poppins-Bold',
    paddingTop: 5,
  },
  editIcon: {
    marginLeft: 2,
  },
  detailsContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    fontFamily: 'Poppins-Regular',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#00695C',
    fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ProfilePage;