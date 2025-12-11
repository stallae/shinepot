import React from 'react';
import {View, Text, Pressable, Modal, ScrollView} from 'react-native';
import {X} from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import {MessageTypeInfoModalProps} from './interfaces/messageTypeInfoModalInterface';

const MessageTypeInfoModal: React.FC<MessageTypeInfoModalProps> = ({
  visible,
  onClose,
}) => {
  const {colors} = useColors();

  const messageTypes = [
    {
      type: 'Public',
      description:
        'Everyone can see, comment, react, or share your message. Perfect for open conversations and sharing with the community.',
    },
    {
      type: 'Private',
      description:
        'Choose who receives your message. You can send it to someone specific or yourself. Messages can be set to be viewed only once or saved. No replies are allowed.',
    },
    {
      type: 'Random',
      description:
        'Your message is sent to a random person who can either pass it along or respond. You must reply with the same content type and can only participate once. Everyone in the conversation can see all messages until it ends—either when the limit is reached (e.g., 5 responses) or when the same message is passed twice in a row.',
    },
  ];

  const generalInfo = [
    'You can send messages of any content type and select a mood and delivery date for all message types.',
    'You can also invite friends to send you messages.',
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 justify-center items-center px-6"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onPress={onClose}>
        <Pressable
          className="rounded-3xl p-6 w-full"
          style={{backgroundColor: colors.secondary}}
          onPress={e => e.stopPropagation()}>
          <View className="flex-row items-center justify-between mb-6">
            <Text
              className="text-heading-lg font-bold"
              style={{color: colors.textPrimary}}>
              Message Types
            </Text>
            <Pressable onPress={onClose}>
              <X size={24} color={colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {messageTypes.map((messageType, index) => (
              <View key={index} className="mb-6">
                <Text
                  className="text-heading-sm font-bold mb-2"
                  style={{color: colors.textPrimary}}>
                  {messageType.type}
                </Text>
                <Text
                  className="text-body-primary"
                  style={{color: colors.textPrimary, opacity: 0.7}}>
                  {messageType.description}
                </Text>
              </View>
            ))}

            <View className="mb-4">
              {generalInfo.map((info, index) => (
                <Text
                  key={index}
                  className={`text-body-primary ${index > 0 ? 'mt-2' : ''}`}
                  style={{color: colors.textPrimary, opacity: 0.7}}>
                  {info}
                </Text>
              ))}
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MessageTypeInfoModal;



