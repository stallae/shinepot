import { useState, useEffect } from 'react';
import * as React from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import BackButton from '../../../components/global/buttons/backButton';
import GeneralInput from '../../../components/global/inputs/generalImput';
import WideButton from '../../../components/global/buttons/wideButton';
import Dropdown from '../../../components/global/dropdown/dropdown';
import { useNavigation } from '@react-navigation/native';
import { countriesList } from '../../../constants/addressData';
import { getUser, updateUser } from '../../../services/userService';
import auth from '@react-native-firebase/auth';
import { User } from '../../../interfaces/auth';

const PersonalInfoAddress = () => {
  const { colors } = useColors();
  const navigation = useNavigation();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState<string | number>('');

  useEffect(() => {
    const fetchUser = async () => {
        const currentUser = auth().currentUser;
        if (currentUser) {
            const userData = await getUser(currentUser.uid);
            if (userData && userData.addressDetails) {
                setAddress(userData.addressDetails.street || '');
                setCity(userData.addressDetails.city || '');
                setPostalCode(userData.addressDetails.zipCode || '');
                setState(userData.addressDetails.state || '');
                setCountry(userData.addressDetails.country || '');
            }
        }
    };
    fetchUser();
  }, []);

  const handlePostalCodeChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 5) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
    }
    setPostalCode(formatted);
  };

  const handleSave = async () => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const addressDetails = {
        street: address,
        city,
        zipCode: postalCode,
        state,
        country: country.toString(),
        number: '', // Add fields if UI supports them later
        complement: ''
    };

    const updates: Partial<User> = {
        addressDetails
    };

    try {
        await updateUser(currentUser.uid, updates);
        navigation.goBack();
    } catch (error) {
        console.error("Failed to save address", error);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
      <View className="absolute top-20 left-6 z-10">
        <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
      </View>

      <ScrollView className="flex-1 px-6 pt-24" showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold mb-8" style={{ color: colors.textPrimary }}>
          Address details
        </Text>

        <View className="gap-6 pb-10">
          <Dropdown
            label="Country"
            options={countriesList}
            value={country}
            placeholder="Select country"
            onChange={(val) => setCountry(val)}
          />

          <GeneralInput
            label="State"
            placeholder="Minas Gerais"
            value={state}
            onChange={setState}
            keyboardType="default"
          />

          <GeneralInput
            label="City"
            placeholder="Pouso Alegre"
            value={city}
            onChange={setCity}
            keyboardType="default"
          />

          <GeneralInput
            label="Address"
            placeholder="Rua Heitor Carline, casa n 24"
            value={address}
            onChange={setAddress}
            keyboardType="default"
          />

          <GeneralInput
            label="Postal code"
            placeholder="00000-000"
            keyboardType="numeric"
            value={postalCode}
            onChange={handlePostalCodeChange}
          />
        </View>
      </ScrollView>

      <View className="px-6 pb-12">
        <WideButton text="Save" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoAddress;
