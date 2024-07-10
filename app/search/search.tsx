import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import fetchPosts from "../services/fetchPosts";
import RenderedPosts from "../../src/components/renderedPosts";
import encodeFilename from "../services/customDecode";
import { useRouter } from "expo-router";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchPosts(setPosts);
  });
  return (
    <View style={{ paddingTop: 200 }}>
      <RenderedPosts posts={posts} />
    </View>
  );
};

export default Search;
