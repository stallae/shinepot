import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Pressable,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NewMessageStackParamList } from '../../navigation/roots';
import { RootStackParamList } from '../../navigation/roots';
import { ScreenProps } from '../../navigation/types';
import useColors from '../../hooks/useColors';
import { WideButton } from '../../components';
import { CheckCircle } from 'phosphor-react-native';
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
                <View
                    className="w-full rounded-2xl p-8 items-center"
                    style={{ backgroundColor: colors.secondary }}>
                        <CheckCircle size={48} color="#7CFF90" weight="fill" />
                    <Text
                        className="text-heading-lg mb-4 text-center"
                        style={{ color: colors.textPrimary }}>
                        Message Saved!
                    </Text>

                    <Text
                        className="text-body-secondary mb-8 text-center"
                        style={{ color: colors.textPrimary, opacity: 0.8 }}>
                        Your message has been safely saved and will be delivered as scheduled.
                    </Text>

                    <View className="w-full mb-4">
                        <WideButton
                            text="Write Another Message"
                            onPress={handleWriteAnother}
                        />
                    </View>

                    <Pressable onPress={handleViewMessages}>
                        <Text
                            className="text-body-primary font-bold"
                            style={{ color: colors.textPrimary }}>
                            View My Messages
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MessageConfirmation;

