import React from 'react';
import { Pressable } from 'react-native';
import { PaperPlaneTilt } from 'phosphor-react-native';
import { ROUTES, ScreenProps } from '../../../navigation/types.ts';
import colorPalette from '../../../assets/styles/colors.tsx';

const NewMessageButton: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROUTES.NewMessageFlow);
      }}
      className="absolute bottom-6 right-6 w-16 h-16 rounded-3xl justify-center items-center"
      style={{ backgroundColor: colorPalette.blue[500] }}>
      <PaperPlaneTilt size={24} weight="fill" color="#FFFFFF" />
    </Pressable>
  );
};

export default NewMessageButton;