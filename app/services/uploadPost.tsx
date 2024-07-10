import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../src/config/firebase";
import encodeFilename from "./customDecode";

const uploadPost = async (
  router,
  content,
  lat,
  long,
  userId,
  address,
  photoLink,
  activities
) => {
  console.log("Starting post upload");
  try {
    const decodedPhotoLink = encodeFilename(photoLink);
    console.log("Encoded photo link:", decodedPhotoLink);

    const docRef = await addDoc(collection(db, "posts"), {
      title: "test",
      content: content,
      lat: lat,
      long: long,
      userId: userId,
      address: address,
      time: Timestamp.now(),
      photoLink: decodedPhotoLink,
      activities: activities,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }

  console.log("Post upload completed");
};

export default uploadPost;
