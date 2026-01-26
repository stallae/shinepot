import {View, SafeAreaView, FlatList, Text, Pressable, ScrollView, ActivityIndicator} from 'react-native';
import {ScreenProps} from '../../navigation/types';
import {useMemo, useState} from 'react';
import useColors from '../../hooks/useColors';
import * as React from 'react'
import {Header, MessageCard, NewMessageButton} from '../../components';
import {Messages} from '../../interfaces/messages';
import {Funnel} from 'phosphor-react-native';
import {TabFilterType, TAB_FILTER_OPTIONS} from '../../constants/filter';
import FilterTab from '../../components/main/filter/FilterTab';
import FilterChips from '../../components/main/filter/FilterChips';
import FilterModal from '../../components/main/filter/FilterModal';
import {filterMessages, FilterState} from '../../utils/filterHelpers';
import {
  StatusFilterType,
  ModalMessageFilterType,
  ModalTypeFilterType,
  ContentFilterType,
  DateFilterType,
} from '../../constants/filter';
import {ROUTES} from '../../navigation/roots';
import {serializeMessage} from '../../utils/messageSerialization';
import useMemories from '../../hooks/useMemories';
import useAuth from '../../hooks/useAuth';

const Blog: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  const {user} = useAuth();
  const {memories: allMessages, isLoading: isLoadingMessages, error: memoryError} = useMemories();
  
  const [activeTabFilter, setActiveTabFilter] = useState<TabFilterType>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilterType | null>(null);
  const [activeModalMessageFilter, setActiveModalMessageFilter] = useState<ModalMessageFilterType | null>(null);
  const [activeModalTypeFilter, setActiveModalTypeFilter] = useState<ModalTypeFilterType[]>([]);
  const [activeContentFilter, setActiveContentFilter] = useState<ContentFilterType[]>([]);
  const [activeDateFilter, setActiveDateFilter] = useState<DateFilterType[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const errorMessages = memoryError?.message || null;

  const handleTabFilterChange = (filter: TabFilterType) => {
    setActiveTabFilter(filter);
    if (activeModalMessageFilter) {
      setActiveModalMessageFilter(null);
    }
  };

  const handleStatusFilterChange = (filter: StatusFilterType | null) => {
    setActiveStatusFilter(filter);
  };

  const handleModalMessageFilterChange = (filter: ModalMessageFilterType | null) => {
    setActiveModalMessageFilter(filter);
    if (filter && filter !== 'all') {
      setActiveTabFilter(filter as TabFilterType);
    } else if (filter === null && activeTabFilter !== 'all') {
      const wasSetByModalFilter =
        activeTabFilter === 'sent' || activeTabFilter === 'received';
      if (wasSetByModalFilter) {
        setActiveTabFilter('all');
      }
    }
  };


  const currentUserId = user?.uid || '1';

  const userMessages = useMemo(() => {
    const filterState: FilterState = {
      activeTabFilter,
      activeStatusFilter,
      activeModalMessageFilter,
      activeModalTypeFilter,
      activeContentFilter,
      activeDateFilter,
    };
    return filterMessages(allMessages, currentUserId, filterState);
  }, [
    currentUserId,
    activeTabFilter,
    activeStatusFilter,
    activeModalMessageFilter,
    activeModalTypeFilter,
    activeContentFilter,
    activeDateFilter,
    allMessages,
  ]);

  const handleClearAllFilters = () => {
    setActiveStatusFilter(null);
    setActiveModalMessageFilter(null);
    setActiveModalTypeFilter([]);
    setActiveContentFilter([]);
    setActiveDateFilter([]);
  };

  const handleModalTypeFilterToggle = (filter: ModalTypeFilterType) => {
    setActiveModalTypeFilter(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  };

  const handleContentFilterToggle = (filter: ContentFilterType) => {
    setActiveContentFilter(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  };

  const handleDateFilterToggle = (filter: DateFilterType) => {
    setActiveDateFilter(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter],
    );
  };

  const handleRemoveModalTypeFilter = (filter: ModalTypeFilterType) => {
    setActiveModalTypeFilter(prev => prev.filter(f => f !== filter));
  };

  const handleRemoveContentFilter = (filter: ContentFilterType) => {
    setActiveContentFilter(prev => prev.filter(f => f !== filter));
  };

  const handleRemoveDateFilter = (filter: DateFilterType) => {
    setActiveDateFilter(prev => prev.filter(f => f !== filter));
  };

  const renderMessage = ({item}: {item: Messages}) => {
    const publishDate = item.publish_date && 'toDate' in item.publish_date
      ? item.publish_date.toDate() 
      : new Date();
    const now = new Date();
    const isFuture = publishDate > now;
    const isLocked = item.status === 'locked';
    const shouldBlock = isFuture || isLocked;
    
    const handleMessagePress = () => {
      const checkDate = item.publish_date && 'toDate' in item.publish_date
        ? item.publish_date.toDate() 
        : new Date();
      const checkNow = new Date();
      const checkIsFuture = checkDate > checkNow;
      const checkIsLocked = item.status === 'locked';
      const checkShouldBlock = checkIsFuture || checkIsLocked;
      
      if (!checkShouldBlock) {
        const serializedMessage = serializeMessage(item);
        navigation.navigate(ROUTES.ViewMessage, { message: serializedMessage });
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
              style={{backgroundColor: colors.secondary}}
              onPress={() => setIsFilterModalOpen(true)}>
              <Funnel size={20} color={colors.textPrimary} />
            </Pressable>
          </View>
          <Text
            className="text-body-primary"
            style={{color: colors.textPrimary, opacity: 0.4}}>
            Your personal space
          </Text>
        </View>

        <View className="px-6 mb-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 8}}>
            {TAB_FILTER_OPTIONS.map(filter => (
              <FilterTab
                key={filter.value}
                label={filter.label}
                isActive={activeTabFilter === filter.value}
                onPress={() => handleTabFilterChange(filter.value as TabFilterType)}
              />
            ))}
          </ScrollView>
        </View>

        <FilterChips
          activeStatusFilter={activeStatusFilter}
          activeModalMessageFilter={activeModalMessageFilter}
          activeModalTypeFilter={activeModalTypeFilter}
          activeContentFilter={activeContentFilter}
          activeDateFilter={activeDateFilter}
          onRemoveStatusFilter={() => setActiveStatusFilter(null)}
          onRemoveModalMessageFilter={() => {
            setActiveModalMessageFilter(null);
            const wasSetByModalFilter =
              activeTabFilter === 'sent' || activeTabFilter === 'received';
            if (wasSetByModalFilter) {
              setActiveTabFilter('all');
            }
          }}
          onRemoveModalTypeFilter={handleRemoveModalTypeFilter}
          onRemoveContentFilter={handleRemoveContentFilter}
          onRemoveDateFilter={handleRemoveDateFilter}
        />

        {isLoadingMessages ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.textPrimary} />
          </View>
        ) : errorMessages ? (
          <View className="flex-1 justify-center items-center px-4">
            <Text
              className="font-inter text-lg font-semibold text-center"
              style={{color: colors.textPrimary}}>
              Error loading messages
            </Text>
            <Text
              className="font-inter text-base text-center mt-2"
              style={{color: colors.textPrimary, opacity: 0.5}}>
              {errorMessages}
            </Text>
          </View>
        ) : userMessages.length === 0 ? (
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

        <NewMessageButton navigation={navigation} />
      </View>

      <FilterModal
        visible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        activeStatusFilter={activeStatusFilter}
        activeModalMessageFilter={activeModalMessageFilter}
        activeModalTypeFilter={activeModalTypeFilter}
        activeContentFilter={activeContentFilter}
        activeDateFilter={activeDateFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onModalMessageFilterChange={handleModalMessageFilterChange}
        onModalTypeFilterChange={handleModalTypeFilterToggle}
        onContentFilterChange={handleContentFilterToggle}
        onDateFilterChange={handleDateFilterToggle}
        onClearFilters={handleClearAllFilters}
        onTabFilterChange={handleTabFilterChange}
      />
    </SafeAreaView>
  );
};

export default Blog;
