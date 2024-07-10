import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ActivityList from "./activityList";
import MapPreview from "./mapPreview";
import MapPreviewView from "./mapPreviewView";
import DirecitonsTab from "./directionsTab";
import DirectionsTab from "./directionsTab";

const CustomModal = ({
  setModalVisible,
  name,
  timeAgo,
  content,
  userPic,
  activities,
  address,
  lat,
  long,
}) => {
  const localImage = require("../../app/assets/profilePic.png");

  console.log("UserPic: " + activities);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: 70,
          }}
          onPress={() => setModalVisible(false)}
        >
          <Icon name="down" size={40} />
        </TouchableOpacity>

        <View style={{ marginLeft: 40 }}>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Image
              source={userPic ? { uri: userPic } : localImage}
              style={{ width: 70, height: 70, borderRadius: 1000 }}
            />
            <View style={{ marginLeft: 18, justifyContent: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    alignSelf: "center",
                    marginLeft: 10,
                    color: "grey",
                  }}
                >
                  • {timeAgo}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: "#514C4C",
                  marginTop: 3,
                }}
              >
                {address}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 17,
              color: "#5F5F5F",
              marginTop: 30,
              fontWeight: "500",
              marginRight: 40,
            }}
          >
            {content}
          </Text>
        </View>
        <Text
          style={{
            marginTop: 30,
            marginLeft: 30,
            fontSize: 20,
            color: "#5A5A5A",
            fontWeight: "600",
          }}
        >
          Activities
        </Text>
        <ActivityList activities={activities} />
        <View
          style={{
            width: "85%",
            alignSelf: "center",
            marginTop: 30,
            borderBottomWidth: 1.5,
            borderBottomColor: "#6F6666",
          }}
        ></View>

        <Text
          style={{
            marginTop: 30,
            marginLeft: 30,
            fontSize: 20,
            color: "#5A5A5A",
            fontWeight: "600",
          }}
        >
          Location
        </Text>
        <MapPreviewView latitude={lat} longitude={long} address={address} />
      </ScrollView>
      <DirectionsTab lat={lat} long={long} />
    </View>
  );
};

export default CustomModal;
