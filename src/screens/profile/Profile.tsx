import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import useColors from '../../hooks/useColors';
import { X } from 'phosphor-react-native';
import { PROFILE_DATA } from '../../_mock/profile';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/global/buttons/backButton';
import { RootStackParamList } from '../../navigation/roots';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { stats, menuItems } from '../../constants/profile';
import ProfileMenuButton from '../../components/profile/profileMenuButton';


const Profile = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>

            <View className="absolute top-20 left-2">
                <BackButton icon={<X />} onPress={navigation.goBack} />
            </View>

            <ScrollView className="flex-1 px-6 pt-20">
                <View className="items-center mb-8">
                    <View className="rounded-full overflow-hidden">
                        <Image source={{ uri: PROFILE_DATA.avatarUrl }} style={{ width: 100, height: 100 }} resizeMode="cover" />
                    </View>
                    <Text className="text-2xl font-bold mt-4" style={{ color: colors.textPrimary }}>{PROFILE_DATA.firstName} {PROFILE_DATA.lastName}</Text>
                </View>

                <Text className="text-base font-medium mb-4" style={{ color: colors.textPrimary, opacity: 0.5 }}>Account Stats</Text>
                <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
                    {stats.map((stat, index) => (
                        <View key={index} className="w-[48%] p-4 rounded-xl" style={{ backgroundColor: colors.secondary }}>
                            <View className="flex-row items-center gap-2 mb-2">
                                <stat.icon size={20} color={colors.textPrimary} weight="regular" style={{ opacity: 0.7 }} />
                                <Text className="text-sm font-medium" style={{ color: colors.textPrimary }}>{stat.title}</Text>
                            </View>
                            <Text className="text-3xl font-bold" style={{ color: colors.textPrimary }}>{stat.value}</Text>
                        </View>
                    ))}
                </View>

                <Text className="text-base font-medium mb-4" style={{ color: colors.textPrimary, opacity: 0.5 }}>Profile</Text>
                <View className="gap-6 mb-10">
                    {menuItems.map((item, index) => (
                        <ProfileMenuButton
                          key={index}
                          title={item.title}
                          icon={item.icon}
                          route={item.route}
                          highlight={item.highlight}
                        />
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
