import React, { useEffect, useState } from "react";
import { View, Button, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityButton from "../../src/components/activityButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Linking } from "react-native";

const Activities = () => {
  const { lat, long, userId, address, photoLink, caption, photo } =
    useLocalSearchParams();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const router = useRouter();

  const handleActivitySelect = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(
        selectedActivities.filter((item) => item !== activity)
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleNext = () => {
    router.push({
      pathname: "/post/info",
      params: {
        lat,
        long,
        userId: 1,
        address: address,
        caption: caption,
        photoLink: photoLink,
        activities: selectedActivities,
        photo: photo,
      },
    });
  };
  const handleBack = () => {
    router.push({
      pathname: "/post/location",
      params: {
        lat,
        long,
        userId: 1,
        address: address,
        caption: caption,
        photoLink: photoLink,
        activities: selectedActivities,
      },
    });
  };

  const activities = [
    "biking",
    "diving",
    "golfing",
    "park",
    "skiing",
    "stargazing",
    "farm",
    "lifting",
    "museum",
    "offroading",
    "riding",
    "climbing",
    "tropical",
  ]; // Example activities

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginLeft: 30, marginRight: 7, marginTop: 30 }}>
        <Text style={{ fontSize: 35, fontWeight: "600" }}>
          Which of these best describes your spot
        </Text>
        <Text style={{ fontSize: 22, fontWeight: "600", marginTop: 20 }}>
          Choose up to 5
        </Text>

        <FlatList
          style={{ marginTop: 30 }}
          data={activities}
          renderItem={({ item }) => (
            <ActivityButton
              key={item}
              onPress={() => handleActivitySelect(item)}
              activity={item}
              pressed={selectedActivities.includes(item)}
            />
          )}
          keyExtractor={(item) => item}
          numColumns={2}
        />
      </View>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "white",
          bottom: 0,
          width: "100%",
          height: 100,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.07,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity style={{ alignSelf: "center" }} onPress={handleBack}>
          <View>
            <Text style={{ fontSize: 20 }}>Back</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "#000000",
            borderRadius: 20,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          onPress={handleNext}
        >
          <View>
            <Text style={{ fontSize: 20, color: "white" }}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Activities;
