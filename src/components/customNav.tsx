import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { Link } from "expo-router";

const customNav = () => {
  return (
    <View style={{ height: 30 }}>
      <Link href="">
        <Ionicons name="home-outline" />
      </Link>
    </View>
  );
};
