import {useColorScheme} from 'react-native';

const useTheme = () => {
  const theme = useColorScheme();
  return theme === 'dark' ? 'dark' : 'light';
};

export default useTheme;
