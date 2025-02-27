import {SafeAreaView} from 'react-native';
import React, {FC} from 'react';
import WideButton from '../components/global/buttons/wideButton.tsx';
import {Check} from 'phosphor-react-native';

const RootNavigator: FC = () => {
  return (
    <SafeAreaView>
      <WideButton text={'Começar'} icon={<Check />} />
    </SafeAreaView>
  );
};

export default RootNavigator;
