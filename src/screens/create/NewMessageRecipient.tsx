import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewMessageStackParamList, ROUTES } from '../../navigation/roots';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { Header, WideButton, GeneralInput } from '../../components';
import { RouteProp } from '@react-navigation/native';
import { User, UserPlus } from 'phosphor-react-native';

const NewMessageRecipient: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<StackNavigationProp<NewMessageStackParamList>>();
    const route = useRoute<RouteProp<NewMessageStackParamList, 'NewMessageRecipient'>>();
    const [recipientType, setRecipientType] = useState<'self' | 'other'>('self');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');

    const handleKeepGoing = () => {
        if (!route.params?.data) return;
        
        const { data } = route.params;
        const recipientData = {
            ...data,
            recipient: recipientType === 'self' 
                ? { type: 'self' as const }
                : {
                    type: 'other' as const,
                    email: recipientEmail || undefined,
                    phone: recipientPhone || undefined,
                },
            date: typeof data.date === 'string' ? data.date : data.date.toISOString(),
        };

        switch (data.contentType) {
            case 'text':
                navigation.navigate(ROUTES.NewMessageText, { data: recipientData });
                break;
            case 'image':
                navigation.navigate(ROUTES.NewMessageImage, { data: recipientData });
                break;
            case 'audio':
                navigation.navigate(ROUTES.NewMessageAudio, { data: recipientData });
                break;
            case 'video':
                navigation.navigate(ROUTES.NewMessageVideo, { data: recipientData });
                break;
            default:
                console.error('Unknown content type:', data.contentType);
        }
    };

    const canProceed = recipientType === 'self' || recipientEmail.length > 0 || recipientPhone.length > 0;

    return (
        <SafeAreaView
            className="flex-1"
            style={{ backgroundColor: colors.primary }}>
            <Header />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1 pt-10"
                    contentContainerStyle={{ paddingBottom: 32 }}>
                    <View className="px-6">
                        <Text
                            className="text-heading-lg mb-4"
                            style={{ color: colors.textPrimary }}>
                            Who should receive this message?
                        </Text>
                        <Text
                            className="text-body-secondary mb-8"
                            style={{ color: colors.textPrimary, opacity: 0.6 }}>
                            Choose yourself or someone else to receive this private message.
                        </Text>

                        <View className="mb-8">
                            <Pressable
                                onPress={() => setRecipientType('self')}
                                className={`rounded-xl p-4 mb-4 border-2 ${
                                    recipientType === 'self' ? 'border-blue-500' : 'border-transparent'
                                }`}
                                style={{
                                    backgroundColor: colors.secondary,
                                    borderColor: recipientType === 'self' ? '#0183FD' : 'transparent',
                                }}>
                                <View className="flex-row items-center">
                                    <User 
                                        size={24} 
                                        color={recipientType === 'self' ? '#0183FD' : colors.textPrimary} 
                                        weight={recipientType === 'self' ? 'bold' : 'regular'}
                                    />
                                    <Text
                                        className="text-body-primary ml-3 font-bold"
                                        style={{ color: colors.textPrimary }}>
                                        Send to myself
                                    </Text>
                                </View>
                            </Pressable>

                            <Pressable
                                onPress={() => setRecipientType('other')}
                                className={`rounded-xl p-4 border-2 ${
                                    recipientType === 'other' ? 'border-blue-500' : 'border-transparent'
                                }`}
                                style={{
                                    backgroundColor: colors.secondary,
                                    borderColor: recipientType === 'other' ? '#0183FD' : 'transparent',
                                }}>
                                <View className="flex-row items-center mb-4">
                                    <UserPlus 
                                        size={24} 
                                        color={recipientType === 'other' ? '#0183FD' : colors.textPrimary} 
                                        weight={recipientType === 'other' ? 'bold' : 'regular'}
                                    />
                                    <Text
                                        className="text-body-primary ml-3 font-bold"
                                        style={{ color: colors.textPrimary }}>
                                        Send to someone else
                                    </Text>
                                </View>

                                {recipientType === 'other' && (
                                    <View className="mt-2">
                                        <GeneralInput
                                            placeholder="Email address"
                                            value={recipientEmail}
                                            onChange={setRecipientEmail}
                                            keyboardType="email-address"
                                        />
                                        <Text
                                            className="text-body-secondary text-center my-3"
                                            style={{ color: colors.textPrimary, opacity: 0.5 }}>
                                            or
                                        </Text>
                                        <GeneralInput
                                            placeholder="Phone number"
                                            value={recipientPhone}
                                            onChange={setRecipientPhone}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="px-6 pb-6">
                <WideButton
                    text="Keep going"
                    onPress={handleKeepGoing}
                    isDisabled={!canProceed}
                />
            </View>
        </SafeAreaView>
    );
};

export default NewMessageRecipient;

