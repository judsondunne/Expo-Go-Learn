import { useRouter } from "expo-router";
import React from "react";
import { Touchable, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapPreview = ({
  latitude,
  longitude,
  userId,
  address,
  photoLink,
  activites,
  caption,
}) => {
  const router = useRouter();
  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const handleMapPress = () => {
    router.push({
      pathname: "/post/mapReset",
      params: {
        userId: 1,
        address: address,
        photoLink:
          "https://firebasestorage.googleapis.com/v0/b/learn-32d72.appspot.com/o/IMG_6313.jpeg?alt=media&token=8d31f792-051a-4908-91c5-8599c7e0143d",
        activities: activites,
        caption: caption,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handleMapPress} style={{ marginTop: 30 }}>
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
      </View>
    </TouchableOpacity>
  );
};

export default MapPreview;
