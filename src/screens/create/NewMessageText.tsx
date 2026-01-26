import { useState } from 'react';
import * as React from 'react'
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MemoryMood, MemoryType, MemoryVisibility } from '../../interfaces/messages';
import { addMemory } from '../../services/memoryService';
import { ActivityIndicator, Alert } from 'react-native';

const NewMessageText: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<StackNavigationProp<NewMessageStackParamList>>();
    const route = useRoute<RouteProp<NewMessageStackParamList, 'NewMessageText'>>();
    const [isLoading, setIsLoading] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    const handleSendToFuture = async () => {
        const data = route.params?.data;
        if (!data) {
            console.error('[NewMessageText] No route data found');
            Alert.alert('Error', 'Missing message data. Please go back and try again.');
            return;
        }

        if (!data.mood || !data.contentType || !data.messageType || !data.date) {
            console.error('[NewMessageText] Missing required data fields', data);
            Alert.alert('Error', 'Incomplete message data. Please go back and fill in all required fields.');
            return;
        }

        const currentUser = auth().currentUser;
        if (!currentUser) {
            console.error('[NewMessageText] No current user found');
            Alert.alert('Error', 'You must be logged in to send a message');
            return;
        }

        if (!messageContent.trim()) {
            Alert.alert('Error', 'Please enter a message before sending.');
            return;
        }

        setIsLoading(true);
        try {
            console.log('[NewMessageText] Saving message with data:', {
                mood: data.mood,
                contentType: data.contentType,
                messageType: data.messageType,
                date: data.date,
                title: data.title,
                recipient: data.recipient,
            });

            await addMemory({
                ownerId: currentUser.uid,
                ownerEmail: currentUser.email || '',
                mood: data.mood as MemoryMood,
                type: data.contentType as MemoryType,
                status: 'locked',
                visibility: data.messageType as MemoryVisibility,
                publish_date: firestore.Timestamp.fromDate(new Date(data.date)),
                title: data.title || '',
                description: messageContent,
                mediaUrl: '',
                recipient: data.recipient,
            });

            console.log('[NewMessageText] Message saved successfully');
            navigation.navigate(ROUTES.MessageConfirmation);
        } catch (error) {
            console.error('[NewMessageText] Error saving message:', error);
            Alert.alert(
                'Error',
                'Failed to save your message. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
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
                        <Text
                            className="text-right mt-2 text-body-secondary"
                            style={{ color: colors.textPrimary, opacity: 0.4 }}>
                            {messageContent.length} characters
                        </Text>
                    </View>

                    <View>
                        <WideButton
                            text={isLoading ? "Sending..." : "Send to the future"}
                            onPress={handleSendToFuture}
                            isDisabled={messageContent.trim().length === 0 || isLoading}
                            icon={isLoading ? <ActivityIndicator color="#FFFFFF" /> : undefined}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default NewMessageText;

