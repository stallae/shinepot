import { View, Text, SafeAreaView } from "react-native";
import { ScreenProps } from "../../navigation/types";
import React from "react";
import useColors from "../../hooks/useColors";

const Blog: React.FC<ScreenProps> = () => {
  const {colors} = useColors();
  return (
    <SafeAreaView
    className="flex-1"
    style={{backgroundColor: colors.primary}}>
        <View className="flex-1 justify-center items-center">
            <Text 
              className="font-inter text-2xl font-bold"
              style={{color: colors.textPrimary}}>
                Welcome to Blog Screen
            </Text>
        </View>
    </SafeAreaView>
  );
};

export default Blog; 