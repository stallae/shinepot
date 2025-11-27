import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Messages} from '../../../interfaces/messages.ts';
import useColors from '../../../hooks/useColors.tsx';
import {Lock} from 'phosphor-react-native';
import ProfilePicture from '../../global/profile-picture/profilePicture.tsx';

interface MessageCardProps {
  message: Messages;
  onPress?: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({message, onPress}) => {
  const {colors} = useColors();

  const getMessageTypeDescription = () => {
    return `This a ${message.message_content_type} message.`;
  };

  const isLocked = message.message_audit_status.message_status_type === 'pending';

  return (
    <Pressable
      onPress={onPress}
      className="w-11/12 mx-auto mb-3 rounded-xl p-4 font-inter"
      style={{backgroundColor: colors.secondary}}>
        <View className="flex-1">
          <View className="flex-row items-center gap-4 h-1/2 flex">
            <ProfilePicture size={30} shape="circle" />
            <Text
              className="text-base font-bold"
              style={{color: colors.textPrimary}}>
              {message.title || 'Message'}
            </Text>
        </View>
          {isLocked ? (
            <View className="text-sm mb-2 mt-4 font-medium flex-row items-center gap-2">
              <Lock size={16} color="#FF9E37" />
              <Text
                className="text-sm"
                style={{color: '#FF9E37'}}>
                It&apos;s not time yet
              </Text>
            </View>
          ) : (
            <Text
            className="text-sm mb-2 mt-4 font-medium"
            style={{color: colors.textPrimary, opacity: 0.7}}>
            {getMessageTypeDescription()}
          </Text>
          )}
        </View>
    </Pressable>
  );
};

export default MessageCard;

