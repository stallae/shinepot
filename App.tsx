import React from 'react';
import './src/components/global/global.css';
import {ThemeProvider} from './src/utils/themeContext.tsx';
import RootNavigator from './src/navigation/RootNavigator.tsx';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

export default App;
