import { TextInput, Text, View, TextInputProps, Pressable } from 'react-native';
import * as React from 'react';
import { InputProps } from './interfaces/inputInterface';
import useColors from '../../../hooks/useColors';

interface GeneralInputProps extends InputProps {
  centerText?: boolean;
  inputRefs?: React.RefObject<TextInput>[];
  index?: number;
  isOtp?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  value?: string;
  onChange?: (text: string) => void;
}

const GeneralInput: React.FC<GeneralInputProps> = ({
  label = '',
  placeholder = '',
  keyboardType = 'default',
  secureText = false,
  value,
  centerText = false,
  inputRefs = [],
  index = 0,
  isOtp = false,
  icon,
  rightIcon,
  onRightIconPress,
  onChange,
}) => {
  const { colors } = useColors();
  const handleChange = (text: string) => {
    if (onChange) {
      onChange(text);
    }
    if (isOtp && text.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyPress: TextInputProps['onKeyPress'] = ({ nativeEvent }) => {
    if (isOtp && nativeEvent.key === 'Backspace' && index > 0 && !value) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  return (
    <View className={isOtp ? 'flex-1 mx-1' : 'w-full'}>
      {label ? (
        <Text
          className="font-inter font-medium mb-2"
          style={{ color: colors.textPrimary }}>
          {label}
        </Text>
      ) : null}

      <View
        className="flex-row w-full items-center rounded-lg overflow-hidden"
        style={{ backgroundColor: colors.secondary }}>
        {icon && <View className="pl-3">{icon}</View>}
        <TextInput
          ref={inputRefs[index]}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={secureText}
          maxLength={isOtp ? 1 : undefined}
          onChangeText={handleChange}
          onKeyPress={handleKeyPress}
          className="flex-1 font-bold font-inter text-lg px-3 h-14 py-0"
          style={{
            color: colors.textPrimary,
            textAlign: centerText ? 'center' : 'left',
            textAlignVertical: 'center',
            lineHeight: undefined,
          }}
          value={value}
        />
        {rightIcon && (
          <Pressable onPress={onRightIconPress} className="pr-3 justify-center">
            {rightIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default GeneralInput;
