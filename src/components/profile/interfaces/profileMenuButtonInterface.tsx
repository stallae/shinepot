import { Icon } from 'phosphor-react-native';
import { RootStackParamList } from '../../../navigation/roots';

export interface ProfileMenuButtonProps {
  title: string;
  icon: Icon;
  route: keyof RootStackParamList;
  highlight?: boolean;
  description?: string;
  onPress?: () => void;
}
