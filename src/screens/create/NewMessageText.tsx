import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewMessageStackParamList, ROUTES } from '../../navigation/roots';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { WideButton } from '../../components';
import { RouteProp } from '@react-navigation/native';
import { ArrowLeft } from 'phosphor-react-native';

const NewMessageText: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<StackNavigationProp<NewMessageStackParamList>>();
    const route = useRoute<RouteProp<NewMessageStackParamList, 'NewMessageText'>>();
    const [messageContent, setMessageContent] = useState('');

    const handleSendToFuture = () => {
        // TODO: Save the complete message data including content
        const data = route.params?.data;
        console.log('Saving message:', {
            ...data,
            content: messageContent,
        });
        navigation.navigate(ROUTES.MessageConfirmation);
    };

    return (
        <SafeAreaView
            className="flex-1"
            style={{ backgroundColor: colors.primary }}>
            <View className="px-6 pt-4">
                <Pressable
                    onPress={() => navigation.goBack()}
                    className="mb-4">
                    <ArrowLeft size={24} color={colors.textPrimary} weight="bold" />
                </Pressable>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 px-6 justify-between pt-4 pb-6">
                    <View className="flex-1">
                        <Text
                            className="text-heading-lg mb-4"
                            style={{ color: colors.textPrimary }}>
                            What message would you like{'\n'}to send to the future?
                        </Text>
                        <Text
                            className="text-body-secondary mb-6"
                            style={{ color: colors.textPrimary, opacity: 0.6 }}>
                            Write everything that&apos;s in your heart for this{'\n'}person.
                        </Text>

                        <View
                            className="w-full border-b-2 pb-2"
                            style={{ borderBottomColor: '#0183FD' }}>
                            <TextInput
                                placeholder="Start typing your message..."
                                placeholderTextColor={colors.textPrimaryDisabled}
                                value={messageContent}
                                onChangeText={setMessageContent}
                                multiline
                                className="text-body-primary font-inter"
                                style={{
                                    color: colors.textPrimary,
                                    minHeight: 100,
                                    textAlignVertical: 'top',
                                }}
                                autoFocus
                            />
                        </View>
                    </View>

                    <View>
                        <WideButton
                            text="Send to the future"
                            onPress={handleSendToFuture}
                            isDisabled={messageContent.length === 0}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default NewMessageText;

