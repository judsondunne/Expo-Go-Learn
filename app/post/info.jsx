import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import uploadPost from "../services/uploadPost";
import MapPreview from "../../src/components/mapPreview";
import ActivityList from "../../src/components/activityList";
import ActivityListPost from "../../src/components/activityListPost";
import getAddress from "../services/getAddress";
const Info = () => {
  const {
    lat,
    long,
    userId,
    address,
    photo,
    photoLink,
    activities,
    caption: initialCaption,
  } = useLocalSearchParams();
  const localImage = require("../../app/assets/hikingPhoto.png");
  const [caption, setCaption] = useState(initialCaption || "");
  const router = useRouter();

  const handleUploadPress = () => {
    router.push({
      pathname: "map",
    });

    uploadPost(router, caption, lat, long, 1, address, photoLink, activities);
  };
  const placeholder = caption ? caption : "Write a caption...";

  useEffect(() => {
    console.log(caption);
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Icon name="left" size={25} style={{ marginLeft: "10%" }} />
          <Text style={{ marginRight: "38%", fontSize: 23, fontWeight: "600" }}>
            New Post
          </Text>
        </View>
        <Image
          source={localImage}
          style={{
            height: 400,
            width: 230,
            alignSelf: "center",
            marginTop: 40,
            borderRadius: 10,
          }}
        />

        <View>
          <TextInput
            placeholder={placeholder}
            value={caption}
            onChangeText={setCaption}
            placeholderTextColor="#6F6666"
            style={{
              marginLeft: 40,
              marginTop: 50,
              paddingBottom: 10,
              borderBottomWidth: 1.5,
              borderBottomColor: "#6F6666",
              marginRight: 50,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: 35,
            marginTop: 30,
            paddingBottom: 10,
            borderBottomWidth: 1.5,
            borderBottomColor: "#6F6666",
            marginRight: 50,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#5A5A5A",
              fontWeight: "600",
              marginBottom: 20,
            }}
          >
            Activities
          </Text>
          <ActivityListPost
            activities={activities}
            lat={lat}
            long={long}
            userId={userId}
            address={address}
            photoLink={photoLink}
            caption={caption}
          />
        </View>
        <View style={{ marginLeft: 40 }}>
          <Text
            style={{
              marginTop: 30,
              fontSize: 20,
              color: "#5A5A5A",
              fontWeight: "600",
            }}
          >
            Location
          </Text>
          <MapPreview
            latitude={lat}
            longitude={long}
            userId={1}
            address={address}
            activites={activities}
            caption={caption}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.07,
          shadowRadius: 3.84,
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "#D4D4D4",
            borderRadius: 20,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <View style={{}}>
            <Text style={{ fontSize: 20, color: "white" }}>Drafts</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "#339DFF",
            borderRadius: 20,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          onPress={handleUploadPress}
        >
          <View>
            <Text style={{ fontSize: 20, color: "white" }}>Upload</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Info;
