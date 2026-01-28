import { useState } from 'react';
import * as React from 'react'
import { View, Pressable } from 'react-native';
import { Play, Pause } from 'phosphor-react-native';
import useColors from '../../../../hooks/useColors';
import {PublicMessage, PrivateMessage, RandomMessage} from '../../../../interfaces/Messages';


type Message = PublicMessage | RandomMessage | PrivateMessage;

interface AudioMessageContentProps {
  message: Message;
}

const AudioMessageContent: React.FC<AudioMessageContentProps> = ({ message }) => {
  const { colors } = useColors();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log('isPlaying', message.media_URL);
    // TODO: Implement audio playback logic
  };

  const waveformBars = Array.from({ length: 20 }, () => Math.random() * 100);

  const barBackgroundColor = isPlaying ? colors.textSecondary : colors.textPrimary;

  return (
    <View className="flex-row items-center gap-4">
      <Pressable
        onPress={handlePlayPause}
        className="w-12 h-12 rounded-full justify-center">
        {isPlaying ? (
          <Pause size={20} color={colors.textPrimary} weight="fill" />
        ) : (
          <Play size={20} color={colors.textPrimary} weight="fill" />
        )}
      </Pressable>

      <View className="flex-1 flex-row items-center gap-1 h-12">
        {waveformBars.map((height, index) => (
          <View
            key={index}
            className="flex-1 rounded-full"
            style={{
              backgroundColor: barBackgroundColor,
              height: `${height}%`,
              minHeight: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default AudioMessageContent;

