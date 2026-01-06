import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Pressable,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewMessageStackParamList, ROUTES } from '../../navigation/roots';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { WideButton } from '../../components';
import { RouteProp } from '@react-navigation/native';
import { ArrowLeft, VideoCamera } from 'phosphor-react-native';

const NewMessageVideo: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<StackNavigationProp<NewMessageStackParamList>>();
    const route = useRoute<RouteProp<NewMessageStackParamList, 'NewMessageVideo'>>();
    const [isRecording, setIsRecording] = useState(false);

    const handleStartRecording = () => {
        setIsRecording(true);
        // TODO: Start video recording
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        // TODO: Stop video recording
    };

    const handleSendToFuture = () => {
        // TODO: Save the complete message data including video content
        const data = route.params?.data;
        console.log('Saving video message:', {
            ...data,
            videoRecording: 'video_data_here', // TODO: Replace with actual video data
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
            <View className="flex-1 px-6 justify-between pt-4 pb-6">
                <View className="flex-1 items-center justify-center">
                    <Pressable
                        onPress={isRecording ? handleStopRecording : handleStartRecording}
                        className="w-64 h-64 rounded-full items-center justify-center mb-8"
                        style={{
                            backgroundColor: colors.secondary,
                            borderWidth: 4,
                            borderColor: '#0183FD',
                        }}>
                        <View
                            className="w-48 h-48 rounded-full items-center justify-center"
                            style={{ backgroundColor: '#0183FD' }}>
                            <VideoCamera size={64} color={colors.textPrimary} weight="bold" />
                        </View>
                    </Pressable>

                    <Text
                        className="text-body-secondary text-center"
                        style={{ color: colors.textPrimary, opacity: 0.6 }}>
                        {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
                    </Text>
                </View>

                <View>
                    <WideButton
                        text="Send to the future"
                        onPress={handleSendToFuture}
                        isDisabled={!isRecording}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NewMessageVideo;

