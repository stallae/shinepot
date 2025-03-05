import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import BackButton from "../../../../components/global/buttons/backButton.tsx";
import {ArrowLeft} from "phosphor-react-native";
import {ROUTES, ScreenProps} from '../../../../navigation/types';

const RegisterOtp: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  return (
    <SafeAreaView
      className="flex-1 justify-evenly items-center"
      style={{backgroundColor: colors.primary}}>
      <View className="absolute top-20 left-2"><BackButton icon=<ArrowLeft /> onPress={navigation.goBack} /></View>
      <View className="w-full">
        <Logo />
        <Text
          className="font-roboto font-semibold text-4xl text-center mt-8"
          style={{color: colors.textPrimary}}>
          {'CHECK YOUR\nEMAIL'}
        </Text>
        <Text
          className="font-roboto font-semibold text-lg text-center mt-8"
          style={{color: colors.textPrimary}}>
          {'Check your email, we just sent you a\nconfirmation code.'}
        </Text>
        <View className="justify-between w-11/12 h-1/4 mt-10 mx-auto">
          <WideButton
            text={'Open your email to approve'}
            onPress={() => navigation.navigate(ROUTES.RegisterVerified)}
          />
          <WideButton text={'Resend code (1:32)'} outlined={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterOtp;
