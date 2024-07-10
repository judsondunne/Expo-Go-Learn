import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomModal from "../../src/components/modal";
import timeAgo from "../services/timeAgo";
import fetchUser from "../services/fetchUser";
import Icon from "react-native-vector-icons/AntDesign";
import { collection, getDoc, doc, onSnapshot } from "firebase/firestore";

import { db } from "../../src/config/firebase";
import encodeFilename from "../services/customDecode";

const Display = () => {
  const router = useRouter();
  const {
    itemTitle,
    itemContent,
    photoLink,
    seconds,
    userId,
    activities,
    address,
    lat,
    long,
  } = useLocalSearchParams();
  useEffect(() => {
    console.log("Photo link for displaypage " + photoLink);
  });
  const encodedUrl = encodeFilename(photoLink);
  const photoLinkString = Array.isArray(encodedUrl)
    ? encodedUrl[0]
    : encodedUrl;
  console.log(photoLinkString);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(itemContent);

  // Calculate 5 minutes ago timestamp
  const [timeAgoText, setTimeAgoText] = useState("");
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");

  useEffect(() => {
    console.log("Lat: " + lat + " " + long);
    const fetchUser = async (userId) => {
      try {
        // Reference to the user document
        const docRef = doc(db, "users", userId);

        // Fetch the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("User data:", docSnap.data().name);
          setUserName(docSnap.data().name);
          setUserPic(docSnap.data().profilePic);
          return docSnap.data().name;
          // Print the document data to the console
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    const user = fetchUser(userId);
    console.log(userName);
    const timeAgoString = timeAgo(seconds);
    setTimeAgoText(timeAgoString);
  }, [seconds]);

  const fetchUser = async (userId) => {
    try {
      // Reference to the user document
      const docRef = doc(db, "users", userId);

      // Fetch the document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User data:", docSnap.data().name);
        return docSnap.data().name;
        // Print the document data to the console
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: photoLinkString }}
        style={{ width: "100%", height: "100%" }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <CustomModal
          setModalVisible={setModalVisible}
          name={userName}
          timeAgo={timeAgoText}
          content={itemContent}
          userPic={userPic}
          activities={activities}
          address={address}
          lat={lat}
          long={long}
        />
      </Modal>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",

          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon name="up" size={40} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 80,
          left: 40,
          alignSelf: "flex-start",

          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => router.back()}
      >
        <Icon name="left" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Display;
