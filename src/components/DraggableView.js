import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TextInput,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const DraggableView = () => {
  const [fontSize, setFontSize] = useState(10);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = x.value;
      context.startY = y.value;
      //setFontSize(15)
    },
    onActive: (event, context) => {
      x.value = context.startX + event.translationX;
      y.value = context.startY + event.translationY;
    },
    onEnd: () => {
     console.log("hello")
     //setFontSize(10)
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <TextInput placeholder='iiii.' style={{fontSize: 10}} />
            
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionText: {
    marginTop: 10,
    fontSize: 12,
    color: 'black',
  },
});

export default DraggableView;
