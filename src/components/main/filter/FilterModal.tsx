import * as React from 'react';
import {View, Text, Pressable, ScrollView, Modal} from 'react-native';
import {X} from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import {
  StatusFilterType,
  ModalMessageFilterType,
  ModalTypeFilterType,
  ContentFilterType,
  DateFilterType,
  TabFilterType,
  STATUS_FILTER_OPTIONS,
  MODAL_MESSAGE_FILTER_OPTIONS,
  MODAL_TYPE_FILTER_OPTIONS,
  CONTENT_FILTER_OPTIONS,
  DATE_FILTER_OPTIONS,
} from '../../../constants';
import {
  FilterModalProps,
  FilterButtonProps,
} from './interfaces/filterModalInterface';

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onPress,
}) => {
  const {colors} = useColors();

  return (
    <Pressable
      onPress={onPress}
      className="px-4 py-2 rounded-lg"
      style={{
        backgroundColor: isActive ? colors.primary : colors.secondary,
        borderWidth: 1,
        borderColor: isActive ? colors.primary : 'transparent',
      }}>
      <Text
        className="text-body-primary font-semibold"
        style={{
          color: colors.textPrimary,
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  activeStatusFilter,
  activeModalMessageFilter,
  activeModalTypeFilter,
  activeContentFilter,
  activeDateFilter,
  onStatusFilterChange,
  onModalMessageFilterChange,
  onModalTypeFilterChange,
  onContentFilterChange,
  onDateFilterChange,
  onClearFilters,
  onTabFilterChange,
}) => {
  const {colors} = useColors();

  const hasActiveFilters =
    activeModalMessageFilter ||
    activeModalTypeFilter.length > 0 ||
    activeContentFilter.length > 0 ||
    activeDateFilter.length > 0 ||
    activeStatusFilter;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 justify-end"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onPress={onClose}>
        <Pressable
          className="rounded-t-3xl p-6"
          style={{backgroundColor: colors.secondary}}
          onPress={e => e.stopPropagation()}>
          <View className="flex-row items-center justify-between mb-6">
            <Text
              className="text-heading-lg font-bold"
              style={{color: colors.textPrimary}}>
              Filters
            </Text>
            <View className="flex-row items-center gap-4">
              {hasActiveFilters && (
                <Pressable onPress={onClearFilters}>
                  <Text
                    className="text-body-primary font-semibold"
                    style={{color: colors.textPrimary, opacity: 0.7}}>
                    Clear Filters
                  </Text>
                </Pressable>
              )}
              <Pressable onPress={onClose}>
                <X size={24} color={colors.textPrimary} />
              </Pressable>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mb-6">
              <View className="flex-row flex-wrap gap-2">
                {MODAL_MESSAGE_FILTER_OPTIONS.map(filter => (
                  <FilterButton
                    key={filter.value}
                    label={filter.label}
                    isActive={activeModalMessageFilter === filter.value}
                    onPress={() => {
                      const newFilter =
                        activeModalMessageFilter === filter.value
                          ? null
                          : (filter.value as ModalMessageFilterType);
                      onModalMessageFilterChange(newFilter);
                      // Navigate to corresponding tab
                      if (newFilter && newFilter !== 'all') {
                        onTabFilterChange(newFilter as TabFilterType);
                      } else if (newFilter === null) {
                        onTabFilterChange('all');
                      }
                    }}
                  />
                ))}
              </View>
            </View>

            <View className="mb-6">
              <Text
                className="text-heading-sm font-bold mb-3"
                style={{color: colors.textPrimary}}>
                Status
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {STATUS_FILTER_OPTIONS.map(filter => (
                  <FilterButton
                    key={filter.value}
                    label={filter.label}
                    isActive={activeStatusFilter === filter.value}
                    onPress={() => {
                      const newFilter =
                        activeStatusFilter === filter.value
                          ? null
                          : (filter.value as StatusFilterType);
                      onStatusFilterChange(newFilter);
                    }}
                  />
                ))}
              </View>
            </View>

            <View className="mb-6">
              <Text
                className="text-heading-sm font-bold mb-3"
                style={{color: colors.textPrimary}}>
                Message Type
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {MODAL_TYPE_FILTER_OPTIONS.map(filter => (
                  <FilterButton
                    key={filter.value}
                    label={filter.label}
                    isActive={activeModalTypeFilter.includes(
                      filter.value as ModalTypeFilterType,
                    )}
                    onPress={() => {
                      onModalTypeFilterChange(
                        filter.value as ModalTypeFilterType,
                      );
                    }}
                  />
                ))}
              </View>
            </View>

            <View className="mb-6">
              <Text
                className="text-heading-sm font-bold mb-3"
                style={{color: colors.textPrimary}}>
                Content Type
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {CONTENT_FILTER_OPTIONS.map(filter => (
                  <FilterButton
                    key={filter.value}
                    label={filter.label}
                    isActive={activeContentFilter.includes(
                      filter.value as ContentFilterType,
                    )}
                    onPress={() => {
                      onContentFilterChange(
                        filter.value as ContentFilterType,
                      );
                    }}
                  />
                ))}
              </View>
            </View>

            <View className="mb-6">
              <Text
                className="text-heading-sm font-bold mb-3"
                style={{color: colors.textPrimary}}>
                Date
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {DATE_FILTER_OPTIONS.map(filter => (
                  <FilterButton
                    key={filter.value}
                    label={filter.label}
                    isActive={activeDateFilter.includes(
                      filter.value as DateFilterType,
                    )}
                    onPress={() => {
                      onDateFilterChange(filter.value as DateFilterType);
                    }}
                  />
                ))}
              </View>
            </View>

            <Pressable
              onPress={onClose}
              className="py-4 rounded-full items-center justify-center mt-4"
              style={{
                backgroundColor: colors.primary,
              }}>
              <Text
                className="text-body-primary font-bold"
                style={{
                  color: colors.textPrimary,
                }}>
                Save
              </Text>
            </Pressable>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;

