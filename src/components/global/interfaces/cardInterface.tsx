import {IconProps} from 'phosphor-react-native/lib/typescript/lib';
import {WideButtonProps} from './wideButtonInterface';

export interface CardProps {
  title: string;
  type?: 'success' | 'error' | 'warning' | 'done';
  icon?: React.ReactElement<IconProps>;
  description: string;
  button: WideButtonProps;
  secondButton?: WideButtonProps;
}
