import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wide-button.tsx';
import {DeviceMobile, AppleLogo, GoogleLogo, ArrowLeft} from 'phosphor-react-native';
import {ROUTES, ScreenProps} from '../../../../navigation/types';
import BackButton from '../../../../components/global/buttons/back-button.tsx';


const LoginThirdParty: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  return (
    <SafeAreaView
      className="flex-1 items-center"
      style={{backgroundColor: colors.primary}}>
      <View className="absolute top-20 left-2">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
      </View>
      <View className=" absolute inset-x-0 bottom-0 justify-between h-5/6 mb-12">
        <Logo />
        <Text
          className="font-inter text-3xl font-bold text-center"
          style={{color: colors.textPrimary}}>
          {'Get ready, the future is\nwaiting for you'}
        </Text>

        <View className="justify-between h-36 w-11/12 mx-auto">
          <WideButton
            icon={<AppleLogo  weight="fill"/>}
            text={'Sign in with Apple'}
            outlined={true}
          />
          <WideButton
            icon={<GoogleLogo />}
            text={'Sign in with Google'}
            outlined={true}
          />
        </View>
        <Text className="font-inter font-bold text-center text-gray-350 mb-4  ">
          Or enter with
        </Text>
        <View className="w-11/12 mx-auto">
          <WideButton
            icon={<DeviceMobile />}
            text={'Sign in with Phone Number'}
            onPress={() => navigation.navigate(ROUTES.LoginPhone)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginThirdParty;
