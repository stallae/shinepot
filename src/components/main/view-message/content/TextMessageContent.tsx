import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import useColors from '../../../../hooks/useColors';
import { Messages } from '../../../../interfaces/messages';

interface TextMessageContentProps {
  message: Messages;
}

const TextMessageContent: React.FC<TextMessageContentProps> = ({ message }) => {
  const { colors } = useColors();

  const messageText = message.mediaUrl || 'Message content will be displayed here...';

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

