import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import useColors from '../../hooks/useColors';
import { BackButton } from '../../components';
import { ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { APP_INFO, APP_CONTENT, CONTACT_INFO } from '../../constants';

const About = () => {
    const { colors } = useColors();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            <View className="absolute top-20 left-2 z-10">
                <BackButton icon={<ArrowLeft/>} onPress={navigation.goBack} />
            </View>
            <ScrollView className="flex-1 pt-28 px-6" showsVerticalScrollIndicator={false}>
                <Text className="text-3xl font-bold mb-8" style={{ color: colors.textPrimary }}>{APP_CONTENT.about.title}</Text>

                <View className="mb-8">
                    <Text className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>{APP_CONTENT.about.subtitle}</Text>
                    <Text className="text-base font-bold mb-2" style={{ color: colors.textPrimary }}>{APP_CONTENT.about.sectionTitle}</Text>
                    <Text className="text-base leading-6" style={{ color: colors.textPrimary, opacity: 0.7 }}>{APP_CONTENT.about.description}</Text>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-bold mb-4" style={{ color: colors.textPrimary }}>{APP_CONTENT.howItWorks.title}</Text>
                    <View className="gap-2">
                        {APP_CONTENT.howItWorks.steps.map((step) => (
                            <Text key={step.id} className="text-base leading-6" style={{ color: colors.textPrimary, opacity: 0.8 }}>
                                <Text className="font-bold">{step.id}. {step.boldText} </Text>
                                {step.text}
                            </Text>
                        ))}
                    </View>
                </View>

                <View className="mb-8">
                    <Text className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>{CONTACT_INFO.title}</Text>
                    <View className="flex-row items-center">
                        <Text className="text-base" style={{ color: colors.textPrimary }}>📥 Support Email: </Text>
                        <Text className="text-base underline text-blue-400">{CONTACT_INFO.email}</Text>
                    </View>
                </View>

                <View className="mb-10">
                    <Text className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>App Version</Text>
                    <Text className="text-base" style={{ color: colors.textPrimary, opacity: 0.7 }}>Version: {APP_INFO.version}</Text>
                    <Text className="text-base" style={{ color: colors.textPrimary, opacity: 0.7 }}>Last Update: {new Date(APP_INFO.lastUpdate).toLocaleDateString()}</Text>
                
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default About;
