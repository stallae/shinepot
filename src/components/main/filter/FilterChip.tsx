import React from 'react';
import {Text, Pressable} from 'react-native';
import {X} from 'phosphor-react-native';
import useColors from '../../../hooks/useColors';
import {FilterChipProps} from './interfaces/filterChipInterface.tsx';

const FilterChip: React.FC<FilterChipProps> = ({label, onRemove}) => {
  const {colors} = useColors();

  return (
    <Pressable
      onPress={onRemove}
      className="px-3 py-1.5 rounded-full flex-row items-center gap-2"
      style={{
        backgroundColor: colors.secondary,
      }}>
      <Text
        className="text-body-primary font-semibold"
        style={{
          color: colors.textPrimary,
        }}>
        {label}
      </Text>
      <X size={14} color={colors.textPrimary} weight="bold" />
    </Pressable>
  );
};

export default FilterChip;

