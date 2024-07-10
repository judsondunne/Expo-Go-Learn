import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import activityIcons from "../../app/assets/activityIcons";

const ActivityButton = ({ activity, pressed, onPress }) => {
  const width = 50;

  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 20 }}>
      <View
        style={{
          backgroundColor: pressed ? "#F7F7F7" : "white",
          borderColor: pressed ? "#0E0E0E" : "#DFDFDF",
          borderWidth: pressed ? 3 : 2,
          width: 170,

          height: "auto",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Image
            source={activityIcons[activity]}
            style={{ height: width, width: width, marginRight: 10 }}
          />
          <Text
            style={{
              fontSize: 19,
              fontWeight: "500",
              textTransform: "capitalize",
              marginTop: 10,
            }}
          >
            {activity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityButton;
