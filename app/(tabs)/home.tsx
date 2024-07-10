import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import fetchPosts from "../services/fetchPosts";
import encodeFilename from "../services/customDecode";
import { useRouter } from "expo-router";
import HomePhoto from "../../src/components/customHomeImage";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  const { width, height } = Dimensions.get("window");

  const handlePostPress = (item) => {
    console.log("Lat" + item.lat);
    console.log("Long" + item.long);
    console.log("PhotoLink on mapPage side: " + item.photoLink);

     console.log("Before ecoding" + item.photoLink);
     const encodedPhotoLink = encodeFilename(item.photoLink);
     console.log("After encoding" + encodedPhotoLink);
     router.push({
       pathname: "/display/display",
       params: {
         itemTitle: item.title,
         photoLink: encodedPhotoLink,
         seconds: item.time.seconds,
         userId: item.userId,
         itemContent: item.content,
         activities: item.activities,
         address: item.address,
         lat: item.lat,
         long: item.long,
       },
     });
  };

  const renderItem = ({ item, index }) => {
    if (!item.photoLink) {
      console.warn(`Missing photoLink for item at index ${index}`);
      return null; // Skip rendering if no photoLink
    }
  
    console.log("Rendering item with photoLink:", item.photoLink); 
    return (
     <HomePhoto item={item}/>
    );
  };
  

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        snapToAlignment="start"
        snapToInterval={height - 80} // Snap interval should match item height
        decelerationRate={0.000001} // Adjusts the scrolling speed
      />
    </View>
  );
};

export default Home;
