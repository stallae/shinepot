import React from 'react';
import {Pressable, Text, View} from 'react-native';
import useColors from '../../../hooks/useColors.tsx';
import colors from '../../../assets/styles/colors.tsx';

interface RoundedButtonProps {
  label?: string;
  emoji?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  isSelected?: boolean;
  colored?: boolean;
  floating?: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  label,
  emoji,
  icon,
  onPress,
  isSelected = false,
  colored = false,
  floating = false,
}) => {
  const {colors: themeColors} = useColors();

  const floatingClass = floating ? 'absolute bottom-6 right-6' : '';

  let BackgroundColor: string | undefined;
    if (colored) {
    BackgroundColor = colors.blue[500];
  } else if (isSelected) {
    BackgroundColor = themeColors.secondary;
  } else {
    BackgroundColor = colors.gray[500];
  }

  return (
    <Pressable
      onPress={onPress}
      className={`w-16 h-16 rounded-3xl ${floatingClass} justify-center items-center`}
      style={{backgroundColor: BackgroundColor}}>
      {icon ? (
        <View>{icon}</View>
      ) : (
        <View className="flex-row items-center gap-2">
          {emoji && <Text className="text-xl">{emoji}</Text>}
          {label && (
            <Text
              className="font-inter font-semibold"
              style={{color: themeColors.textPrimary}}>
              {label}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default RoundedButton;
