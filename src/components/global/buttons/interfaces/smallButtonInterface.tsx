import type {IconProps} from 'phosphor-react-native/lib/typescript/lib';
import React from 'react';

export interface SmallButtonProps {
  icon: React.ReactElement<IconProps> | null;
  color?: 'colored' | 'primary' | 'transparent';
  isDisabled?: boolean;
  onPress?: () => void;
}
