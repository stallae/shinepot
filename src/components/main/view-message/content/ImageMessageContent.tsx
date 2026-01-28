import * as React from 'react';
import { View, Image, ScrollView, Text } from 'react-native';
import useColors from '../../../../hooks/useColors';
import {PublicMessage, PrivateMessage, RandomMessage} from '../../../../interfaces/Messages';


type Message = PublicMessage | RandomMessage | PrivateMessage;

interface ImageMessageContentProps {
  message: Message;
}

const ImageMessageContent: React.FC<ImageMessageContentProps> = ({ message }) => {
  const { colors } = useColors();

  // TODO: Handle multiple images if message contains an array of images
  const imageUri = message.media_URL || '';

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          className="w-full h-96 rounded-lg"
          resizeMode="contain"
        />
      ) : (
        <View
          className="w-full h-96 rounded-lg items-center justify-center"
          style={{ backgroundColor: colors.third }}>
          <Text
            className="text-body-secondary"
            style={{ color: colors.textPrimary, opacity: 0.6 }}>
            Image not available
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ImageMessageContent;

