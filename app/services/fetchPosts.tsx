import { collection, getDoc, doc, onSnapshot } from "firebase/firestore";

import { db } from "../../src/config/firebase";

const fetchPosts = (setPosts) => {
  const postsQuery = collection(db, "posts");
  const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
    const postsList = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPosts(postsList);
  });
  return () => unsubscribe();
};

export default fetchPosts;
