import React from 'react';
import {Pressable, Text, View, ViewStyle} from 'react-native';
import useColors from '../../../hooks/useColors.tsx';
import colorPalette from '../../../assets/styles/colors.tsx';

interface SelectButtonProps {
  label?: string;
  emoji?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  isSelected?: boolean;
  hasSelection?: boolean;
  size?: 'small' | 'large';
}

const SelectButton: React.FC<SelectButtonProps> = ({
  label,
  emoji,
  icon,
  onPress,
  isSelected = false,
  hasSelection = false,
  size = 'large',
}) => {
  const {colors: themeColors} = useColors();


  const sizeClass = icon
    ? 'w-16 h-16 rounded-3xl'
    : size === 'small'
    ? 'rounded-xl'
    : 'rounded-3xl';

  const backgroundColor = colorPalette.gray[500];
  const opacity = hasSelection ? (isSelected ? 1 : 0.3) : 1;

  const buttonStyle: ViewStyle = {
    backgroundColor,
    opacity,
  };

  return (
    <Pressable
      onPress={onPress}
      className={`${sizeClass} p-3 flex-row items-center justify-center gap-1`}
      style={buttonStyle}>
      {icon ? (
        <View>{icon}</View>
      ) : (
        <>
          {emoji && <Text className="text-xl">{emoji}</Text>}
          {label && (
            <Text
              className="font-inter font-semibold"
              style={{color: themeColors.textPrimary}}>
              {label}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
};

export default SelectButton;

