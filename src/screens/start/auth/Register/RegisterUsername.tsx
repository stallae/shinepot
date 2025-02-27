import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import GeneralInput from '../../../../components/global/inputs/generalImput.tsx';
import {Routes} from '../../../../navigation/Routes.tsx';
import BackButton from '../../../../components/global/buttons/backButton.tsx';
import {ArrowLeft} from 'phosphor-react-native';

const RegisterUsername = ({navigation}) => {
  const {colors} = useColors();

  return (
    <SafeAreaView
      className="flex-1 items-center"
      style={{backgroundColor: colors.primary}}>
      <View className="absolute top-20 left-10">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
      </View>

      <View className="flex-1 justify-center items-center w-full">
        <Logo />
        <View className="h-2/5 w-full mt-10">
          <Text
            className="font-inter text-3xl font-bold mb-10 text-center"
            style={{color: colors.textPrimary}}>
            {'Creating your account'}
          </Text>
          <View className="ml-8 w-full">
            <GeneralInput
              label={'Your new username:'}
              placeholder={'Create an username'}
            />
          </View>
        </View>
      </View>

      <View className="absolute inset-x-0 bottom-0 justify-between mb-12 w-full">
        <WideButton
          text={'Next'}
          onPress={() => navigation.navigate(Routes.RegisterOtp)}
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterUsername;
