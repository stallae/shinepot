import React from 'react';
import {RoundedButton} from '../../index.ts';
import {PaperPlaneTilt} from 'phosphor-react-native';
import {ROUTES, ScreenProps} from '../../../navigation/types.ts';

const NewMessageButton: React.FC<ScreenProps> = ({navigation}) => {
  return (
    <RoundedButton
      icon={<PaperPlaneTilt size={24} weight="fill" color="#FFFFFF" />}
      onPress={() => {
        navigation.navigate(ROUTES.NewMessage);
      }}
      colored={true}
      floating={true}
    />
  );
};

export default NewMessageButton;