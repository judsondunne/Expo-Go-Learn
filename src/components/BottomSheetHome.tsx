import React from 'react';
import { View, Text } from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BottomSheetHome = ({bottomSheetRef, snapPoints, item}) => {
    return (
        <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Start with index -1 (closed state)
                snapPoints={snapPoints} 
                enablePanDownToClose
            >
                <View style={{ backgroundColor: 'white', padding: 16 }}>
                    <Text>{item.activities}</Text> 
                </View>
            </BottomSheet>
    );
};

export default BottomSheetHome;