import {SafeAreaView} from 'react-native';
import React, {FC} from 'react';
import WideButton from '../components/global/buttons/wideButton.tsx';

const RootNavigator: FC = () => {
  return (
    <SafeAreaView>
      <WideButton text={'Começar'} />
    </SafeAreaView>
  );
};

export default RootNavigator;
