import * as React from 'react';
import { useRef, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import { BackButton, GeneralInput, WideButton } from '../../../components';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ROUTES } from '../../../navigation/roots';

type UpdatePhoneOtpRouteProp = RouteProp<RootStackParamList, 'UpdatePhoneOtp'>;

const UpdatePhoneOtp = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<UpdatePhoneOtpRouteProp>();
    const { phone } = route.params;

    const ref0 = useRef<TextInput>(null);
    const ref1 = useRef<TextInput>(null);
    const ref2 = useRef<TextInput>(null);
    const ref3 = useRef<TextInput>(null);
    const ref4 = useRef<TextInput>(null);
    const ref5 = useRef<TextInput>(null);
    const inputRefs = [ref0, ref1, ref2, ref3, ref4, ref5];

    const [code, setCode] = useState(Array(6).fill(''));

    const handleContinue = () => {
        navigation.navigate(ROUTES.UpdatePhoneConfirm, { phone });
    };

    const handleChangeCode = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    };

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            <View className="absolute top-20 left-2 z-10">
                <BackButton icon={<ArrowLeft />} onPress={navigation.goBack} />
            </View>

            <View className="flex-1 px-6 pt-24 justify-between pb-10">
                <View>
                    <Text className="text-3xl font-bold mb-2" style={{ color: colors.textPrimary }}>
                        We just sent you an SMS
                    </Text>
                    <Text className="text-base mb-8" style={{ color: colors.textPrimary, opacity: 0.7 }}>
                        Enter the confirmation code we sent to *****{phone.slice(-4)}
                    </Text>

                    <View className="flex-row items-center mb-6">
                        {inputRefs.map((_, index) => (
                            <GeneralInput
                                key={index}
                                isOtp={true}
                                inputRefs={inputRefs}
                                index={index}
                                keyboardType="numeric"
                                centerText={true}
                                value={code[index]}
                                onChange={(text) => handleChangeCode(text, index)}
                            />
                        ))}
                    </View>

                    <TouchableOpacity>
                        <Text className="font-bold underline text-center" style={{ color: '#3b82f6' }}>Didn&apos;t receive the code?</Text>
                    </TouchableOpacity>
                </View>

                <WideButton text="Continue" onPress={handleContinue} isDisabled={code.some(c => c === '')} />
            </View>
        </SafeAreaView>
    );
};

export default UpdatePhoneOtp;
