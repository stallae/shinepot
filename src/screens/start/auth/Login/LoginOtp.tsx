import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import GeneralInput from '../../../../components/global/inputs/generalImput.tsx';

const LoginOtp = () => {
  const {colors} = useColors();

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
          {'Enter the code received\nvia EMAIL'}
        </Text>
        <View>
          <View className="flex-row justify-center mt-3">
            {Array.from({length: 6}).map((_, index) => (
              <GeneralInput
                key={index}
                keyboardType="numeric"
                centerText
                inputRefs={inputRefs}
                index={index} // Pass the index for navigation
              />
            ))}
          </View>

          <Pressable>
            <Text className="text-blue-500 font-inter font-bold text-center mt-5">
              Resend code
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="absolute inset-x-0 bottom-12 w-full px-6">
        <WideButton text={'Log In'} />
      </View>
    </SafeAreaView>
  );
};

export default LoginOtp;
