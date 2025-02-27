import {TextInput, Text, View, TextInputProps} from 'react-native';
import React from 'react';
import {InputProps} from '../interfaces/inputInterface.tsx';
import useColors from '../../../hooks/useColors.tsx';

interface GeneralInputProps extends InputProps {
  centerText?: boolean;
  inputRefs?: React.RefObject<TextInput>[];
  index?: number;
  isOtp?: boolean;
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
        <Text className="font-inter font-medium mb-2 color-gray-350">
          {label}
        </Text>
      ) : null}

      <TextInput
        ref={inputRefs[index]}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureText}
        maxLength={isOtp ? 1 : undefined} // Limita a 1 caractere só se for OTP
        onChangeText={handleChange}
        onKeyPress={handleKeyPress}
        className="w-full font-bold font-inter text-lg"
        style={{
          height: 48,
          backgroundColor: colors.secondary,
          color: colors.textPrimary,
          textAlign: centerText ? 'center' : 'left',
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
        value={value}
      />
    </View>
  );
};

export default GeneralInput;
