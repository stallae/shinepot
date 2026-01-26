import * as React from 'react';
import {Text, Pressable} from 'react-native';
import useColors from '../../../hooks/useColors';
import {FilterTabProps} from './interfaces/filterTabInterface';

const FilterTab: React.FC<FilterTabProps> = ({label, isActive, onPress}) => {
  const {colors} = useColors();

  return (
    <Pressable
      onPress={onPress}
      className="px-4 py-2 rounded-lg"
      style={{
        backgroundColor: isActive ? colors.secondary : 'transparent',
      }}>
      <Text
        className="text-heading-sm font-bold"
        style={{
          color: colors.textPrimary,
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default FilterTab;

