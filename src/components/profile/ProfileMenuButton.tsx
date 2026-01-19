import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ProfileMenuItem } from '../../screens/profile/interfaces/profileInterface';
import useColors from '../../hooks/useColors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/roots';

interface Props {
    item: ProfileMenuItem;
    highlight?: boolean;
    onPress?: () => void;
}

const ProfileMenuButton: React.FC<Props> = ({ item, highlight = false, onPress }) => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (item.route) {
            navigation.navigate(item.route as any);
        }
    };

    if (highlight) {
        return (
            <TouchableOpacity
                className="flex-row items-center p-4 rounded-xl bg-[#FF9E37]"
                onPress={handlePress}
            >
                <item.icon size={24} color="black" weight="fill" />
                <Text className="text-black font-bold text-lg ml-3">{item.title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            className="flex-row items-center"
            onPress={handlePress}
        >
            <View
                className="w-10 h-10 rounded-full justify-center items-center"
                style={{ backgroundColor: colors.secondary }}
            >
                <item.icon size={20} color={colors.textPrimary} />
            </View>
            <Text
                className="text-lg ml-4 font-medium"
                style={{ color: colors.textPrimary }}
            >
                {item.title}
            </Text>
        </TouchableOpacity>
    );
};

export default ProfileMenuButton;
