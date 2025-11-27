import {View, SafeAreaView, FlatList, Text, Pressable, ScrollView} from 'react-native';
import {ScreenProps} from '../../navigation/types';
import React, {useMemo, useState} from 'react';
import useColors from '../../hooks/useColors';
import {Header, MessageCard, NewMessageButton} from '../../components';
import {_messages} from '../../_mock/messages/_mocked-messages.ts';
import {Messages} from '../../interfaces/messages.ts';
import {Funnel} from 'phosphor-react-native';
import {FilterType, FILTER_OPTIONS} from '../../constants/filter.ts';

const Blog: React.FC<ScreenProps> = () => {
  const {colors} = useColors();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // TODO: Replace with actual current user ID from auth context
  const currentUserId = 1;

  const userMessages = useMemo(() => {
    let filtered = _messages.filter(
      (message: Messages) => message.user_owner_id === currentUserId,
    );

    switch (activeFilter) {
      case 'sent':
        break;
      case 'received':
        filtered = _messages.filter(
          (message: Messages) =>
            message.message_recipients?.recipient_contact?.user_id ===
            currentUserId,
        );
        break;
      case 'opened':
        filtered = filtered.filter(
          msg => msg.message_audit_status.message_status_type === 'published',
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [currentUserId, activeFilter]);

  const renderMessage = ({item}: {item: Messages}) => {
    return (
      <MessageCard
        message={item}
        onPress={() => {
          // TODO: Navigate to message detail screen
          console.log('Message pressed:', item.id);
        }}
      />
    );
  };

  const FilterTab = ({
    label,
    isActive,
    onPress,
  }: {
    label: string;
    isActive: boolean;
    onPress: () => void;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        className="px-4 py-2 rounded-lg"
        style={{
          backgroundColor: isActive ? colors.secondary : 'transparent',
        }}>
        <Text
          className="text-heading-sm font-inter"
          style={{
            color: colors.textPrimary,
          }}>
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: colors.primary}}>
      <Header />
      <View className="flex-1 pt-10">
        <View className="px-6 mb-3 gap-3">
          <View className="flex-row items-center justify-between gap-2">
            <Text
              className="text-heading-lg"
              style={{color: colors.textPrimary}}>
              My messages
            </Text>
            <Pressable
              className="w-10 h-10 rounded-lg justify-center items-center"
              style={{backgroundColor: colors.secondary}}>
              <Funnel size={20} color={colors.textPrimary} />
            </Pressable>
          </View>
          <Text
            className="text-body-secondary"
            style={{color: colors.textPrimary, opacity: 0.4}}>
            Your personal space
          </Text>
        </View>

        <View className="px-6 mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 8}}>
            {FILTER_OPTIONS.map(filter => (
              <FilterTab
                key={filter.value}
                label={filter.label}
                isActive={activeFilter === filter.value}
                onPress={() => setActiveFilter(filter.value)}
              />
            ))}
          </ScrollView>
        </View>

        {userMessages.length === 0 ? (
          <View className="flex-1 justify-center items-center px-4">
            <Text
              className="font-inter text-xl font-semibold text-center"
              style={{color: colors.textPrimary, opacity: 0.7}}>
              No messages yet
            </Text>
            <Text
              className="font-inter text-base text-center mt-2"
              style={{color: colors.textPrimary, opacity: 0.5}}>
              Your messages will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            data={userMessages}
            renderItem={renderMessage}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
          />
        )}

        <NewMessageButton />
      </View>
    </SafeAreaView>
  );
};

export default Blog;
