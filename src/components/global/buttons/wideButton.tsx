import React from 'react';
import {Text, Pressable} from 'react-native';
import {WideButtonProps} from '../interfaces/wideButtonInterface.tsx';
import useColors from '../../../hooks/useColors.tsx';

const WideButton: React.FC<WideButtonProps> = ({
  icon = '',
  text = '',
  outlined = false,
  isDisabled = true,
}) => {
  const {colors} = useColors();
  return (
    <Pressable
      disabled={isDisabled}
      className={`rounded-full w-10/12 h-1/4 justify-center items-center self-center flex-row  ${
        outlined
          ? 'bg-transparent border border-blue-500 active:bg-blue-500'
          : 'bg-blue-500 active:bg-blue-900'
      } `}
      style={
        isDisabled
          ? {
              backgroundColor: colors.secondary,
              borderColor: 'transparent',
            }
          : null
      }
      onPress={() => {}}>
      <Text
        className="mr-4"
        style={{
          color: isDisabled ? colors.textPrimaryDisabled : colors.textPrimary,
        }}>
        aa
      </Text>
      <Text
        className={`text-lg font-bold self-center font-inter`}
        style={{
          color: isDisabled ? colors.textPrimaryDisabled : colors.textPrimary,
        }}>
        {text}
      </Text>
      r
    </Pressable>
  );
};

export default WideButton;
