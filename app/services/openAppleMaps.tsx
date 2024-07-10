import React from "react";
import { Button, Linking } from "react-native";

const openAppleMaps = (latitude, longitude) => {
  const url = `http://maps.apple.com/?daddr=${latitude},${longitude}`;
  Linking.openURL(url).catch((err) =>
    console.error("Error opening Apple Maps:", err)
  );
};

export default openAppleMaps;
