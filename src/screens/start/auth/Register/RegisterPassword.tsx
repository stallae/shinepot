import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useState} from 'react';
import * as React from 'react'
import {Logo, WideButton, GeneralInput, BackButton} from '../../../../components';
import useColors from '../../../../hooks/useColors';
import {ArrowLeft} from 'phosphor-react-native';
import {ROUTES, ScreenProps} from '../../../../navigation/types';

const RegisterPassword: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (text: string, setter: (value: string) => void) => {
    setter(text);
  };

  const handlePress = (type: string) => {
    console.log(`Clicked on ${type}`);
  };

  return (
    <SafeAreaView
      className="flex-1 justify-between items-center"
      style={{backgroundColor: colors.primary}}>
     <View className="absolute top-20 left-2">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
      </View>

      <View className="flex-1 justify-center w-full items-center">
        <Logo />
        <View className="h-2/5 w-11/12 justify-between mt-10 ">
          <View className=" h-1/3 w-full justify-between gap-y-4">
            <Text
              className="font-inter text-3xl font-bold mb-10"
              style={{color: colors.textPrimary}}>
              {'Create a password'}
            </Text>

            <GeneralInput
              label={'Your password:'}
              keyboardType={'default'}
              placeholder={'Enter your password'}
              value={password}
              secureText={true}
              onChange={(text) => handleInputChange(text, setPassword)}
            />
            <GeneralInput
              label={'Confirm password:'}
              placeholder={'Confirm your password'}
              keyboardType="default"
              value={confirmPassword}
              secureText={true}
              onChange={(text) => handleInputChange(text, setConfirmPassword)}
            />
          </View>
        </View>
      </View>

      <View className="w-full mb-10">
        <View className="flex-row flex-wrap justify-center align-middle">
          <Text className="font-inter font-medium color-gray-250">
            By signing up, you agree to our{' '}
          </Text>
          <Pressable onPress={() => handlePress('Privacy')}>
            <Text className="font-inter font-medium color-blue-500 underline">
              Privacy
            </Text>
          </Pressable>
        </View>
        <View className="flex-row flex-wrap justify-center align-middle mb-5">
          <Pressable onPress={() => handlePress('Policy')}>
            <Text className="font-inter font-medium color-blue-500 underline">
              Policy
            </Text>
          </Pressable>
          <Text className="font-inter font-medium color-gray-250"> and </Text>
          <Pressable onPress={() => handlePress('Terms of Use')}>
            <Text className="font-inter font-medium color-blue-500 underline">
              Terms of Use
            </Text>
          </Pressable>
        </View>
        <View className="w-11/12 mx-auto">
        <WideButton
          text={'Next'}
            onPress={() => navigation.navigate(ROUTES.RegisterOtp)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPassword;
