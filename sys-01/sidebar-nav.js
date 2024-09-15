import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const IconText = ({ name, label, onPress }) => (
  <TouchableOpacity style={styles.sidebarItem} onPress={onPress}>
    <FontAwesome name={name} size={20} color="#333" />
    <Text style={styles.sidebarItemText}>{label}</Text>
  </TouchableOpacity>
);

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarAnimation = useRef(new Animated.Value(-240)).current; // Increased width

  useEffect(() => {
    Animated.timing(sidebarAnimation, {
      toValue: isOpen ? 0 : -240, // Match the width
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const navigation = useNavigation();

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View style={[styles.sidebar, { left: sidebarAnimation }]}>
        <IconText name="home" label="Home" onPress={() => { onClose(); navigation.navigate('Landing'); }} />
        <IconText name="compass" label="Discover" onPress={() => { onClose(); navigation.navigate('Discover'); }} />
        <IconText name="user" label="Profile" onPress={() => { onClose(); navigation.navigate('Profile'); }} />
        <IconText name="cog" label="Settings" onPress={() => { onClose(); navigation.navigate('SettingsPage'); }} />

      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 240, // Increased width
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 2,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  sidebarItemText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
});

export default Sidebar;
