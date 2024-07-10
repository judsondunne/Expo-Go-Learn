import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import activityIcons from "../../app/assets/activityIcons";

const ActivitySelector = ({
  activities,
  selectedActivity,
  setSelectedActivity,
}) => {
  const activitiesArray =
    typeof activities === "string" ? activities.split(",") : activities;
  const width = 25;

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {activitiesArray.map((activity, index) => {
          const isSelected = selectedActivity === activity;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedActivity(activity.trim())}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 30,
                  borderRadius: 12,
                  paddingRight: 20,
                  borderColor: "#355B0F",
                  borderWidth: isSelected ? 1.9 : 0,
                  backgroundColor: "white",
                  width: "auto",
                  height: "auto",
                  elevation: 5, // Add elevation for shadow effect
                  shadowColor: "#000", // Shadow color (on iOS)
                  shadowOffset: { width: 0, height: 2 }, // Shadow offset (on iOS)
                  shadowOpacity: 0.3, // Shadow opacity (on iOS)
                  shadowRadius: 2, // Shadow radius (on iOS)
                  // For Android use elevation instead of shadow properties
                }}
              >
                <Image
                  source={activityIcons[activity.trim()]}
                  style={{ height: width, width: width, margin: 15 }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: width / 1.7,
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {activity}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ActivitySelector;
