import React from 'react';
import { View, Pressable, Text, ImageSourcePropType } from 'react-native';
import { ArrowLeft, DotsThree } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import useColors from '../../../hooks/useColors';
import { ProfilePicture } from '../../index';

interface MessageViewHeaderProps {
  senderName?: string;
  senderAvatar?: ImageSourcePropType;
  onMenuPress?: () => void;
}

const MessageViewHeader: React.FC<MessageViewHeaderProps> = ({
  senderName,
  senderAvatar,
  onMenuPress,
}) => {
  const { colors } = useColors();
  const navigation = useNavigation();

  return (
    <View
      className="flex-row items-center px-6 py-4 gap-4"
      style={{ backgroundColor: colors.primary }}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowLeft size={24} color={colors.textPrimary} weight="bold" />
      </Pressable>

      <View className="flex-row items-center gap-3 flex-1">
        <ProfilePicture size={40} shape="circle" source={senderAvatar} />
        {senderName && (
          <Text
            className="text-heading-sm"
            style={{ color: colors.textPrimary }}>
            {senderName}
          </Text>
        )}
      </View>

      <Pressable
        onPress={onMenuPress}
        className="w-10 h-10 items-center justify-center rounded-lg"
        style={{
          borderWidth: 1,
          borderColor: colors.textPrimary,
          opacity: 0.3,
        }}>
        <DotsThree size={24} color={colors.textPrimary} weight="bold" />
      </Pressable>
    </View>
  );
};

export default MessageViewHeader;

