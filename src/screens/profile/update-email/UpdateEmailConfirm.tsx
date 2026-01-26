import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { EnvelopeSimple, X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import Card from '../../../components/global/card/card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/roots';
import BackButton from '../../../components/global/buttons/backButton';

const UpdateEmailConfirm = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleClose = () => {
        navigation.popToTop();
    };

    return (
        <SafeAreaView className="flex-1 items-center justify-center relative" style={{ backgroundColor: colors.primary }}>
            <View className="absolute top-20 left-2 z-10">
                <BackButton icon={<X />} onPress={handleClose} />
            </View>

            <View className="w-[90%]">
                <Card
                    title="Confirm your email"
                    description="Please confirm your email by clicking the link we sent to your new email. It's valid for 1 day."
                    icon={<EnvelopeSimple size={48} color="#f59e0b" weight="fill" />}
                    button={{
                        text: "Close",
                        onPress: handleClose,
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
export default UpdateEmailConfirm;
