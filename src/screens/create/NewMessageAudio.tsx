import React, { useState, useEffect } from 'react';
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
import { ArrowLeft, Microphone, Pause, Play, Stop } from 'phosphor-react-native';

const NewMessageAudio: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<StackNavigationProp<NewMessageStackParamList>>();
    const route = useRoute<RouteProp<NewMessageStackParamList, 'NewMessageAudio'>>();
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [hasRecorded, setHasRecorded] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRecording && !isPaused) {
            interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording, isPaused]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleStartRecording = () => {
        setIsRecording(true);
        setIsPaused(false);
        // TODO: Start actual audio recording
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
        // TODO: Pause/resume audio recording
    };

    const handleStop = () => {
        setIsRecording(false);
        setIsPaused(false);
        if (recordingTime > 0) {
            setHasRecorded(true);
        }
        // TODO: Stop audio recording
    };

    const handleSendToFuture = () => {
        // TODO: Save the complete message data including audio content
        const data = route.params?.data;
        console.log('Saving audio message:', {
            ...data,
            audioRecording: 'audio_data_here', // TODO: Replace with actual audio data
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
                        onPress={isRecording ? handleStop : handleStartRecording}
                        className="w-64 h-64 rounded-full items-center justify-center mb-8"
                        style={{
                            backgroundColor: colors.secondary,
                            borderWidth: 4,
                            borderColor: '#0183FD',
                        }}>
                        <View
                            className="w-48 h-48 rounded-full items-center justify-center"
                            style={{ backgroundColor: '#0183FD' }}>
                            <Microphone size={64} color={colors.textPrimary} weight="bold" />
                        </View>
                    </Pressable>

                    <View className="flex-row items-center justify-center gap-6 mb-8">
                        <Pressable
                            onPress={handlePause}
                            disabled={!isRecording}
                            className={`w-12 h-12 items-center justify-center rounded-lg ${!isRecording ? 'opacity-50' : ''}`}
                            style={{ backgroundColor: colors.secondary }}>
                            {isPaused ? (
                                <Play size={24} color={colors.textPrimary} weight="bold" />
                            ) : (
                                <Pause size={24} color={colors.textPrimary} weight="bold" />
                            )}
                        </Pressable>

                        <Text
                            className="text-heading-lg font-mono"
                            style={{ color: colors.textPrimary, minWidth: 100, textAlign: 'center' }}>
                            {formatTime(recordingTime)}
                        </Text>

                        <Pressable
                            onPress={handleStop}
                            disabled={!isRecording}
                            className={`w-12 h-12 items-center justify-center rounded-lg ${!isRecording ? 'opacity-50' : ''}`}
                            style={{ backgroundColor: colors.secondary }}>
                            <Stop size={24} color={colors.textPrimary} weight="fill" />
                        </Pressable>
                    </View>

                    <Text
                        className="text-body-secondary text-center"
                        style={{ color: colors.textPrimary, opacity: 0.6 }}>
                        Share your very best feelings to future
                    </Text>
                </View>

                <View>
                    <WideButton
                        text="Send to the future"
                        onPress={handleSendToFuture}
                        isDisabled={!hasRecorded}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NewMessageAudio;

