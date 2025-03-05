import {TextInput, Text, View, TextInputProps} from 'react-native';
import React from 'react';
import {InputProps} from '../interfaces/inputInterface.tsx';
import useColors from '../../../hooks/useColors.tsx';

interface GeneralInputProps extends InputProps {
  centerText?: boolean;
  inputRefs?: React.RefObject<TextInput>[];
  index?: number;
  isOtp?: boolean;
  icon?: React.ReactNode;
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
  onChange,
}) => {
  const {colors} = useColors();
  const handleChange = (text: string) => {
    if (isOtp && text.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyPress: TextInputProps['onKeyPress'] = ({nativeEvent}) => {
    if (isOtp && nativeEvent.key === 'Backspace' && index > 0 && !value) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  return (
    <View className={isOtp ? 'flex-1 mx-1' : 'w-full'}>
      {label ? (
        <Text className="font-inter font-medium mb-2" style={{ color: colors.textPrimary }}>
          {label}
        </Text>
      ) : null}

      <View className="flex-row w-full items-center rounded-lg overflow-hidden" style={{ backgroundColor: colors.secondary }}>
        {icon && (
          <View className="pl-3">
            {icon}
          </View>
        )}
        <TextInput
          ref={inputRefs[index]}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={secureText}
          maxLength={isOtp ? 1 : undefined}
          onChangeText={onChange || handleChange}
          onKeyPress={handleKeyPress}
          className="flex-1 font-bold font-inter text-lg"
          style={{
            height: 48,
            color: colors.textPrimary,
            textAlign: centerText ? 'center' : 'left',
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          value={value}
        />
      </View>
    </View>
  );
};

export default GeneralInput;
