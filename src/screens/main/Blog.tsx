import {View, SafeAreaView} from 'react-native';
import {ScreenProps} from '../../navigation/types';
import React from 'react';
import useColors from '../../hooks/useColors';
import Header from '../../components/global/header/header.tsx';

const Blog: React.FC<ScreenProps> = () => {
  const {colors} = useColors();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: colors.primary}}>
      <View className="flex-1 justify-center items-center">
        <Header />
      </View>
    </SafeAreaView>
  );
};

export default Blog;
