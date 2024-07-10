import React from 'react';
import { View, Text, Button } from 'react-native';

const SongsModal = ({toggleModal}) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>Songs</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
    );
};

export default SongsModal;