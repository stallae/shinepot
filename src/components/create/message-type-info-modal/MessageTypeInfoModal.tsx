import * as React from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { X } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import { MessageTypeInfoModalProps } from './interfaces/messageTypeInfoModalInterface';
import { MESSAGE_TYPES_INFO } from '../../../constants';

const MessageTypeInfoModal: React.FC<MessageTypeInfoModalProps> = ({
  visible,
  onClose,
}) => {
  const { colors } = useColors();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onPress={onClose}>
        <Pressable
          className="rounded-3xl p-6 w-full"
          style={{ backgroundColor: colors.secondary }}
          onPress={e => e.stopPropagation()}>
          <View className="flex-row items-center justify-between mb-6">
            <Text
              className="text-heading-lg font-bold"
              style={{ color: colors.textPrimary }}>
              Message Types
            </Text>
            <Pressable onPress={onClose}>
              <X size={24} color={colors.textPrimary} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {MESSAGE_TYPES_INFO.map((messageType, index) => (
              <View key={index} className="mb-6">
                <Text
                  className="text-heading-sm font-bold mb-2"
                  style={{ color: colors.textPrimary }}>
                  {messageType.type}
                </Text>
                <Text
                  className="text-body-primary"
                  style={{ color: colors.textPrimary, opacity: 0.7 }}>
                  {messageType.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MessageTypeInfoModal;





