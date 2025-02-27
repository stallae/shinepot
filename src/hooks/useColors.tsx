import {useContext, useEffect} from 'react';
import {Colors, TColors} from '../assets/styles/theme.tsx';
import {ThemeContext} from '../utils/themeContext.tsx';
import useTheme from './useTheme.tsx';

interface ColorType {
  colors: TColors;
  applyColors: (colors: TColors) => void;
}

const useColors = (): ColorType => {
  const theme = useTheme();
  const store = useContext(ThemeContext);

  if (!store) {
    throw new Error('useColors must be used within a ThemeProvider');
  }

  const {applyColors, colors} = store;

  useEffect(() => {
    if (theme) {
      applyColors(theme === 'dark' ? Colors.dark : Colors.light);
    }
  }, [applyColors, theme]);

  return {applyColors, colors};
};

export default useColors;
