import React from "react";
import { View, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Search from "../../app/search/search";
const CustomBottomSheet = ({ snapPoints, bottomSheetRef }) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0} // Ensure this matches your desired initial state
      snapPoints={snapPoints}
      onChange={(index) => {
        console.log("Bottom sheet index changed to:", index);
        if (index === snapPoints.length - 1) {
          console.log("Bottom sheet is at 100% snap point!");
        }
      }}
      enablePanDownToClose
      style={{ zIndex: -11 }}
    >
      {/* Bottom Sheet Content */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ marginTop: 6, fontWeight: "500", fontSize: 16 }}>
          1003 results
        </Text>
      </View>
      <Search />
    </BottomSheet>
  );
};

export default CustomBottomSheet;
