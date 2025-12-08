import {View, SafeAreaView, FlatList, Text, Pressable, ScrollView} from 'react-native';
import {ScreenProps} from '../../navigation/types';
import React, {useMemo, useState} from 'react';
import useColors from '../../hooks/useColors';
import {Header, MessageCard, NewMessageButton} from '../../components';
import {_messages} from '../../_mock/messages/_mocked-messages.ts';
import {Messages} from '../../interfaces/messages.ts';
import {Funnel} from 'phosphor-react-native';
import {TabFilterType, TAB_FILTER_OPTIONS} from '../../constants/filter.ts';
import FilterTab from '../../components/main/filter/FilterTab.tsx';
import FilterChips from '../../components/main/filter/FilterChips.tsx';
import FilterModal from '../../components/main/filter/FilterModal.tsx';
import {filterMessages, FilterState} from '../../utils/filterHelpers.ts';
import {
  StatusFilterType,
  ModalMessageFilterType,
  ModalTypeFilterType,
  ContentFilterType,
  DateFilterType,
} from '../../constants/filter.ts';

const Blog: React.FC<ScreenProps> = ({navigation}) => {
  const {colors} = useColors();
  const [activeTabFilter, setActiveTabFilter] = useState<TabFilterType>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilterType | null>(null);
  const [activeModalMessageFilter, setActiveModalMessageFilter] = useState<ModalMessageFilterType | null>(null);
  const [activeModalTypeFilter, setActiveModalTypeFilter] = useState<ModalTypeFilterType[]>([]);
  const [activeContentFilter, setActiveContentFilter] = useState<ContentFilterType[]>([]);
  const [activeDateFilter, setActiveDateFilter] = useState<DateFilterType[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleTabFilterChange = (filter: TabFilterType) => {
    setActiveTabFilter(filter);
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

  // TODO: Replace with actual current user ID from auth context
  const currentUserId = 1;

  const userMessages = useMemo(() => {
    const filterState: FilterState = {
      activeTabFilter,
      activeStatusFilter,
      activeModalMessageFilter,
      activeModalTypeFilter,
      activeContentFilter,
      activeDateFilter,
    };
    return filterMessages(_messages, currentUserId, filterState);
  }, [
    currentUserId,
    activeTabFilter,
    activeStatusFilter,
    activeModalMessageFilter,
    activeModalTypeFilter,
    activeContentFilter,
    activeDateFilter,
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

        {/* Tab Filters */}
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
