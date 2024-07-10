import React, { useMemo, useRef } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetHome from './BottomSheetHome';

const HomePhoto = ({ item }) => {
    const { width, height } = Dimensions.get("window");
    const bottomSheetRef = useRef(null);
    
    const snapPoints = useMemo(() => ["8%", "50%", "100%"], []);

    const handlePostPress = () => {
        bottomSheetRef.current?.snapToIndex(1); // Snap to the first snap point index (50%)
    };

    return (
        <GestureHandlerRootView>
            <View style={{ width: width, height: height - 80, marginBottom: 2 }}>
                <TouchableOpacity onPress={handlePostPress}>
                    <Image
                        style={{ width: "100%", height: "100%", borderRadius: 10 }}
                        source={{ uri: item.photoLink }}
                        onError={(error) =>
                            console.error(`Failed to load image: ${item.photoLink}`, error)
                        }
                    />
                </TouchableOpacity>
            </View>

            <BottomSheetHome bottomSheetRef={bottomSheetRef} item={item} snapPoints={snapPoints}/>
        </GestureHandlerRootView>
    );
};

export default HomePhoto;
