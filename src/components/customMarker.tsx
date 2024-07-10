import React from "react";
import { View, Image } from "react-native";
import { Marker } from "react-native-maps";
const polygon1 = require("../../app/assets/Polygon 1.png");

const CustomMarker = ({ item, handleMarkerPress, size, visible }) => {
  if (!visible) {
    return null; // Do not render the marker if not visible
  }
  return (
    <Marker
      key={item.id}
      coordinate={{ latitude: item.lat, longitude: item.long }}
      title={item.title || "Custom Marker"}
      description={item.description || "This is a custom marker"}
      onPress={() => handleMarkerPress(item)}
      anchor={{ x: 0.5, y: 1 }} // Adjust the anchor point
    >
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 45 * size,
            height: 70 * size,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "black",
            marginBottom: 0, // Adjust to align bottom correctly
          }}
          source={{ uri: item.photoLink }} // Use item.photoLink directly
        />
        <Image style={{ width: 10, height: 10 }} source={polygon1} />
      </View>
    </Marker>
  );
};

export default CustomMarker;
