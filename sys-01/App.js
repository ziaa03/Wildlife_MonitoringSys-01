import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // Import vector icons

/**
 * @param {IconTextProps} props
 */
const IconText = ({ name, label }) => (
  <View style={{ alignItems: 'center' }}>
    <FontAwesome name={name} size={24} color="black" />  {/* Use icons instead of emojis */}
    <Text style={styles.notoSansText}>{label}</Text>  {/* Optionally add a label under the icon */}
  </View>
);

const AppMockup = () => (
  <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
    <View style={{ backgroundColor: '#ADD8E6', padding: 23, paddingTop: 30 }}>
      <Text style={[styles.notoSansText, { color: 'white', fontSize: 20, fontWeight: 'bold' }]}>Semenggoh Wildlife Centre</Text>
    </View>
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <Text style={[styles.notoSansText, { fontSize: 18, fontWeight: '600', marginBottom: 8 }]}>Reserve Map</Text>
      </View> 
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  notoSansText: {
    fontFamily: Platform.select({
      ios: 'Noto Sans',
      android: 'Noto Sans',
    }),
  },
});

export default AppMockup;