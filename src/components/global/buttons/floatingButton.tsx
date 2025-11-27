import React from 'react';
import {Pressable} from 'react-native';
import {FloatingButtonProps} from './interfaces/floatingButton.tsx';

const FloatingButton: React.FC<FloatingButtonProps> = ({icon = null, onPress}) => {
  return (
    <Pressable
          className="absolute bottom-6 right-6 w-16 h-16 rounded-3xl justify-center items-center bg-blue-500"
          onPress={onPress}>
          {icon ? icon : null}
        </Pressable>
    );
  };

  export default FloatingButton;