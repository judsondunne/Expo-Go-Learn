import React, { useCallback, useState } from "react";
import { Button, View, Image, Modal, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import uploadPhotoToFirebase from "../services/uploadPhoto";
import { FontAwesome } from "@expo/vector-icons";
import DraggableText from "../../src/components/DragableText"; // Ensure the file name is correct
import SongsModal from "../../src/components/songsModal";

const EditPhoto = () => {
  const router = useRouter();
  const { photo } = useLocalSearchParams();
  const [texts, setTexts] = useState([]);
  const [trashIconLayout, setTrashIconLayout] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleNext = useCallback(async () => {
    try {
      const downloadURL = await uploadPhotoToFirebase(photo);
      console.log("Image uploaded successfully! URL:", downloadURL);

      router.push({
        pathname: "/post/location",
        params: {
          photoLink: downloadURL,
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }, [router, photo]);

  const handleAddTextPress = () => {
    setTexts((prevTexts) => [
      ...prevTexts,
      { text: "", position: { x: 0, y: 0 } },
    ]);
  };

  const handleTextChange = (index, newText) => {
    setTexts((prevTexts) =>
      prevTexts.map((item, i) =>
        i === index ? { ...item, text: newText } : item
      )
    );
  };

  const handleTextDragEnd = (index, position) => {
    console.log("dropped");
    const isOverTrashIcon =
      trashIconLayout &&
      position.x >= trashIconLayout.x &&
      position.x <= trashIconLayout.x + trashIconLayout.width &&
      position.y >= trashIconLayout.y &&
      position.y <= trashIconLayout.y + trashIconLayout.height;

    if (isOverTrashIcon) {
      console.log("hi");
      setTexts((prevTexts) => prevTexts.filter((_, i) => i !== index));
    } else {
      setTexts((prevTexts) =>
        prevTexts.map((item, i) => (i === index ? { ...item, position } : item))
      );
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      {photo && (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: photo }}
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              resizeMode: "cover",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 200,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            {texts.map((item, index) => (
              <DraggableText
                key={index}
                text={item.text}
                position={item.position}
                onChangeText={(newText) => handleTextChange(index, newText)}
                onDragEnd={(position) => handleTextDragEnd(index, position)}
              />
            ))}
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <Button title="Add Text" onPress={handleAddTextPress} />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <Button title="Next" onPress={handleNext} />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 40,
              right: 40,
            }}
            onLayout={(event) => {
              const { x, y, width, height } = event.nativeEvent.layout;
              setTrashIconLayout({ x, y, width, height });
            }}
          >
            <FontAwesome name="trash" size={30} color="red" />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 80,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <Button title="Songs" onPress={toggleModal} />
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <SongsModal toggleModal={toggleModal} />
      </Modal>
    </View>
  );
};

export default EditPhoto;
