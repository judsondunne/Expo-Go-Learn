import { storage } from "../../src/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as FileSystem from "expo-file-system";

const uploadPhotoToFirebase = async (photoUri) => {
  try {
    // Read the file from the local URI
    const fileInfo = await FileSystem.getInfoAsync(photoUri);
    if (!fileInfo.exists) {
      throw new Error("File does not exist at the specified URI");
    }

    const blob = await FileSystem.readAsStringAsync(photoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const byteArray = Uint8Array.from(atob(blob), (c) => c.charCodeAt(0));

    // Generate a unique filename (e.g., using timestamp)
    const timestamp = new Date().getTime(); // Get current timestamp
    const filename = `image_${timestamp}.jpg`; // Example: image_1625162265104.jpg

    // Create a reference to the file in Firebase Storage with the generated filename
    const storageRef = ref(storage, `images/${filename}`);

    // Upload the Blob to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, byteArray);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error uploading image:", error);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL); // Resolve the promise with downloadURL
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(error);
            });
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadPhotoToFirebase;
