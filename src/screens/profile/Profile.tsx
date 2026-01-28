import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import useColors from '../../hooks/useColors';
import { X } from 'phosphor-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BackButton, ProfileMenuButton } from '../../components';
import { RootStackParamList } from '../../navigation/roots';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { menuItems } from '../../constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { getUser, uploadProfileImage } from '../../services/userService';
import auth from '@react-native-firebase/auth';
import type { User } from '../../interfaces';

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



    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.reset({ index: 0, routes: [{ name: 'Auth' as keyof RootStackParamList }] });
        } catch (error) {
            console.error('[Profile] Logout failed', error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: colors.primary }}>
                <Text style={{ color: colors.textPrimary }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
            
      <View className="absolute top-20 left-2 z-10">
        <BackButton icon={<X />} onPress={navigation.goBack} />
      </View>

            <ScrollView className="flex-1 px-6 pt-20">
                <View className="items-center mb-8">
                    <Pressable onPress={handleImagePress} className="rounded-full overflow-hidden">
                        <Image 
                            source={{ uri: user?.photo_URL || 'https://via.placeholder.com/100' }} 
                            style={{ width: 100, height: 100 }} 
                            resizeMode="cover" 
                        />
                    </Pressable>
                    <Text className="text-2xl font-bold mt-4" style={{ color: colors.textPrimary }}>
                        {user ? `${user.name || ''}` : 'Guest'}
                    </Text>
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

                <Pressable
                    onPress={handleLogout}
                    className="mt-2 mb-8 py-4 rounded-xl items-center"
                    style={{ backgroundColor: colors.secondary }}>
                    <Text className="text-base font-semibold" style={{ color: colors.textPrimary }}>
                        Log out
                    </Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
