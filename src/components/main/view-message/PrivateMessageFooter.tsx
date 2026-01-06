import React from 'react';
import { View, Text } from 'react-native';
import useTheme from '../../../hooks/useTheme';

const PrivateMessageFooter: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View
      className="mx-6 mb-6 rounded-xl px-6 py-4 items-center"
      style={{
        backgroundColor: isDarkMode ? 'rgba(255, 193, 7, 0.15)' : 'rgba(253, 245, 88, 0.3)',
      }}>
      <Text
        className="text-body-primary font-bold text-center"
        style={{
          color: isDarkMode ? '#FFC107' : '#000000',
        }}>
        This is a private message. No interaction available.
      </Text>
    </View>
  );
};

export default PrivateMessageFooter;

