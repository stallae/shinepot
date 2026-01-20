import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { EnvelopeSimple, X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import BackButton from '../../../components/global/buttons/backButton';
import GeneralInput from '../../../components/global/inputs/generalImput';
import WideButton from '../../../components/global/buttons/wideButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ROUTES } from '../../../navigation/roots';

const UpdateEmail = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');

    const handleContinue = () => {
        navigation.navigate(ROUTES.UpdateEmailPassword, { email });
    };

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            <View className="absolute top-20 left-2 z-10">
                <BackButton icon={<X />} onPress={navigation.goBack} />
            </View>

            <View className="flex-1 px-6 pt-24 justify-between pb-10">
                <View>
                    <Text className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
                        Update email
                    </Text>
                    <Text className="text-base mb-8" style={{ color: colors.textPrimary, opacity: 0.7 }}>
                        Enter your new email
                    </Text>

                    <GeneralInput
                        label="Your new email:"
                        placeholder="exemplo@gmail.com"
                        icon={<EnvelopeSimple color={colors.textPrimary} />}
                        value={email}
                        onChange={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <WideButton text="Continue" onPress={handleContinue} isDisabled={!email} />
            </View>
        </SafeAreaView>
    );
};

export default UpdateEmail;
