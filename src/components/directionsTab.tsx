import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import openAppleMaps from "../../app/services/openAppleMaps";

const DirectionsTab = ({ lat, long }) => {
  const handleDirectionPress = () => {
    openAppleMaps(lat, long);
  };
  return (
    <View
      style={{
        height: 150,
        backgroundColor: "#FFF",
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20 }}>
        30 mins
      </Text>
      <View
        style={{
          backgroundColor: "#D6D6D6",
          alignSelf: "center",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <TouchableOpacity onPress={handleDirectionPress}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DirectionsTab;
