import React from 'react';
import FloatingButton from '../../global/buttons/floatingButton.tsx';
import { PaperPlaneTilt } from 'phosphor-react-native';
import useColors from '../../../hooks/useColors.tsx';

const NewMessageButton: React.FC = () => {
  const {colors} = useColors();
  return (
    <FloatingButton
      icon={<PaperPlaneTilt size={24} weight="fill" color={colors.textPrimary} />}
      onPress={() => {
        // TODO: Navigate to create message screen
        console.log('Create new message');
      }}
    />
  );
};

export default NewMessageButton;