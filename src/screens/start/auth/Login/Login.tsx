import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import GeneralInput from '../../../../components/global/inputs/generalImput.tsx';
import {ROUTES, ScreenProps} from '../../../../navigation/types';
import BackButton from '../../../../components/global/buttons/backButton.tsx';
import {ArrowLeft} from 'phosphor-react-native';

const Login: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();

  return (
    <SafeAreaView
      className="flex-1 items-center"
      style={{backgroundColor: colors.primary}}>
      <View className="absolute top-20 left-2">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
      </View>

      <View className="flex-1 justify-center items-center w-full">
        <Logo />
        <View className="h-2/5 w-full mt-10">
          <Text
            className="font-inter text-3xl font-bold mb-10 text-center"
            style={{color: colors.textPrimary}}>
            {'Log In'}
          </Text>
          <View className="w-11/12 mx-auto gap-y-4">
            <GeneralInput
              label={'Your email:'}
              placeholder={'Enter your email address'}
              keyboardType="email-address"
            />
            <GeneralInput
              label={'Your password:'}
              placeholder={'Enter your password'}
              keyboardType="default"
              secureText = {true}
            />
          </View>
        </View>
      </View>

      <View className="absolute inset-x-0 bottom-0 mb-12">
        <View className="w-11/12 mx-auto">
          <View className="flex-row justify-center mb-4">
            <Text className="font-inter font-medium color-gray-250">
              Forgot Password? You can{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate(ROUTES.RecoverPassword)}> 
              <Text className="font-inter font-bold text-blue-500">Recover it</Text>
            </Pressable>
          </View>
          <WideButton
            text={'Log In'}
            onPress={() => navigation.navigate(ROUTES.LoginOtp)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
