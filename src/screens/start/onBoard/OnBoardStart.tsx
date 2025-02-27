import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import ProgressBar from '../../../components/global/progressBar/progressBar.tsx';
import Logo from '../../../components/global/logo/logo.tsx';
import useColors from '../../../hooks/useColors.tsx';
import WideButton from '../../../components/global/buttons/wideButton.tsx';
import {Routes} from '../../../navigation/Routes.tsx';

const OnBoardStart = ({navigation}) => {
  const {colors} = useColors();
  return (
    <SafeAreaView
      className="flex-1 justify-between items-center"
      style={{backgroundColor: colors.primary}}>
      <ProgressBar progress={30} />

      <View>
        <Logo />
        <Text
          className="font-roboto font-semibold text-4xl mt-5 self-center text-center"
          style={{color: colors.textPrimary}}>
          {'SEND AND RECEIVE\nMESSAGES AT THE\nRIGHT TIME'}
        </Text>
      </View>
      <View className="w-full mb-4">
        <WideButton
          text={'Let`s go'}
          onPress={() => navigation.navigate(Routes.LoginStart)}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardStart;
