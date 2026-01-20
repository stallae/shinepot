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

export interface AddressDetails {
  country: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement: string;
  zipCode: string;
}

export interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string; 
  avatarUrl: string;
  stats: {
    sent: number;
    scheduled: number;
    received: number;
    saved: number;
  };
  addressDetails: AddressDetails;
}