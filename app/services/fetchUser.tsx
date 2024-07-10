import { collection, getDoc, doc, onSnapshot } from "firebase/firestore";

import { db } from "../../src/config/firebase";

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

export default fetchUser;
