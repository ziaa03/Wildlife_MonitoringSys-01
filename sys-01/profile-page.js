import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Sidebar from './sidebar-nav';
import { useNavigation } from '@react-navigation/native';
import Header from './header-nav';
import * as ImagePicker from 'expo-image-picker'; // Image picker library

const ProfilePage = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState('Zia');
  const [profileImage, setProfileImage] = useState(require('./assets/profile-placeholder.jpg'));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'You need to grant permission to access the camera roll.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage({ uri: result.uri });
    }
  };

  const handleNameEdit = () => {
    // Logic for editing the name, e.g., opening a prompt
    Alert.prompt('Edit Name', 'Enter your new name:', [
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: (newName) => {
          if (newName) {
            setName(newName);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header 
        onMenuPress={toggleSidebar} 
        onProfilePress={() => {}}
        profileImageSource={profileImage} 
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ScrollView style={styles.content}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={profileImage}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <FontAwesome name="edit" size={20} color="#00695C" />
            </View>
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{name}</Text>
            <TouchableOpacity onPress={handleNameEdit}>
              <FontAwesome name="edit" size={20} color="#00695C" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Address" />
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Home')}>
            <FontAwesome name="sign-out" size={24} color="#00695C" />
            <Text style={styles.actionButtonText}>Logout</Text>
          </TouchableOpacity>
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
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    elevation: 2,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#00695C',
    marginRight: 10,
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
    fontFamily: 'Poppins-Regular',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
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
    fontFamily: 'Poppins-Medium',
  },
});

export default ProfilePage;
