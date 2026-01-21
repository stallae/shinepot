import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import useColors from '../../../hooks/useColors';
import { DropdownProps } from './interfaces/dropdownInterface.tsx';
import { CaretDown } from 'phosphor-react-native';

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  maxHeight = 200,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useColors();

  const selectedOption = options.find(option => option.value === value);

  return (
    <View className="w-full">
      {label && (
        <Text
          className="font-inter font-medium mb-2"
          style={{ color: colors.textPrimary }}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center rounded-lg"
        style={{
          height: 48,
          backgroundColor: colors.secondary,
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}>
        <Text
          className="flex-1 font-inter text-lg"
          style={{
            color: selectedOption
              ? colors.textPrimary
              : colors.textPrimaryDisabled,
            fontWeight: 'bold',
          }}>
          {selectedOption ? selectedOption.text : placeholder}
        </Text>
        <CaretDown size={20} color={colors.textPrimary} weight="bold" />
      </Pressable>

      {isOpen && (
        <ScrollView
          className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg"
          style={{
            maxHeight,
            backgroundColor: colors.secondary,
          }}>
          {options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              style={{
                height: 48,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}>
              <Text
                className="font-inter text-lg font-bold"
                style={{
                  color: colors.textPrimary,
                }}>
                {option.text}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Dropdown;
