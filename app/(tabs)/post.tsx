// import React, { useCallback } from "react";
// import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
// import { useState, useRef } from "react";
// import {
//   Button,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   StyleSheet,
// } from "react-native";
// import * as MediaLibrary from "expo-media-library";
// import { useRouter } from "expo-router"; // Assuming you're using a custom router here
// import { SafeAreaView } from "react-native-safe-area-context";
// import uploadPhotoToFirebase from "../services/uploadPhoto"; // Update the path as necessary

// const Post = () => {
//   const [facing, setFacing] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [image, setImage] = useState(null);
//   const cameraRef = useRef(null);
//   const [uri, setUri] = useState('')

//   const router = useRouter();

//   const handleNext = () => {
//     router.push({
//       pathname: "/post/edit",
//       params: {
//         photo: image,
//       },
//     });
//   };

//   const skipPhoto = () => {
//     router.push({
//       pathname: "/post/edit",
//     });
//   };

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={{ flex: 1, justifyContent: "center" }}>
//         <Text style={{ textAlign: "center" }}>
//           We need your permission to show the camera
//         </Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   }

//   async function takePicture() {
//     if (cameraRef.current) {
//       try {
//         const { uri } = await cameraRef.current.takePictureAsync({
//           base64: false,
//           // Remove 'imageType' as it's not a valid option
//           onPictureSaved: async (picture) => {
//             console.log("Picture saved:", picture.uri);
//             setUri(picture.uri)
//             setImage(picture.uri);
//             await MediaLibrary.createAssetAsync(picture.uri);
//           },
//         });
//       } catch (error) {
//         console.error("Error taking picture:", error);
//         // Handle error here
//       }
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView
//         ref={cameraRef}
//         style={styles.camera}
//         facing={facing as CameraType}
//       >
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={takePicture}>
//             <Text style={styles.text}>Take Picture</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={skipPhoto}>
//             <Text style={styles.text}>Skip</Text>
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//       {image && (
//         <TouchableOpacity onPress={handleNext}>
//           <View style={styles.imageContainer}>
//             <Image source={{ uri: image }} style={styles.image} />
//           </View>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "red",
//   },
//   camera: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "white",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginHorizontal: 10,
//     borderRadius: 5,
//   },
//   text: {
//     fontSize: 18,
//     color: "black",
//   },
//   imageContainer: {
//     position: "absolute",
//     bottom: 20,
//     alignSelf: "center",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: "contain",
//   },
// });

// export default Post;

import React, { useCallback } from "react";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { useRouter } from "expo-router"; // Assuming you're using a custom router here
import { SafeAreaView } from "react-native-safe-area-context";
import uploadPhotoToFirebase from "../services/uploadPhoto"; // Update the path as necessary

//https://console.cloud.google.com/google/maps-apis/discover/aerial-view?project=calendar-2437b COOL IDEA
const Post = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const [uri, setUri] = useState('');

  const router = useRouter();

  const handleNext = () => {
    router.push({
      pathname: "/post/edit",
      params: {
        photo: image,
      },
    });
  };

  const skipPhoto = () => {
    router.push({
      pathname: "/post/location",
    });
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync({
          base64: false,
          onPictureSaved: async (picture) => {
            console.log("Picture saved:", picture.uri);
            setUri(picture.uri);
            setImage(picture.uri);
            await MediaLibrary.createAssetAsync(picture.uri);
          },
        });
      } catch (error) {
        console.error("Error taking picture:", error);
        // Handle error here
      }
    }
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [9, 19.5], // Set the aspect ratio to 9:19.5
    });
  
    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  
 
  

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing as CameraType}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
            <Text style={styles.text}>Upload Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={skipPhoto}>
            <Text style={styles.text}>Skip</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {image && (
        <TouchableOpacity onPress={handleNext}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  imageContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default Post;

