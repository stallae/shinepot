import React from 'react';
import {
    SafeAreaView,
    View,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NewMessageStackParamList } from '../../navigation/roots';
import { RootStackParamList } from '../../navigation/roots';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { Card } from '../../components';
import { ROUTES } from '../../navigation/roots';

type ConfirmationNavigationProp = CompositeNavigationProp<
    StackNavigationProp<NewMessageStackParamList>,
    StackNavigationProp<RootStackParamList>
>;

const MessageConfirmation: React.FC<ScreenProps> = () => {
    const { colors } = useColors();
    const navigation = useNavigation<ConfirmationNavigationProp>();

    const handleWriteAnother = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: ROUTES.NewMessage }],
            })
        );
    };

    const handleViewMessages = () => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
            parentNavigation.navigate(ROUTES.Blog);
        } else {
            navigation.navigate(ROUTES.Blog);
        }
    };

    return (
        <SafeAreaView
            className="flex-1"
            style={{ backgroundColor: colors.primary }}>
            <View className="flex-1 items-center justify-center px-6">
                <Card
                    type="success"
                    title="Message Saved!"
                    description="Your message has been safely saved and will be delivered as scheduled."
                    button={{
                        text: "Write Another Message",
                        onPress: handleWriteAnother,
                    }}
                    secondButton={{
                        text: "View My Messages",
                        onPress: handleViewMessages,
                        outlined: true,
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default MessageConfirmation;

