import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, Button } from "react-native";
import activityIcons from "../../app/assets/activityIcons";

const ActivityListPost = ({
  activities = [],
  lat,
  long,
  userId,
  address,
  photoLink,
  caption,
}) => {
  const router = useRouter();
  useEffect(() => {
    console.log("This is the caption" + caption);
  });
  const handleEditActivites = () => {
    router.push({
      pathname: "/post/activites",
      params: {
        lat: lat,
        long: long,
        userId: 1,
        address: address,
        caption,
        photoLink:
          "https://firebasestorage.googleapis.com/v0/b/learn-32d72.appspot.com/o/IMG_6313.jpeg?alt=media&token=8d31f792-051a-4908-91c5-8599c7e0143d",
      },
    });
  };

  const activitiesArray =
    typeof activities === "string" ? activities.split(",") : activities;
  const width = 50;
  return (
    <View style={{ flexDirection: "row" }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {activitiesArray.map((activity, index) => (
          <View style={{ margin: 10 }}>
            <Image
              key={index}
              source={activityIcons[activity.trim()]}
              style={{
                height: width,
                width: width,
                alignSelf: "center",
                marginBottom: 5,
              }}
            />
            <Text style={{ fontSize: 15, textTransform: "capitalize" }}>
              {activity}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Button title="Edit" onPress={handleEditActivites} />
    </View>
  );
};

export default ActivityListPost;
