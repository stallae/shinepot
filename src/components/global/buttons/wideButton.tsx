import React from 'react';
import {Text, Pressable, View} from 'react-native';
import {WideButtonProps} from '../interfaces/wideButtonInterface.tsx';
import useColors from '../../../hooks/useColors.tsx';
import {IconContext} from 'phosphor-react-native';

const WideButton: React.FC<WideButtonProps> = ({
  icon = null,
  text = '',
  outlined = false,
  isDeleteOutline = false,
  isDelete = false,
  isDisabled = false,
  onPress,
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const {colors} = useColors();
  return (
    <Pressable
      disabled={isDisabled}
      className={`rounded-full w-full h-16 justify-center items-center self-center flex-row ${
        isDisabled
          ? 'bg-gray-400'
          : isDelete
          ? 'bg-red-500 active:bg-red-700'
          : isDeleteOutline
          ? 'bg-transparent border border-red-400 active:bg-red-500'
          : outlined
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
      onPress={onPress}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}>
      <IconContext.Provider
        value={{
          weight: 'bold',
          color: isDisabled
            ? colors.textPrimaryDisabled
            : outlined
            ? colors.textSecondary
            : '#FFFFFF',
        }}>
        <View style={{marginRight: 5}}>{icon ? icon : null}</View>
      </IconContext.Provider>
      <Text
        className={`text-lg font-bold self-center font-inter`}
        style={{
          color: isDisabled
            ? colors.textPrimaryDisabled
            : outlined
            ? colors.textSecondary
            : isDeleteOutline && !isActive
            ? '#FF7C7C'
            : '#FFFFFF',
        }}>
        {text}
      </Text>
    </Pressable>
  );
};

export default WideButton;
