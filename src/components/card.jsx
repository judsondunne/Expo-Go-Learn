import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Card = ({ item, onDelete }) => {
  const router = useRouter();

  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#E8E8E8",
        width: 390,
        borderRadius: 20,
        marginTop: 20,
      }}
    >
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{item.title}</Text>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 20 }}>{item.content}</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 30 }}>
        <View
          style={{ padding: 10, backgroundColor: "white", borderRadius: 10 }}
        >
          <TouchableOpacity onPress={handleDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginLeft: 10,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <Link
            href={{
              pathname: "/display/display",
              params: {
                itemTitle: item.title,
                itemContent: item.content,
                timeStamp: item.time,
              },
            }}
          >
            Details
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Card;
