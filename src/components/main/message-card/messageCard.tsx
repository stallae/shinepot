import * as React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {Messages} from '../../../interfaces/messages';
import useColors from '../../../hooks/useColors';
import {Lock} from 'phosphor-react-native';
import {ProfilePicture} from '../../index';

interface MessageCardProps {
  message: Messages;
  onPress?: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({message, onPress}) => {
  const {colors} = useColors();

  const getMessageTypeDescription = () => {
    return `This a ${message.type} message.`;
  };

  const isLocked = message.status === 'locked';
  
  const publishDate = 'toDate' in message.publish_date 
    ? message.publish_date.toDate() 
    : new Date();
  const now = new Date();
  const isFuture = publishDate > now;
  
  const shouldBlock = isFuture || isLocked;

  const handlePress = () => {
    const checkDate = 'toDate' in message.publish_date 
      ? message.publish_date.toDate() 
      : new Date();
    const checkNow = new Date();
    const checkIsFuture = checkDate > checkNow;
    const checkIsLocked = message.status === 'locked';
    const checkShouldBlock = checkIsFuture || checkIsLocked;
    
    if (!checkShouldBlock && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={shouldBlock ? undefined : handlePress}
      className="w-11/12 mx-auto mb-3 rounded-xl p-4 font-inter overflow-hidden"
      style={{backgroundColor: colors.secondary}}
      disabled={shouldBlock}>
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

