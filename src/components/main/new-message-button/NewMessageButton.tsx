import * as React from 'react';
import { Pressable } from 'react-native';
import { PaperPlaneTilt } from 'phosphor-react-native';
import { ROUTES, ScreenProps } from '../../../navigation/types';
import useColors from '../../../hooks/useColors';

const NewMessageButton: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
  
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROUTES.NewMessageFlow);
      }}
      className="absolute bottom-6 right-6 w-16 h-16 rounded-3xl justify-center items-center bg-blue-500"
      >
      <PaperPlaneTilt size={24} weight="fill" color={colors.textPrimary} />
    </Pressable>
  );
};

export default NewMessageButton;