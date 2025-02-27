import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import {DeviceMobile, AppleLogo, GoogleLogo} from 'phosphor-react-native';

const LoginThirdParty = () => {
  const {colors} = useColors();
  return (
    <SafeAreaView
      className="flex-1 items-center"
      style={{backgroundColor: colors.primary}}>
      <View className="absolute inset-x-0 bottom-0 justify-between h-5/6 mb-12">
        <Logo />
        <Text
          className="font-inter text-3xl font-bold text-center"
          style={{color: colors.textPrimary}}>
          {'Get ready, the future is\nwaiting for you'}
        </Text>

        <View className="justify-between h-36 ">
          <WideButton
            icon=<AppleLogo  weight="fill"/>
            text={'Sign in with Apple'}
            outlined={true}
          />
          <WideButton
            icon=<GoogleLogo />
            text={'Sign in with Google'}
            outlined={true}
          />
        </View>
        <Text className="font-inter font-bold text-center text-gray-350">
          Or enter with
        </Text>

        <WideButton icon=<DeviceMobile /> text={'Sign in with Phone Number'} />
      </View>
    </SafeAreaView>
  );
};

export default LoginThirdParty;
