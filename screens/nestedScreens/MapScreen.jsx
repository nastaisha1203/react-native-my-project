import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

const initialLocation = { latitude: 49.256779, longitude: 28.474588 };

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    if (route.params) {
      setLocation(route.params);
    }
    return;
  }, [route.params]);

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={location} />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
