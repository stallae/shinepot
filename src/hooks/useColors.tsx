import {useContext, useEffect} from 'react';
import {Colors, TColors} from '../assets/styles/theme.tsx';
import {ThemeContext} from '../utils/themeContext.tsx';
import {useColorScheme} from 'react-native';

interface ColorType {
  colors: TColors;
  applyColors: (colors: TColors) => void;
}

const useColors = (): ColorType => {
  const colorScheme = useColorScheme();
  const store = useContext(ThemeContext);

  if (!store) {
    throw new Error('useColors must be used within a ThemeProvider');
  }

  const {applyColors, colors} = store;

  useEffect(() => {
    if (colorScheme) {
      applyColors(colorScheme === 'dark' ? Colors.dark : Colors.light);
    }
  }, [applyColors, colorScheme]);

  return {applyColors, colors};
};

export default useColors;
