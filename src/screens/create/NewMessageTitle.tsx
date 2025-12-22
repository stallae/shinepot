import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES, NewMessageStackParamList } from '../../navigation/roots';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { Header, WideButton, GeneralInput } from '../../components';
import { RouteProp } from '@react-navigation/native';

const NewMessageTitle: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<StackNavigationProp<NewMessageStackParamList>>();
    const route = useRoute<RouteProp<NewMessageStackParamList, 'NewMessageTitle'>>();
    const [messageTitle, setMessageTitle] = useState('');

    const handleKeepGoing = () => {
        if (!route.params?.data) return;
        
        const { data } = route.params;
        const completeData = {
            ...data,
            title: messageTitle,
            date: typeof data.date === 'string' ? data.date : data.date.toISOString(),
        };

        if (data.messageType === 'private') {
            navigation.navigate(ROUTES.NewMessageRecipient, { 
                data: {
                    ...completeData,
                    title: messageTitle,
                }
            });
            return;
        }

        switch (data.contentType) {
            case 'text':
                navigation.navigate(ROUTES.NewMessageText, { data: completeData });
                break;
            case 'image':
                navigation.navigate(ROUTES.NewMessageImage, { data: completeData });
                break;
            case 'audio':
                navigation.navigate(ROUTES.NewMessageAudio, { data: completeData });
                break;
            case 'video':
                navigation.navigate(ROUTES.NewMessageVideo, { data: completeData });
                break;
            default:
                console.error('Unknown content type:', data.contentType);
        }
    };

    return (
        <SafeAreaView
            className="flex-1"
            style={{ backgroundColor: colors.primary }}>
            <Header />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 px-6 justify-between pt-10 pb-6">
                    <View>
                        <Text
                            className="text-heading-lg mb-8"
                            style={{ color: colors.textPrimary }}>
                            What would you like to call your message?
                        </Text>

                        <GeneralInput
                            placeholder="Hey, try something short and to the point!"
                            value={messageTitle}
                            onChange={setMessageTitle}
                            keyboardType="default"
                        />

                    </View>

                    <View>
                        <WideButton
                            text="Keep going"
                            onPress={handleKeepGoing}
                            isDisabled={messageTitle.length === 0}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default NewMessageTitle;
