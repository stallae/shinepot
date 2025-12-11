import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ROUTES } from '../../navigation/roots';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { Header, WideButton, GeneralInput } from '../../components';

const NewMessageTitle: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [messageTitle, setMessageTitle] = useState('');

    const handleKeepGoing = () => {
        // navigation.navigate(ROUTES.MessageDetails); // TODO: Next step
        console.log('Title entered:', messageTitle);
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
