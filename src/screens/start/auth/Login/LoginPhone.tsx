import { SafeAreaView, Text, View, Alert } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import { signInWithPhoneNumber } from '../../../../services/authService';
import useColors from '../../../../hooks/useColors';
import { WideButton, GeneralInput, Logo, BackButton, Dropdown } from '../../../../components';
import { countries } from '../../../../constants/countries';
import { ScreenProps } from '../../../../navigation/types';
import { ArrowLeft } from 'phosphor-react-native';

const LoginPhone: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  const [selectedCountry, setSelectedCountry] = useState<string | number>('BR');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }
    setLoading(true);
    try {
      const countryOption = countries.find(c => c.value === selectedCountry);
      const dialCode = countryOption ? countryOption.dial_code : '+55';
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const fullNumber = `${dialCode}${cleanPhone}`;
      
      console.log('Sending code to:', fullNumber);
      
      const confirmation = await signInWithPhoneNumber(fullNumber);
      setLoading(false);
      navigation.navigate('LoginOtpPhone', { confirmation });
    } catch (error: any) {
      setLoading(false);
      console.error('Phone Auth Error:', error);
      Alert.alert('Authentication Failed', error.message || 'Unknown error');
    }
  };

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
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
          </View>
        </View>
      </View>
      <View className="absolute inset-x-0 bottom-12">
        <View className="w-11/12 mx-auto">
          <WideButton 
            text={loading ? 'Sending...' : 'Receive SMS code'}
            onPress={handleSendCode}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPhone;
