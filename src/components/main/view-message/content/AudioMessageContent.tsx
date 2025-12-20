import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Play, Pause } from 'phosphor-react-native';
import useColors from '../../../../hooks/useColors';
import colorPalette from '../../../../assets/styles/colors';
import { Messages } from '../../../../interfaces/messages';

interface AudioMessageContentProps {
  message: Messages;
}

const AudioMessageContent: React.FC<AudioMessageContentProps> = ({ message }) => {
  const { colors } = useColors();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement audio playback logic
  };

  // Generate waveform bars (mock data)
  const waveformBars = Array.from({ length: 20 }, () => Math.random() * 100);

  return (
    <View className="flex-row items-center gap-4">
      <Pressable
        onPress={handlePlayPause}
        className="w-12 h-12 rounded-full items-center justify-center"
        style={{ backgroundColor: colorPalette.blue[500] }}>
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
              backgroundColor: colorPalette.blue[500],
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

