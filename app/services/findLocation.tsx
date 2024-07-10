import * as Location from "expo-location";

const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Location permission not granted");
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  return { latitude, longitude };
};

const fetchLocation = async () => {
  try {
    const currentLocation = await getCurrentLocation();
    return currentLocation;
  } catch (error) {
    console.error(error);
    throw error; // Re-throwing the error for further handling if needed
  }
};

export default fetchLocation;
