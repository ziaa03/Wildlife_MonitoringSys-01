// Header.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ onMenuPress, onProfilePress, profileImageSource }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.headerSpacer} />
      <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
        <Image
          source={profileImageSource}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#00695C', // Match the header background or other styling
    borderWidth: 2,
  },
});

export default Header;
