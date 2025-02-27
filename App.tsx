import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/utils/themeContext.tsx';
import './src/components/global/global.css';
import RootNavigation from './src/navigation/RootNavigation.tsx';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
