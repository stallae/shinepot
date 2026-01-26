import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import useColors from '../../hooks/useColors';
import { X, PaperPlaneTilt, CalendarHeart, HandArrowDown, Heart } from 'phosphor-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BackButton from '../../components/global/buttons/backButton';
import { RootStackParamList } from '../../navigation/roots';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { menuItems } from '../../constants/profile';
import ProfileMenuButton from '../../components/profile/ProfileMenuButton';
import { launchImageLibrary } from 'react-native-image-picker';
import { getUser, uploadProfileImage } from '../../services/userService';
import { Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import { User } from '../../interfaces/auth';
import { ProfileStats } from '../../interfaces/profile';

const Profile = () => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const fetchUser = async () => {
                const currentUser = auth().currentUser;
                if (currentUser) {
                    const userData = await getUser(currentUser.uid);
                    setUser(userData);
                }
                setLoading(false);
            };
            fetchUser();
        }, [])
    );

    const handleImagePress = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
            const currentUser = auth().currentUser;
            if (currentUser) {
                try {
                    const url = await uploadProfileImage(currentUser.uid, result.assets[0].uri);
                    setUser(prev => prev ? { ...prev, avatarUrl: url, photoURL: url } : null);
                } catch (error) {
                    console.error("Upload failed", error);
                }
            }
        }
    };

    const userStats: ProfileStats[] = [
        { title: 'Sent', value: (user?.stats?.sent ?? 0).toString(), icon: PaperPlaneTilt },
        { title: 'Scheduled', value: (user?.stats?.scheduled ?? 0).toString(), icon: CalendarHeart },
        { title: 'Received', value: (user?.stats?.received ?? 0).toString(), icon: HandArrowDown },
        { title: 'Saved', value: (user?.stats?.saved ?? 0).toString(), icon: Heart },
    ];

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: colors.primary }}>
                <Text style={{ color: colors.textPrimary }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>

            <View className="absolute top-20 left-2">
                <BackButton icon={<X />} onPress={navigation.goBack} />
            </View>

            <ScrollView className="flex-1 px-6 pt-20">
                <View className="items-center mb-8">
                    <Pressable onPress={handleImagePress} className="rounded-full overflow-hidden">
                        <Image 
                            source={{ uri: user?.photoURL || 'https://via.placeholder.com/100' }} 
                            style={{ width: 100, height: 100 }} 
                            resizeMode="cover" 
                        />
                    </Pressable>
                    <Text className="text-2xl font-bold mt-4" style={{ color: colors.textPrimary }}>
                        {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.displayName || 'User' : 'Guest'}
                    </Text>
                </View>

                <Text className="text-base font-medium mb-4" style={{ color: colors.textPrimary, opacity: 0.5 }}>Account Stats</Text>
                <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
                    {userStats.map((stat, index) => (
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
                        <View key={index}>
                            <ProfileMenuButton
                                title={item.title}
                                icon={item.icon}
                                route={item.route}
                                highlight={item.highlight}
                            />
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
