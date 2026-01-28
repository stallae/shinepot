import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import useColors from '../../../../hooks/useColors';
import {PublicMessage, PrivateMessage, RandomMessage} from '../../../../interfaces/Messages';

type Message = PublicMessage | RandomMessage | PrivateMessage;

interface TextMessageContentProps {
  message: Message;
}

const TextMessageContent: React.FC<TextMessageContentProps> = ({ message }) => {
  const { colors } = useColors();

  const messageText = message.description || 'Message content will be displayed here...';

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        className="text-body-primary leading-6"
        style={{ color: colors.textPrimary }}>
        {messageText}
      </Text>
    </ScrollView>
  );
};

export default TextMessageContent;

