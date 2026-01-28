import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { EnvelopeSimple, X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import { BackButton, GeneralInput, WideButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ROUTES } from '../../../navigation/roots';
import auth from '@react-native-firebase/auth';

const UpdateEmail = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [isRestricted, setIsRestricted] = useState(false);

    React.useEffect(() => {
        const user = auth().currentUser;
        if (user) {
            const isSSO = user.providerData.some(
                (userInfo) => userInfo.providerId === 'google.com' || userInfo.providerId === 'apple.com' || userInfo.providerId === 'apple.com'
            );
            setIsRestricted(isSSO);
        }
    }, []);

    const handleContinue = () => {
        navigation.navigate(ROUTES.UpdateEmailConfirm, { email });
    };

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            <View className="absolute top-20 left-2 z-10">
                <BackButton icon={<X />} onPress={navigation.goBack} />
            </View>

            <View className="flex-1 px-6 pt-24 justify-between pb-10">
                <View>
                    <Text className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
                        {isRestricted ? 'Email managed by provider' : 'Update email'}
                    </Text>
                    <Text className="text-base mb-8" style={{ color: colors.textPrimary, opacity: 0.7 }}>
                        {isRestricted 
                            ? 'You are logged in with a third-party provider (Google/Apple). Your email is managed by them.' 
                            : 'Enter your new email'}
                    </Text>

                    {!isRestricted && (
                        <GeneralInput
                            label="Your new email:"
                            placeholder="exemplo@gmail.com"
                            icon={<EnvelopeSimple color={colors.textPrimary} />}
                            value={email}
                            onChange={setEmail}
                            keyboardType="email-address"
                        />
                    )}
                </View>

                {!isRestricted && (
                    <WideButton text="Continue" onPress={handleContinue} isDisabled={!email} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default UpdateEmail;
