import type {IconProps} from 'phosphor-react-native/lib/typescript/lib';

export interface WideButtonProps {
  icon?: React.ReactElement<IconProps> | null;
  text: string;
  outlined?: boolean;
  isDelete?: boolean;
  isDeleteOutline?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}
