import * as React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import useColors from '../../../hooks/useColors';
import { ScreenProps } from '../../../navigation/types';
import MessageViewHeader from '../../../components/main/view-message/MessageViewHeader';
import MessageContentView from '../../../components/main/view-message/MessageContentView';
import MessageTimestamp from '../../../components/main/view-message/MessageTimestamp';
import PrivateMessageFooter from '../../../components/main/view-message/PrivateMessageFooter';
import RandomMessageFooter from '../../../components/main/view-message/RandomMessageFooter';
import { RootStackParamList } from '../../../navigation/roots';
import { deserializeMessage } from '../../../utils/messageSerialization';

const ViewMessage: React.FC<ScreenProps> = () => {
  const { colors } = useColors();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewMessage'>>();
  const navigation = useNavigation();
  const rawMessage = route.params?.message;

  if (!rawMessage) {
    return null;
  }

  const message = deserializeMessage(rawMessage);

  const publishDate = message.publish_date && 'toDate' in message.publish_date
    ? message.publish_date.toDate() 
    : new Date();
  const now = new Date();
  const isFuture = publishDate > now;
  const isLocked = message.status === 'locked';
  const shouldBlock = isFuture || isLocked;
  
  React.useLayoutEffect(() => {
    if (shouldBlock) {
      navigation.goBack();
    }
  }, [shouldBlock, navigation]);

  if (shouldBlock) {
    return null;
  }

  const isPrivate = message.visibility === 'private';
  const isRandom = message.visibility === 'random';
  const senderName = message.memoryRecipients?.[0]?.recipient_contact?.id
    ? 'Sender Name' // TODO: Fetch actual sender name from user data
    : undefined;

  const handleMenuPress = () => {
    // TODO: Implement menu actions (report, share, etc.)
    console.log('Menu pressed');
  };

  const renderFooter = () => {
    if (isPrivate) {
      return <PrivateMessageFooter />;
    }
    if (isRandom) {
      return (
        <RandomMessageFooter
          message={message}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.primary }}>
      <MessageViewHeader
        senderName={senderName}
        onMenuPress={handleMenuPress}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-6 pt-4">
          <MessageContentView message={message} />
          <MessageTimestamp date={message.publish_date} />
        </View>
      </ScrollView>
      {renderFooter()}
    </SafeAreaView>
  );
};

export default ViewMessage;

