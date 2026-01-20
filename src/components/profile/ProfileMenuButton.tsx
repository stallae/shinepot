import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ProfileMenuButtonProps } from './interfaces/profileMenuButtonInterface';
import useColors from '../../hooks/useColors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/roots';


const ProfileMenuButton: React.FC<ProfileMenuButtonProps> = ({
  title,
  icon: IconComponent,
  route,
  highlight = false,
  description,
  onPress,
}) => {
    const { colors } = useColors();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else if (route) {
            navigation.navigate(route as any);
        }
    };

    if (highlight) {
        return (
            <TouchableOpacity
                className="flex-row items-center p-4 rounded-xl bg-[#FF9E37]"
                onPress={handlePress}
            >
                <IconComponent size={24} color="black" weight="fill" />
                <Text className="text-black font-bold text-lg ml-3">{title}</Text>
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
                <IconComponent size={20} color={colors.textPrimary} />
            </View>
            <View className="ml-4 flex-1">
                <Text
                    className="text-lg font-medium"
                    style={{ color: colors.textPrimary }}
                >
                    {title}
                </Text>
                {description ? (
                    <Text
                        className="text-sm font-medium"
                        style={{ color: colors.textPrimary, opacity: 0.55 }}
                        numberOfLines={1}
                    >
                        {description}
                    </Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

export default ProfileMenuButton;
