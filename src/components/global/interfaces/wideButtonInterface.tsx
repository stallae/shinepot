import type {IconProps} from 'phosphor-react-native/lib/typescript/lib';

export interface WideButtonProps {
  icon?: React.ReactElement<IconProps> | null;
  text: string;
  outlined?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}
