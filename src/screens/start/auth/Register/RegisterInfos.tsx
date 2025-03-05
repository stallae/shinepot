import {SafeAreaView, Text, View} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../../components/global/logo/logo.tsx';
import useColors from '../../../../hooks/useColors.tsx';
import WideButton from '../../../../components/global/buttons/wideButton.tsx';
import GeneralInput from '../../../../components/global/inputs/generalImput.tsx';
import {ROUTES, ScreenProps} from '../../../../navigation/types.ts';
import BackButton from '../../../../components/global/buttons/backButton.tsx';
import {ArrowLeft} from 'phosphor-react-native';
import Dropdown from '../../../../components/global/dropdown/dropdown.tsx';
import {countries} from '../../../../constants/countries.ts';

const RegisterInfos: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | number>('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleInputChange = (text: string, setter: (value: string) => void) => {
    setter(text);
  };

  return (
    <SafeAreaView
      className="flex-1 items-center"
      style={{backgroundColor: colors.primary}}>
      <View className="absolute top-20 left-10">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
      </View>

      <View className="flex-1 justify-center items-center w-full">
        <Logo />
        <View className="h-3/5 w-11/12 mt-10">
          <Text
            className="font-inter text-3xl font-bold mb-10 text-center"
            style={{color: colors.textPrimary}}>
            {'Creating your account'}
          </Text>
          <View className="w-full gap-y-4">
            
            <GeneralInput
              label={'Your new username:'}
              placeholder={'Create a username'}
              keyboardType="default"
              value={username}
              onChange={(text) => handleInputChange(text, setUsername)}
            />
            <GeneralInput
              label={'Date of birth:'}
              placeholder={'DD/MM/YYYY'}
              keyboardType="numeric"
              value={dateOfBirth}
              onChange={(text) => handleInputChange(text, setDateOfBirth)}
            />
            <View> 
            <Text
              className="font-inter font-medium mb-2"
              style={{color: colors.textPrimary}}
            >
              Phone number:
            </Text>
            <View className="flex-row gap-2">
              <View className="w-1/3">
                <Dropdown
                  options={countries}
                  value={selectedCountry}
                  placeholder="Country"
                  onChange={(value: string | number) => setSelectedCountry(value)}
                />
              </View>
              <View className="w-2/3">
                <GeneralInput
                  keyboardType="numeric"
                  placeholder={'Enter your phone number'}
                  value={phone}
                  onChange={(text) => handleInputChange(text, setPhone)}
                />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 justify-between mb-12 w-11/12 mx-auto">
        <WideButton
          text={'Next'}
          onPress={() => navigation.navigate(ROUTES.RegisterPassword)}
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterInfos;
