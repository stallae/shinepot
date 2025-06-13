import React from 'react';
import {Pressable, View} from 'react-native';
import {IconContext} from 'phosphor-react-native';
import {SmallButtonProps} from './interfaces/smallButtonInterface.tsx';
import useColors from '../../../hooks/useColors.tsx';

const SmallButton: React.FC<SmallButtonProps> = ({
  icon = null,
  color = 'primary',
  onPress = () => {},
}) => {
  const {colors} = useColors();
  return (
    <Pressable
      className={` w-16 h-16 justify-center items-center self-center flex-row`}
      style={
        color === 'colored'
          ? {backgroundColor: '#3B82F6', borderRadius: 20}
          : color === 'transparent'
          ? {backgroundColor: '#3B82F660', borderRadius: 12}
          : {
              backgroundColor: colors.secondary,
              borderRadius: 26,
              height: 65,
              width: 65,
            }
      }
      onPress={onPress}>
      <IconContext.Provider
        value={{
          weight: 'bold',
          color:
            color === 'colored'
              ? '#FFFFFF'
              : color === 'transparent'
              ? '#0183FD'
              : colors.textPrimary,
        }}>
        <View>{icon ? icon : null}</View>
      </IconContext.Provider>
    </Pressable>
  );
};

export default SmallButton;
