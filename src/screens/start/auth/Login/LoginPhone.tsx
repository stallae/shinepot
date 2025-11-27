import { SafeAreaView, Text,  View} from 'react-native';
import React, { useState } from 'react';
import useColors from '../../../../hooks/useColors.tsx';
import {WideButton, GeneralInput, Logo, BackButton, Dropdown  } from '../../../../components';
import { countries } from '../../../../constants/countries.ts';
import {ScreenProps } from '../../../../navigation/types';
import { ArrowLeft } from 'phosphor-react-native';
const LoginPhone: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  const [selectedCountry, setSelectedCountry] = useState<string | number>('');

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center"
      style={{backgroundColor: colors.primary}}>
      <View className="absolute top-20 left-2">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
      </View>
      <View className="w-full items-centers h-3/4 justify-center">
        <Logo />
        <Text
          className="font-inter text-2xl font-bold text-center mt-10 mb-16"
          style={{color: colors.textPrimary}}>
          {'Your Phone'}
        </Text>
        <View className='flex-row justify-center items-center gap-2 w-11/12 mx-auto'>
          <View className='w-1/3'>
          <Dropdown
            options={countries}
            value={selectedCountry}
            placeholder="Country"
            onChange={(value: string | number) => setSelectedCountry(value)}
          />
          </View>
          <View className='w-2/3'>
          <GeneralInput
            keyboardType="numeric"
            placeholder={'Enter your phone number'}
          />
          </View>
        </View>
      </View>
      <View className="absolute inset-x-0 bottom-12">
        <View className="w-11/12 mx-auto">
          <WideButton 
            text={'Receive SMS code'}
            onPress={() => navigation.navigate('LoginOtpPhone')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPhone;
