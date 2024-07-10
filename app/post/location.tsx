import React, { useState, useRef, useEffect } from "react";
import { View, Button, Text, TextInput, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import fetchLocation from "../services/findLocation";
import getAddress from "../services/getAddress";
import getCoordinates from "../services/reverseGeoLocate";
import getLatLongFromAddress from "../services/reverseGeoLocate";

const Location = () => {
  const mapRef = useRef(null);
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { photoLink, photo } = useLocalSearchParams();
  const [lat, setLat] = useState(43.61272093528821);
  const [long, setLong] = useState(-72.3967804529894);
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: 43.61272093528821,
    longitude: -72.3967804529894,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    console.log(photo);
    setLocation();
  }, []);

  const handleBack = () => {
    router.push({
      pathname: "/post/edit",
      params: {
        lat: lat,
        long: long,
        userId: 1,
        address: address,
        photoLink: photoLink,
        activities: [],
        photo: photo,
      },
    });
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const fetchedAddress = await getAddress(lat, long);
      console.log(fetchedAddress);
      setAddress(fetchedAddress);
    };
    fetchAddress();
  }, [lat, long]);

  const setLocation = async () => {
    const location = await fetchLocation();
    const newRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setRegion(newRegion);
    setLat(newRegion.latitude);
    setLong(newRegion.longitude);

    mapRef.current.animateToRegion(newRegion, 500);
  };

  const handleSearch = () => {
    const input = userInput;
    getLatLongFromAddress(input)
      .then((coords) => {
        console.log("Coordinates:", coords);
        setLat(coords.latitude);
        setLong(coords.longitude);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleNext = () => {
    router.push({
      pathname: "/post/activites",
      params: {
        lat: lat,
        long: long,
        userId: 1,
        address: address,
        photoLink: photoLink,
        activities: [],
        photo: photo,
      },
    });
  };

  const onRegionChange = (newRegion) => {
    setIsTyping(false);
    setRegion(newRegion);
    setLat(newRegion.latitude);
    setLong(newRegion.longitude);
    console.log("Center latitude:", newRegion.latitude);
    console.log("Center longitude:", newRegion.longitude);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={onRegionChange}
      />

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          top: 90,
          alignSelf: "center",
          padding: 20,
          width: 350,
          borderRadius: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          onChangeText={(text) => {
            setIsTyping(true);
            setUserInput(text);
          }}
          value={isTyping ? userInput : address}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={20} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "absolute",
          marginTop: 40,
          top: 150, // Adjust this value as needed
          right: 40,
        }}
      >
        <TouchableOpacity onPress={setLocation} style={{}}>
          <View
            style={{
              backgroundColor: "#2E2C2C",
              width: 35,
              height: 35,
              borderRadius: 10,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="location-arrow"
              size={20}
              color="white"
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
      </View>

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
          bottom: 0,
          paddingBottom: 50,
          paddingTop: 30,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <View
              style={{
                paddingLeft: 28,
                paddingRight: 28,
                paddingTop: 20,
                paddingBottom: 20,
                borderRadius: 15,
              }}
            >
              <Text style={{ color: "#2E2C2C", fontSize: 20 }}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <View
              style={{
                backgroundColor: "#2E2C2C",
                paddingLeft: 28,
                paddingRight: 28,
                paddingTop: 20,
                paddingBottom: 20,
                borderRadius: 15,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Location;
