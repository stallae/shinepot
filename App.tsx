import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import WideButton from './src/components/global/buttons/wideButton/wideButton.tsx';
import './src/components/global/global.css';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <WideButton />
    </SafeAreaView>
  );
}

export default App;
