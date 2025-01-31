import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const WideButton = text => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View className="bg-blue-500 rounded-lg w-10/12 h-2/6 justify-center items-center self-center">
        <Text className="color-gray-100">a</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WideButton;
