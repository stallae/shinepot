import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { X, EyeSlash, Eye } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import { BackButton, GeneralInput, WideButton } from '../../../components';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ROUTES } from '../../../navigation/roots';

type UpdateEmailPasswordRouteProp = RouteProp<RootStackParamList, 'UpdateEmailPassword'>;

const UpdateEmailPassword = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<UpdateEmailPasswordRouteProp>();
    const { email } = route.params;
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                        Enter your password
                    </Text>
                    <Text className="text-base mb-8" style={{ color: colors.textPrimary, opacity: 0.7 }}>
                        For security reasons, please enter your password to change your email.
                    </Text>

                    <GeneralInput
                        label="Your password"
                        placeholder="**********"
                        secureText={!showPassword}
                        value={password}
                        onChange={setPassword}
                        keyboardType="default"
                        rightIcon={!showPassword ? <EyeSlash color={colors.textPrimary} /> : <Eye color={colors.textPrimary} />}
                        onRightIconPress={() => setShowPassword(!showPassword)}
                    />

                    <TouchableOpacity className="mt-4">
                        <Text className="font-bold underline" style={{ color: '#3b82f6' }}>Forgot my password</Text>
                    </TouchableOpacity>
                </View>

                <WideButton text="Continue" onPress={handleContinue} isDisabled={!password} />
            </View>
        </SafeAreaView>
    );
};

export default UpdateEmailPassword;
