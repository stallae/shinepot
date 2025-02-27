import type {IconProps} from 'phosphor-react-native/lib/typescript/lib';

export interface BackButtonProps {
  icon?: React.ReactElement<IconProps> | null;
  onPress?: () => void;
}
