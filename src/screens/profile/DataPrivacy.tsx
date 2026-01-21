import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import useColors from '../../hooks/useColors';
import BackButton from '../../components/global/buttons/backButton';
import { CaretLeft, IdentificationCard, Database, ShareNetwork, BookOpen, ShieldCheck } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileMenuButton from '../../components/profile/profileMenuButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/roots';

const DataPrivacy = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const privacyItems = [
        {
            title: "Data Collection",
            icon: IdentificationCard,
            type: 'dataCollection' as const,
        },
        {
            title: "Data Usage",
            icon: Database,
            type: 'dataUsage' as const,
        },
        {
            title: "Data Sharing",
            icon: ShareNetwork,
            type: 'dataSharing' as const,
        },
        {
            title: "User Rights",
            icon: BookOpen,
            type: 'userRights' as const,
        },
        {
            title: "Security Measures",
            icon: ShieldCheck,
            type: 'securityMeasures' as const,
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
                                onPress={() => navigation.navigate('PrivacyDetail', { type: item.type })}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default DataPrivacy;
