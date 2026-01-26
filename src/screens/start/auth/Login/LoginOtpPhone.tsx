import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import React = require('react');
import {useRef, useState} from 'react';
import useColors from '../../../../hooks/useColors';
import {WideButton, GeneralInput, Logo} from '../../../../components';
import {ROUTES, ScreenProps} from '../../../../navigation/types';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootNavigationProp } from '../../../../navigation/types';
import { AuthStackParamList } from '../../../../navigation/roots';
import { confirmCode } from '../../../../services/authService';

const LoginOtpPhone: React.FC<ScreenProps> = () => {
  const {colors} = useColors();
  const rootNavigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<AuthStackParamList, 'LoginOtpPhone'>>();
  const  confirmation  = route.params?.confirmation;

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtpChange = (text: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
  }

  const handleConfirm = async () => {
      const code = otp.join('');
      if (code.length < 6) return;
      setLoading(true);
      try {
          if (confirmation) {
            await confirmCode(confirmation, code);
          }
          rootNavigation.reset({
            index: 0,
            routes: [{ name: ROUTES.Blog }],
          });
      } catch (error) {
          console.error(error);
          setLoading(false);
          // Handle error
      }
  }

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
                value={otp[index]}
                onChange={(text) => handleOtpChange(text, index)}
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
          text={loading ? 'Verifying...' : 'Log In'} 
          onPress={handleConfirm}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginOtpPhone;
