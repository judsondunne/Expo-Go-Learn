import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import activityIcons from "../../app/assets/activityIcons";

const ActivityList = ({ activities }) => {
  const activitiesArray =
    typeof activities === "string" ? activities.split(",") : activities;
  const width = 30;
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {activitiesArray.map((activity, index) => (
          <View style={{ flexDirection: "column", marginLeft: 30 }}>
            <Image
              key={index}
              source={activityIcons[activity.trim()]}
              style={{ height: width, width: width, margin: 15 }}
            />
            <Text style={{ alignSelf: "center", textTransform: "capitalize" }}>
              {activity}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ActivityList;
