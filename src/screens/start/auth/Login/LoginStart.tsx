import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import ProgressBar from '../../../../components/global/progressBar/progressBar.tsx';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import {Routes} from '../../../../navigation/Routes.tsx';

const LoginStart = ({navigation}) => {
  const {colors} = useColors();
  return (
    <SafeAreaView
      className="flex-1 justify-between items-center"
      style={{backgroundColor: colors.primary}}>
      <ProgressBar progress={100} />

      <View>
        <Logo />
        <Text
          className="font-roboto font-semibold text-4xl mt-5 text-center"
          style={{color: colors.textPrimary}}>
          {'SEND AND RECEIVE\nMESSAGES AT THE\nRIGHT TIME'}
        </Text>
      </View>
      <View className="w-full justify-between h-1/4 mb-4">
        <WideButton
          text={'Log In'}
          onPress={() => navigation.navigate(Routes.LoginOtp)}
        />
        <WideButton
          text={'Create account'}
          outlined={true}
          onPress={() => navigation.navigate(Routes.RegisterEmail)}
        />

        <WideButton
          text={'Sign in with others'}
          outlined={true}
          onPress={() => navigation.navigate(Routes.LoginThirdParty)}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginStart;
