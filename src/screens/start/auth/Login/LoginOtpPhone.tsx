import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import GeneralInput from '../../../../components/global/inputs/generalImput.tsx';
import {ROUTES, ScreenProps} from '../../../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../../../navigation/types';

const LoginOtpPhone: React.FC<ScreenProps> = () => {
  const {colors} = useColors();
  const rootNavigation = useNavigation<RootNavigationProp>();

  const inputRefs = Array.from({length: 6}, () => useRef<TextInput>(null));
  return (
    <SafeAreaView
      className="flex-1 items-center justify-center px-6"
      style={{backgroundColor: colors.primary}}>
      <View className="w-full items-centers h-3/4 justify-center">
        <Logo />
        <Text
          className="font-inter text-2xl font-bold text-center mt-10 mb-16"
          style={{color: colors.textPrimary}}>
          {'Enter the code received\nvia Phone'}
        </Text>
        <View>
          <View className="flex-row justify-center mt-3 px-3">
            {Array.from({length: 6}).map((_, index) => (
              <GeneralInput
                key={index}
                keyboardType="numeric"
                centerText
                isOtp={true}
                inputRefs={inputRefs}
                index={index} 
              />
            ))}
          </View>

          <Pressable onPress={() => rootNavigation.reset({
            index: 0,
            routes: [{ name: ROUTES.Blog }],
          })}>
            <Text className="text-blue-500 font-inter font-bold text-center mt-5">
              Resend code
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="absolute inset-x-0 bottom-12 w-full px-6">
        <WideButton 
          text={'Log In'} 
          onPress={() => rootNavigation.reset({
            index: 0,
            routes: [{ name: ROUTES.Blog }],
          })}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginOtpPhone;
