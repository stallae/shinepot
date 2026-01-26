import * as React from 'react';
import { View, Text } from 'react-native';
import useColors from '../../../hooks/useColors';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface MessageTimestampProps {
  date: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
}

const MessageTimestamp: React.FC<MessageTimestampProps> = ({ date }) => {
  const { colors } = useColors();

  const formatTimestamp = (date: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue): string => {
    const dateObj = 'toDate' in date ? date.toDate() : new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return dateObj.toLocaleDateString('en-US', options);
  };

  return (
    <View className="px-6 mb-4">
      <Text
        className="text-body-secondary"
        style={{ color: colors.textPrimary, opacity: 0.6 }}>
        {formatTimestamp(date)}
      </Text>
    </View>
  );
};

export default MessageTimestamp;

