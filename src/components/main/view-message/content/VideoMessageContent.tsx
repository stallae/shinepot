import { useState } from 'react';
import * as React from 'react'
import { View, Image, Pressable, Text } from 'react-native';
import { Play } from 'phosphor-react-native';
import useColors from '../../../../hooks/useColors';
import {PublicMessage, PrivateMessage, RandomMessage} from '../../../../interfaces/messages/Messages';


type Message = PublicMessage | RandomMessage | PrivateMessage;

interface VideoMessageContentProps {
  message: Message;
}

const VideoMessageContent: React.FC<VideoMessageContentProps> = ({ message }) => {
  const { colors } = useColors();
  const [thumbnailUri] = useState(message.media_URL || '');

  const handlePlay = () => {
    // TODO: Implement video playback logic
    console.log('Play video:', message.media_URL);
  };

  return (
    <View className="relative">
      <Pressable onPress={handlePlay} className="relative">
        {thumbnailUri ? (
          <Image
            source={{ uri: thumbnailUri }}
            className="w-full h-64 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View
            className="w-full h-64 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.third }}>
            <Text
              className="text-body-secondary"
              style={{ color: colors.textPrimary, opacity: 0.6 }}>
              Video thumbnail
            </Text>
          </View>
        )}
        <View
          className="absolute inset-0 items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <View
            className="w-16 h-16 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Play size={32} color={colors.primary} weight="fill" />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default VideoMessageContent;

