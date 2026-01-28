import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import useColors from '../../hooks/useColors';
import { BackButton } from '../../components';
import { CaretLeft, IdentificationCard, Database, ShareNetwork, BookOpen, ShieldCheck } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileMenuButton } from '../../components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/roots';

const DataPrivacy = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const privacyItems = [
        {
            title: "Data Collection",
            icon: IdentificationCard,
            routeName: 'DataCollection' as keyof RootStackParamList,
        },
        {
            title: "Data Usage",
            icon: Database,
            routeName: 'DataUsage' as keyof RootStackParamList,
        },
        {
            title: "Data Sharing",
            icon: ShareNetwork,
            routeName: 'DataSharing' as keyof RootStackParamList,
        },
        {
            title: "User Rights",
            icon: BookOpen,
            routeName: 'UserRights' as keyof RootStackParamList,
        },
        {
            title: "Security Measures",
            icon: ShieldCheck,
            routeName: 'SecurityMeasures' as keyof RootStackParamList,
        },
    ];

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            <View className="px-6 py-4 flex-1">
                <View className="mb-10">
                    <BackButton
                        icon={<CaretLeft size={24} color={colors.textPrimary} />}
                        onPress={navigation.goBack}
                    />
                </View>

                <Text
                    className="text-3xl font-bold mb-10"
                    style={{ color: colors.textPrimary }}
                >
                    Data Privacy & Security
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="gap-8">
                        {privacyItems.map((item, index) => (
                            <ProfileMenuButton
                                key={index}
                                title={item.title}
                                icon={item.icon}
                                onPress={() => navigation.navigate(item.routeName as any)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default DataPrivacy;
