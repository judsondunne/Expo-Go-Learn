import React, { useEffect, useState, useRef, useMemo } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import MapView from "react-native-maps";
import { useRouter } from "expo-router";
import fetchPosts from "../services/fetchPosts";
import getCurrentLocation from "../services/findLocation";
import Icon from "react-native-vector-icons/AntDesign";
import FontIcon from "react-native-vector-icons/FontAwesome";
import CustomMarker from "../../src/components/customMarker";
import encodeFilename from "../services/customDecode";
import fetchLocation from "../services/findLocation";
import ActivitySelector from "../../src/components/activitySelector";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBottomSheet from "../../src/components/customBottomSheet";

const Map = () => {
  const [posts, setPosts] = useState([]);
  const [region, setRegion] = useState({
    latitude: 43.61272093528821,
    longitude: -72.3967804529894,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const activities = "skiing,park,offroading,golfing";
  const activitiesArray =
    typeof activities === "string" ? activities.split(",") : activities;
  const mapRef = useRef(null); // Ref for accessing MapView methods
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState(activitiesArray[0]);

  // variables
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["8%", "50%", "100%"], []);

  const handleOpen = () => {
    bottomSheetRef.current?.snapToIndex(0); // Open to the middle snap point
  };

  const setLocation = async () => {
    const location = await fetchLocation();
    const newRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      await setLocation();
      fetchPosts(setPosts);
      
    };
    fetchData();
  }, []);

  const handleMarkerPress = (item) => {
    const encodedPhotoLink = encodeFilename(item.photoLink);
    router.push({
      pathname: "/display/display",
      params: {
        itemTitle: item.title,
        photoLink: encodedPhotoLink,
        seconds: item.time.seconds,
        userId: item.userId,
        itemContent: item.content,
        activities: item.activities,
        address: item.address,
        lat: item.lat,
        long: item.long,
      },
    });
  };

  const recenterMap = async () => {
    const location = await getCurrentLocation();
    const newRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 3000); // Adjust duration as needed
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          {posts.map((item) => (
            <CustomMarker
              key={item.id}
              item={item}
              handleMarkerPress={handleMarkerPress}
              size={1.3}
              visible={item.activities.includes(selectedActivity)} // Ensure all markers are visible initially
            />
          ))}
        </MapView>

        <View
          style={{
            position: "absolute",
            top: 100,
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: "white",
              flexDirection: "row",
              borderRadius: 50,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 15,
              padding: 15,
            }}
          >
            <TouchableOpacity onPress={handleOpen}>
              <View style={{ marginLeft: 10 }}>
                <Icon name="search1" size={28} color="black" />
              </View>
            </TouchableOpacity>

            <TextInput
              placeholder="Search Here"
              style={{
                flex: 1,
                marginLeft: 14,
                fontSize: 20,
                fontWeight: "400",
              }}
              placeholderTextColor="#7F7C7C"
            />
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <View style={{ marginTop: 20 }}>
              <ActivitySelector
                activities={activities}
                selectedActivity={selectedActivity}
                setSelectedActivity={setSelectedActivity}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            marginTop: 100,
            top: 150, // Adjust this value as needed
            right: 25,
             // Ensure this container is above the bottom sheet
          }}
        >
          <TouchableOpacity onPress={setLocation} style={{}}>
            <View
              style={{
                backgroundColor: "white",
                width: 35,
                height: 35,
                borderRadius: 10,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <FontIcon
                name="location-arrow"
                size={20}
                color="#2E2C2C"
                style={{ alignSelf: "center" }}
              />
            </View>
          </TouchableOpacity>
        </View>

       <CustomBottomSheet snapPoints={snapPoints} bottomSheetRef={bottomSheetRef}/>
      </View>
    </GestureHandlerRootView>
  );
};

export default Map;
