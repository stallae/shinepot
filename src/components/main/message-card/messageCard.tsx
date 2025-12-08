import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {Messages} from '../../../interfaces/messages.ts';
import useColors from '../../../hooks/useColors.tsx';
import {Lock} from 'phosphor-react-native';
import {ProfilePicture} from '../../index.ts';

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
  
  const isFuture = new Date(message.publish_date) > new Date();

  return (
    <Pressable
      onPress={onPress}
      className="w-11/12 mx-auto mb-3 rounded-xl p-4 font-inter overflow-hidden"
      style={{backgroundColor: colors.secondary}}
      disabled={isFuture}>
      <View className="flex-1" style={{opacity: isFuture ? 0.3 : 1}}>
        <View className="flex-row items-center gap-4 h-1/2 flex">
          <ProfilePicture size={30} shape="circle" />
          <Text
            className="text-heading-sm"
            style={{color: colors.textPrimary}}>
            {message.title || 'Message'}
          </Text>
        </View>
        {isLocked || isFuture ? (
          <View className="text-sm mb-2 mt-4 font-medium flex-row items-center gap-2">
            <Lock size={16} color="#FF9E37" />
            <Text
              className="text-sm"
              style={{color: '#FF9E37'}}>
              {isFuture ? 'Future message' : 'It\'s not time yet'}
            </Text>
          </View>
        ) : (
          <Text
            className="text-body-secondary mb-2 mt-4"
            style={{color: colors.textPrimary, opacity: 0.4}}>
            {getMessageTypeDescription()}
          </Text>
        )}
      </View>
      {isFuture && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 12,
            },
          ]}
        />
      )}
    </Pressable>
  );
};

export default MessageCard;

