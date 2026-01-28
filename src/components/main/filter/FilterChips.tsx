import * as React from 'react';
import {View, ScrollView} from 'react-native';
import FilterChip from './FilterChip';
import {
  STATUS_FILTER_OPTIONS,
  MODAL_TYPE_FILTER_OPTIONS,
  CONTENT_FILTER_OPTIONS,
  DATE_FILTER_OPTIONS,
} from '../../../constants';
import {FilterChipsProps} from '../../../components';

const FilterChips: React.FC<FilterChipsProps> = ({
  activeStatusFilter,
  activeModalTypeFilter,
  activeContentFilter,
  activeDateFilter,
  onRemoveStatusFilter,
  onRemoveModalTypeFilter,
  onRemoveContentFilter,
  onRemoveDateFilter,
}) => {
  const chips: {label: string; onRemove: () => void}[] = [];

  if (activeStatusFilter) {
    const filter = STATUS_FILTER_OPTIONS.find(
      f => f.value === activeStatusFilter,
    );
    if (filter) {
      chips.push({label: filter.label, onRemove: onRemoveStatusFilter});
    }
  }

  // Don't show chips for modal message filter - they navigate to tabs instead

  activeModalTypeFilter.forEach(filterValue => {
    const filter = MODAL_TYPE_FILTER_OPTIONS.find(
      f => f.value === filterValue,
    );
    if (filter) {
      chips.push({
        label: filter.label,
        onRemove: () => onRemoveModalTypeFilter(filterValue),
      });
    }
  });

  activeContentFilter.forEach(filterValue => {
    const filter = CONTENT_FILTER_OPTIONS.find(f => f.value === filterValue);
    if (filter) {
      chips.push({
        label: filter.label,
        onRemove: () => onRemoveContentFilter(filterValue),
      });
    }
  });

  activeDateFilter.forEach(filterValue => {
    const filter = DATE_FILTER_OPTIONS.find(f => f.value === filterValue);
    if (filter) {
      chips.push({
        label: filter.label,
        onRemove: () => onRemoveDateFilter(filterValue),
      });
    }
  });

  if (chips.length === 0) {
    return null;
  }

  return (
    <View className="px-6 mb-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 8}}>
        {chips.map((chip, index) => (
          <FilterChip
            key={index}
            label={chip.label}
            onRemove={chip.onRemove}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterChips;

