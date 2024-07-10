import axios from "axios";

const API_KEY = "AIzaSyCZJQBR-wySjzMmRjAyXe9udUY24sdYHYI";

const getLatLongFromAddress = async (address) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: API_KEY,
        },
      }
    );

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error("Geocoding failed");
    }
  } catch (error) {
    console.error("Error fetching geocode:", error);
    throw error;
  }
};

export default getLatLongFromAddress;
