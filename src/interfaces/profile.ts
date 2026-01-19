import { Icon } from 'phosphor-react-native';
import { RootStackParamList } from '../navigation/roots';

export interface ProfileMenuItem {
    title: string;
    icon: Icon;
    route: keyof RootStackParamList;
    highlight?: boolean;
}


export interface ProfileStats {
    title: string;
    value: string;
    icon: Icon;
}
