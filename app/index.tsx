import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../src/config/firebase";
import Card from "../src/components/card";
import { Redirect } from "expo-router";

import { Host } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableView from "../src/components/DraggableView";
//import DraggableView from './components/DraggableView';

const index = () => {
  return (
    
      <GestureHandlerRootView>
        <Redirect href="/home" />
      </GestureHandlerRootView>
      
  );
};

export default index;
