import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useState} from 'react';
import * as React from 'react'
import {Logo, WideButton, GeneralInput, BackButton} from '../../../../components';
import useColors from '../../../../hooks/useColors';
import {X} from 'phosphor-react-native';
import {ROUTES, ScreenProps} from '../../../../navigation/types';

const RegisterStart: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  const [fullName, setFullName] = useState('');

  const handleInputChange = (text: string, setter: (value: string) => void) => {
    setter(text);
  };


  return (
    <SafeAreaView
      className="flex-1 justify-between items-center"
      style={{backgroundColor: colors.primary}}>
      <View className="absolute top-20 left-2">
        <BackButton icon={<X />} onPress={navigation.goBack} />
      </View>

      <View className="flex-1 justify-center w-full items-center">
        <Logo />
        <View className="h-2/5 w-11/12 justify-between mt-10 ">
          <View className=" h-1/3 w-full justify-between gap-y-4">
            <Text
              className="font-inter text-3xl font-bold mb-10"
              style={{color: colors.textPrimary}}>
              {'Enter your email address'}
            </Text>

            <GeneralInput
              label={'Your email:'}
              keyboardType={'email-address'}
              placeholder={'Enter your email address'}
            />
            <GeneralInput
              label={'Your full name:'}
              placeholder={'Enter your full name'}
              keyboardType="default"
              value={fullName}
              onChange={(text) => handleInputChange(text, setFullName)}
            />
          </View>
        </View>
      </View>

      <View className="w-full mb-10">
        <View className="flex-row flex-wrap justify-center align-middle">
          <Text className="font-inter font-medium color-gray-250">
            By signing up, you agree to our{' '}
          </Text>
          <Pressable onPress={() => navigation.navigate(ROUTES.PrivacyPolicy)}>
            <Text className="font-inter font-medium color-blue-500 underline">
              Privacy Policy
            </Text>
          </Pressable>
        </View>
        <View className="flex-row flex-wrap justify-center align-middle mb-5">
          <Text className="font-inter font-medium color-gray-250"> and </Text>
          <Pressable onPress={() => navigation.navigate(ROUTES.TermsOfUse)}>
            <Text className="font-inter font-medium color-blue-500 underline">
              Terms of Use
            </Text>
          </Pressable>
        </View>
        <View className="w-11/12 mx-auto">
        <WideButton
          text={'Next'}
            onPress={() => navigation.navigate(ROUTES.RegisterInfos)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterStart;
