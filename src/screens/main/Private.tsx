import * as React from 'react';
import { View, SafeAreaView, FlatList, Text, ActivityIndicator } from 'react-native';
import useColors from '../../hooks/useColors';
import { ScreenProps } from '../../navigation/types';
import { Header, MessageCard, NewMessageButton, TabFooter } from '../../components';
import { ROUTES } from '../../navigation/roots';
import { serializeMessage } from '../../utils/messageSerialization';
import usePrivateMessages from '../../hooks/usePrivateMessages';
import type { PrivateMessage } from '../../interfaces';

const Private: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
  const { messages, isLoading, error } = usePrivateMessages();

  const renderMessage = ({ item }: { item: PrivateMessage }) => {
    const publishDate = item.publish_date && 'toDate' in item.publish_date
      ? item.publish_date.toDate()
      : new Date();
    const now = new Date();
    const isFuture = publishDate > now;
    const isLocked = item.status === 'locked';
    const shouldBlock = isFuture || isLocked;

    const handleMessagePress = () => {
      if (!shouldBlock) {
        const serializedMessage = serializeMessage(item);
        navigation.navigate(ROUTES.Blog, { message: serializedMessage });
      }
    };

    return (
      <MessageCard
        message={item}
        onPress={shouldBlock ? undefined : handleMessagePress}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.primary }}>
      <Header />
      <View className="flex-1 pt-10">
        <View className="px-6 mb-3">
          <Text
            className="text-heading-lg"
            style={{ color: colors.textPrimary }}>
            Private messages
          </Text>
          <Text
            className="text-body-primary"
            style={{ color: colors.textPrimary, opacity: 0.4 }}>
            Your private conversations
          </Text>
        </View>

        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.textPrimary} />
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center px-4">
            <Text
              className="font-inter text-lg font-semibold text-center"
              style={{ color: colors.textPrimary }}>
              Error loading messages
            </Text>
            <Text
              className="font-inter text-base text-center mt-2"
              style={{ color: colors.textPrimary, opacity: 0.5 }}>
              {error.message}
            </Text>
          </View>
        ) : messages.length === 0 ? (
          <View className="flex-1 justify-center items-center px-4">
            <Text
              className="font-inter text-xl font-semibold text-center"
              style={{ color: colors.textPrimary, opacity: 0.7 }}>
              No private messages yet
            </Text>
            <Text
              className="font-inter text-base text-center mt-2"
              style={{ color: colors.textPrimary, opacity: 0.5 }}>
              Your private messages will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <NewMessageButton navigation={navigation} />
      </View>

      <TabFooter />
    </SafeAreaView>
  );
};

export default Private;
