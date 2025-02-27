import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import {Routes} from '../../../../navigation/Routes.tsx';

const RegisterVerified = ({navigation}) => {
  const {colors} = useColors();
  return (
    <SafeAreaView
      className="flex-1 justify-evenly items-center"
      style={{backgroundColor: colors.primary}}>
      <View className="w-full">
        <Logo />
        <Text
          className="font-roboto font-semibold text-4xl text-center mt-8"
          style={{color: colors.textPrimary}}>
          {'EMAIL\nVERIFIED'}
        </Text>
        <Text
          className="font-roboto font-semibold text-lg text-center mt-8"
          style={{color: colors.textPrimary}}>
          {
            'Thank you verifying your email!\nYou can now proceed to the next\n step.'
          }
        </Text>
        <View className="justify-between h-1/8 mt-10 ">
          <WideButton
            text={'Next'}
            onPress={() => navigation.navigate(Routes.RegisterVerified)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterVerified;
