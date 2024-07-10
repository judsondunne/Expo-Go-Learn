import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import DraggableView from './DraggableView';

const DraggableText = ({ text, onChangeText, onDragEnd }) => {
  return (
    <DraggableView onDragEnd={onDragEnd}>
      
    </DraggableView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
});

export default DraggableText;
