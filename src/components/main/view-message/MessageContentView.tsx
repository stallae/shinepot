import * as React from 'react';
import { View, Text } from 'react-native';
import useColors from '../../../hooks/useColors';
import TextMessageContent from './content/TextMessageContent';
import AudioMessageContent from './content/AudioMessageContent';
import VideoMessageContent from './content/VideoMessageContent';
import ImageMessageContent from './content/ImageMessageContent';
import {PublicMessage, PrivateMessage, RandomMessage} from '../../../interfaces/messages/Messages';


type Message = PublicMessage | RandomMessage | PrivateMessage;

interface MessageContentViewProps {
  message: Message;
}

const MessageContentView: React.FC<MessageContentViewProps> = ({ message }) => {
  const { colors } = useColors();

  const renderContent = () => {
    switch (message.format) {
      case 'text':
        return <TextMessageContent message={message} />;
      case 'audio':
        return <AudioMessageContent message={message} />;
      case 'video':
        return <VideoMessageContent message={message} />;
      case 'image':
        return <ImageMessageContent message={message} />;
      default:
        return null;
    }
  };

  return (
    <View
      className="rounded-xl p-6 mb-4"
      style={{ backgroundColor: colors.secondary }}>
      {message.title && (
        <Text
          className="text-heading-lg mb-4 font-bold"
          style={{ color: colors.textPrimary }}>
          {message.title}
        </Text>
      )}
      {renderContent()}
    </View>
  );
};

export default MessageContentView;

