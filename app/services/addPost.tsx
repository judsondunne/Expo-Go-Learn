import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../src/config/firebase";
import { ref, uploadBytes } from "firebase/storage";

const addPost = async (title, content, image) => {
  try {
    // Convert image URL to Blob
    const response = await fetch(image);
    const blob = await response.blob();

    const docRef = addDoc(collection(db, "posts"), {
      title: title,
      content: content,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export default addPost;
