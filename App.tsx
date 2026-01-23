import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/utils/themeContext.tsx';
import './src/components/global/global.css';
import RootNavigation from './src/navigation/RootNavigation.tsx';
import {createServer} from 'miragejs';

createServer({
  routes() {
    this.get('/users', () => {
      return [];
    });
  },
});

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
