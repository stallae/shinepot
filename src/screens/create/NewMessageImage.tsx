import { useState } from 'react';
import * as React from 'react'
import {
    View,
    SafeAreaView,
    Text,
    Pressable,
    ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewMessageStackParamList, ROUTES } from '../../navigation/roots';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { WideButton } from '../../components';
import { RouteProp } from '@react-navigation/native';
import { ArrowLeft, Trash, CloudArrowUp } from 'phosphor-react-native';
import colorPalette from '../../assets/styles/colors';

interface UploadFile {
    id: string;
    name: string;
    size: number;
    status: 'uploading' | 'failed' | 'complete';
    progress?: number;
    timeLeft?: number;
}

const NewMessageImage: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<StackNavigationProp<NewMessageStackParamList>>();
    const route = useRoute<RouteProp<NewMessageStackParamList, 'NewMessageImage'>>();
    const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

    const handleSelectFiles = () => {
        // TODO: Implement file selection
        console.log('Select files');
    };

    const handleDeleteFile = (id: string) => {
        setUploadFiles(prev => prev.filter(file => file.id !== id));
    };

    const handleUpload = () => {
        // TODO: Implement file upload
        const data = route.params?.data;
        console.log('Uploading images:', {
            ...data,
            images: uploadFiles,
        });
        navigation.navigate(ROUTES.MessageConfirmation);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' b';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' kb';
        return (bytes / (1024 * 1024)).toFixed(1) + ' mb';
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
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 32 }}>
                <View className="px-6">
                    <Text
                        className="text-heading-lg mb-6"
                        style={{ color: colors.textPrimary }}>
                        Upload Files
                    </Text>

                    <Pressable
                        onPress={handleSelectFiles}
                        className="w-full h-48 rounded-lg items-center justify-center mb-6"
                        style={{ backgroundColor: colors.secondary }}>
                        <CloudArrowUp 
                            size={48} 
                            color={colors.textPrimary} 
                            weight="bold"
                            style={{ opacity: 0.6, marginBottom: 12 }}
                        />
                        <Text
                            className="text-body-primary"
                            style={{ color: colors.textPrimary, opacity: 0.6 }}>
                            Tap to select files
                        </Text>
                    </Pressable>

                    <Text
                        className="text-body-secondary mb-6"
                        style={{ color: colors.textPrimary, opacity: 0.6 }}>
                        Only files 10MB max file size.
                    </Text>

                    {uploadFiles.length > 0 && (
                        <View className="mb-6">
                            <Text
                                className="text-heading-lg mb-4"
                                style={{ color: colors.textPrimary }}>
                                Upload Status
                            </Text>
                            {uploadFiles.map(file => (
                                <View
                                    key={file.id}
                                    className="flex-row items-center justify-between mb-4 p-4 rounded-lg"
                                    style={{ backgroundColor: colors.secondary }}>
                                    <View className="flex-1">
                                        <Text
                                            className="text-body-primary mb-1"
                                            style={{ color: colors.textPrimary }}>
                                            {file.name}
                                        </Text>
                                        {file.status === 'uploading' && file.progress !== undefined && (
                                            <Text
                                                className="text-body-secondary mb-2"
                                                style={{ color: colors.textPrimary, opacity: 0.6 }}>
                                                {formatFileSize(file.size)} | {file.progress}%{file.timeLeft ? ` . ${file.timeLeft} sec left` : ''}
                                            </Text>
                                        )}
                                        {file.status === 'failed' && (
                                            <Text
                                                className="text-body-secondary"
                                                style={{ color: colorPalette.red[300] }}>
                                                Upload failed
                                            </Text>
                                        )}
                                        {file.status === 'complete' && (
                                            <Text
                                                className="text-body-secondary"
                                                style={{ color: colorPalette.green[300] }}>
                                                Upload complete
                                            </Text>
                                        )}
                                        {file.status === 'uploading' && file.progress !== undefined && (
                                            <View
                                                className="h-1 rounded-full mt-2"
                                                style={{
                                                    backgroundColor: colors.third,
                                                    width: '100%',
                                                }}>
                                                <View
                                                    className="h-1 rounded-full"
                                                    style={{
                                                        backgroundColor: colorPalette.blue[500],
                                                        width: `${file.progress}%`,
                                                    }}
                                                />
                                            </View>
                                        )}
                                    </View>
                                    <Pressable
                                        onPress={() => handleDeleteFile(file.id)}
                                        className="ml-4">
                                        <Trash size={24} color={colorPalette.red[300]} weight="bold" />
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            <View className="px-6 pb-6">
                <WideButton
                    text="Upload"
                    onPress={handleUpload}
                    isDisabled={uploadFiles.length === 0 || uploadFiles.some(f => f.status === 'uploading')}
                />
            </View>
        </SafeAreaView>
    );
};

export default NewMessageImage;

