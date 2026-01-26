import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import Card from '../../../components/global/card/card';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/roots';
import BackButton from '../../../components/global/buttons/backButton';
import { ROUTES } from '../../../navigation/roots';
type UpdatePhoneConfirmRouteProp = RouteProp<RootStackParamList, 'UpdatePhoneConfirm'>;

const UpdatePhoneConfirm = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<UpdatePhoneConfirmRouteProp>();
    const { phone } = route.params;

    const handleFinish = () => {
        navigation.navigate(ROUTES.Blog);
    };

    return (
        <SafeAreaView className="flex-1 items-center justify-center relative" style={{ backgroundColor: colors.primary }}>
            <View className="absolute top-20 left-6 z-10">
                <BackButton icon={<X />} onPress={handleFinish} />
            </View>

            <View className="w-[90%]">
                <Card
                    type="done"
                    title="Done"
                    description={`Your phone number has been updated to ${phone}`}
                    button={{
                        text: "Finish",
                        onPress: handleFinish,
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
export default UpdatePhoneConfirm;
