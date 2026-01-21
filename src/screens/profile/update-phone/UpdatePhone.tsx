import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import BackButton from '../../../components/global/buttons/backButton';
import GeneralInput from '../../../components/global/inputs/generalImput';
import WideButton from '../../../components/global/buttons/wideButton';
import Dropdown from '../../../components/global/dropdown/dropdown';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ROUTES } from '../../../navigation/roots';
import { countries } from '../../../constants/countries';

const UpdatePhone = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [selectedCountry, setSelectedCountry] = useState<string | number>('');
    const [phone, setPhone] = useState('');

    const handleSendCode = () => {
        navigation.navigate(ROUTES.UpdatePhoneOtp, { phone, countryCode: selectedCountry.toString() });
    };

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            <View className="absolute top-20 left-2 z-10">
                <BackButton icon={<X />} onPress={navigation.goBack} />
            </View>

            <View className="flex-1 px-6 pt-24 justify-between pb-10">
                <View>
                    <Text className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
                        Update phone number
                    </Text>
                    <Text className="text-base mb-8" style={{ color: colors.textPrimary, opacity: 0.7 }}>
                        Enter your new phone number to receive the confirmation code via SMS.
                    </Text>

                    <Text className="font-inter font-medium mb-2" style={{ color: colors.textPrimary }}>
                        Your phone:
                    </Text>
                    <View className="flex-row gap-2">
                        <View className="w-[35%]">
                            <Dropdown
                                options={countries}
                                value={selectedCountry}
                                placeholder="Country"
                                onChange={(value) => setSelectedCountry(value)}
                            />
                        </View>
                        <View className="flex-1">
                            <GeneralInput
                                placeholder="935 401 862"
                                keyboardType="numeric"
                                value={phone}
                                onChange={setPhone}
                            />
                        </View>
                    </View>
                </View>

                <WideButton text="Send code" onPress={handleSendCode} isDisabled={!phone || !selectedCountry} />
            </View>
        </SafeAreaView>
    );
};

export default UpdatePhone;
