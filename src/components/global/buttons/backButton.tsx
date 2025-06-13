import React from 'react';
import {Pressable, View} from 'react-native';
import {BackButtonProps} from './interfaces/backButtonInterface.tsx';
import {IconContext} from 'phosphor-react-native';
import useColors from '../../../hooks/useColors.tsx';

const BackButton: React.FC<BackButtonProps> = ({icon = null, onPress}) => {
  const {colors} = useColors();
  return (
    <Pressable
      className="rounded-full w-16 h-16 flex items-center justify-center"
      style={{backgroundColor: colors.secondary}}
      onPress={onPress}>
      <IconContext.Provider
        value={{
          weight: 'bold',
          color: '#0183FD',
        }}>
        <View className="self-center">{icon ? icon : null}</View>
      </IconContext.Provider>
    </Pressable>
  );
};

export default BackButton;
