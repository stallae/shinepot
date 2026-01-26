import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';
import useColors from '../../hooks/useColors';
import BackButton from '../../components/global/buttons/backButton';
import { PRIVACY_CONTENT, PrivacySubsection } from '../../constants/privacyContent';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/roots';

type PrivacyDetailRouteProp = RouteProp<RootStackParamList, 'PrivacyDetail'>;

const PrivacyDetail = () => {
    const { colors } = useColors();
    const navigation = useNavigation();
    const route = useRoute<PrivacyDetailRouteProp>();

    const { type } = route.params;
    const content = PRIVACY_CONTENT[type];

    if (!content) return null;

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            <View className="px-6 py-4">
                <View className="mb-8">
                    <BackButton
                        icon={<CaretLeft size={24} color={colors.textPrimary} />}
                        onPress={navigation.goBack}
                    />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <Text
                        className="text-3xl font-bold mb-8"
                        style={{ color: colors.textPrimary }}
                    >
                        {content.title}
                    </Text>

                    {content.sections.map((section) => (
                        <View key={section.id} className="mb-8">
                            <Text
                                className="text-xl font-bold mb-4"
                                style={{ color: colors.textPrimary }}
                            >
                                {section.title}
                            </Text>

                            {section.description && (
                                <Text
                                    className="text-base mb-4 opacity-80"
                                    style={{ color: colors.textPrimary }}
                                >
                                    {section.description}
                                </Text>
                            )}

                            {section.subsections && section.subsections.map((sub: PrivacySubsection, index: number) => (
                                <View key={index} className="flex-row mb-3 pl-2">
                                    <Text
                                        style={{ color: colors.textPrimary }}
                                        className="text-base opacity-90"
                                    >
                                        • {sub.boldText && <Text className="font-bold">{sub.boldText} </Text>}
                                        {sub.text}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default PrivacyDetail;
