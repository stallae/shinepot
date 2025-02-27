import {TextInput} from 'react-native';

export interface InputProps {
  label?: string;
  placeholder?: string;
  secureText?: boolean;
  value?: string;
  keyboardType: 'default' | 'number-pad' | 'numeric' | 'email-address';
  centerText?: boolean; // Define se o texto fica centralizado (OTP)
  inputRefs?: React.RefObject<TextInput>[]; // Refs para auto-focus no OTP
  index?: number; // Índice do input no OTP
  isOtp?: boolean;
  // onChangeText?: (value: string) => void;
}
