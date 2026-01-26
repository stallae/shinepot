import { SafeAreaView, Text, View } from 'react-native';
import React = require('react');
import { Logo, WideButton, BackButton } from '../../../../components';
import useColors from '../../../../hooks/useColors';
import { DeviceMobile, AppleLogo, GoogleLogo, ArrowLeft } from 'phosphor-react-native';
import { ROUTES, ScreenProps } from '../../../../navigation/types';

import { signInWithGoogle, signInWithApple } from '../../../../services/authService';

const LoginThirdParty: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useColors();


  const handleAppleSignIn = async () => {
    try {
      const userCredential = await signInWithApple();
      if (userCredential) {
        console.log('User signed in with Apple:', userCredential.user);
        navigation.navigate(ROUTES.Blog);
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithGoogle();
      console.log('User signed in:', userCredential.user);
      navigation.navigate(ROUTES.Blog); 
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return ( 
    <SafeAreaView
      className="flex-1 items-center"
      style={{ backgroundColor: colors.primary }}>
      <View className="absolute top-20 left-2">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
      </View>
      <View className=" absolute inset-x-0 bottom-0 justify-between h-5/6 mb-12">
        <Logo />
        <Text
          className="font-inter text-3xl font-bold text-center"
          style={{ color: colors.textPrimary }}>
          {'Get ready, the future is\nwaiting for you'}
        </Text>

        <View className="justify-between h-36 w-11/12 mx-auto">
          <WideButton
            icon={<AppleLogo weight="fill" />}
            text={'Sign in with Apple'}
            onPress={handleAppleSignIn}
            outlined={true}
          />
          <WideButton
            icon={<GoogleLogo />}
            text={'Sign in with Google'}
            outlined={true}
            onPress={handleGoogleSignIn}
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
