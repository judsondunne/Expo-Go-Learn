import { useRouter } from "expo-router";
import React from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapPreviewView = ({ latitude, longitude, address }) => {
  const router = useRouter();
  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <TouchableOpacity style={{ marginTop: 30 }}>
      <View
        style={{
          height: 300,
          width: "90%",
          alignSelf: "center",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <MapView style={{ flex: 1 }} region={region}>
          <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
        </MapView>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            padding: 10,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MapPreviewView;
