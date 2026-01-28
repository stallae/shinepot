import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import useColors from '../../hooks/useColors';
import { BackButton } from '../../components';
import { X } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentMethods = () => {
    const { colors } = useColors();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            <View className="absolute top-20 left-2 z-10">
                <BackButton icon={<X />} onPress={navigation.goBack} />
            </View>
            <View className="flex-1 justify-center items-center">
                <Text style={{ color: colors.textPrimary }}>Payment Methods</Text>
            </View>
        </SafeAreaView>
    );
};

export default PaymentMethods;
