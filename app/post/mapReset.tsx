import React, { useState } from "react";
import { View, Button } from "react-native";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import uploadPost from "../services/uploadPost";

const MapReset = () => {
  const router = useRouter();
  const { userId, address, photoLink, activities, caption } =
    useLocalSearchParams();

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [region, setRegion] = useState({
    latitude: 43.61272093528821,
    longitude: -72.3967804529894,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleNext = () => {
    router.push({
      pathname: "/post/info",
      params: {
        lat: lat,
        long: long,
        caption: caption,
        userId: userId,
        address: address,
        photoLink: photoLink,
        activities: activities,
      },
    });
  };

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
    setLat(newRegion.latitude);
    setLong(newRegion.longitude);
    console.log("Center latitude:", newRegion.latitude);
    console.log("Center longitude:", newRegion.longitude);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
      />
      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateX: -15 }, { translateY: -15 }],
          zIndex: 1,
        }}
      >
        <Icon name="bug" size={30} color="red" />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

export default MapReset;
