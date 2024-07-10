import React from "react";
import { View, Image, FlatList, Text } from "react-native";
import encodeFilename from "../../app/services/customDecode";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const RenderedPosts = ({ posts }) => {
  const router = useRouter();
  const renderItem = ({ item, index }) => {
    // Determine the size of the image based on its position
    const isLarge = index % 4 === 0 || index % 4 === 3;
    const imageSize = isLarge ? { height: 400 } : { height: 200 };
    const marginBottom = isLarge ? 0 : 10; // Adjust as needed for spacing
    const translateY = index === 3 ? -200 : 0; // Translate up by 100px if it is the fourth index

    const handlePostPress = (item) => {
      // console.log("Lat" + item.lat);
      // console.log("Long" + item.long);
      // console.log("PhotoLink on mapPage side: " + item.photoLink);

      // console.log("Before ecoding" + item.photoLink);
      const encodedPhotoLink = encodeFilename(item.photoLink);
      // console.log("After encoding" + encodedPhotoLink);
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

    return (
      <View
        style={{
          flex: 1,
          margin: 5,
          marginBottom,
          transform: [{ translateY }],
        }}
      >
        <TouchableOpacity onPress={() => handlePostPress(item)}>
          <Image
            style={{
              width: "100%",
              borderRadius: 10,
              ...imageSize,
            }}
            source={{ uri: item.photoLink }}
          />
          <Text>{index}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 5,
      }}
    />
  );
};

export default RenderedPosts;
