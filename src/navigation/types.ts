import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList, AuthStackParamList } from './roots';

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export type ScreenNavigationProp = CompositeNavigationProp<
  AuthNavigationProp,
  RootNavigationProp
>;

export type ScreenProps = {
  navigation: ScreenNavigationProp;
};

export { ROUTES } from './roots'; 