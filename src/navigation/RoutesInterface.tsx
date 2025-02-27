import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  OnBoardStart: undefined;
  LoginOtp: undefined; // Exemplo: precisa de um número de telefone
  LoginStart: undefined;
  LoginThirdParty: undefined;
  RegisterEmail: undefined;
  RegisterOtp: undefined; // Exemplo: precisa de um e-mail
  RegisterUsername: undefined;
  RegisterVerified: undefined;
};

export const Routes = {
  OnBoardStart: 'OnBoardStart',
  LoginOtp: 'LoginOtp',
  LoginStart: 'LoginStart',
  LoginThirdParty: 'LoginThirdParty',
  RegisterEmail: 'RegisterEmail',
  RegisterOtp: 'RegisterOtp',
  RegisterUsername: 'RegisterUsername',
  RegisterVerified: 'RegisterVerified',
} as const; // 🔥 Adicionando `as const`

export type RootNavigationProp<RouteName extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, RouteName>;

type OnBoardStartNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnBoardStart'
>;

export type OnBoardStartProps = {
  navigation: OnBoardStartNavigationProp;
};
