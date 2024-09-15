// MapScreen.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ navigation }) => {
  // Central coordinates for Semenggoh Wildlife Centre in decimal degrees
  const centralLatitude = 1.399722;
  const centralLongitude = 110.324167;
  
  // Define the region to display the Semenggoh area
  const latitudeDelta = 0.02;  // Adjust this value to include more or less of the area
  const longitudeDelta = 0.02; // Adjust this value to include more or less of the area

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: centralLatitude,
          longitude: centralLongitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
      >
        <Marker
          coordinate={{ latitude: centralLatitude, longitude: centralLongitude }}
          title="Semenggoh Wildlife Centre"
          description="Orangutan Rehabilitation Centre"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
