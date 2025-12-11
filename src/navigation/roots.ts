const ROOT = {
  OnBoardStart: 'OnBoardStart',
  Auth: 'Auth',
  Blog: 'Blog',
  NewMessageFlow: 'NewMessageFlow',
} as const;

const AUTH = {
  LoginStart: 'LoginStart',
  LoginThirdParty: 'LoginThirdParty',
  LoginOtp: 'LoginOtp',
  LoginPhone: 'LoginPhone',
  LoginOtpPhone: 'LoginOtpPhone',
  Login: 'Login',
  RecoverPassword: 'RecoverPassword',

  RegisterEmail: 'RegisterEmail',
  RegisterOtp: 'RegisterOtp',
  RegisterInfos: 'RegisterInfos',
  RegisterPassword: 'RegisterPassword',
  RegisterVerified: 'RegisterVerified',

  TermsOfUse: 'TermsOfUse',
  PrivacyPolicy: 'PrivacyPolicy',
} as const;

const NEW_MESSAGE = {
  NewMessage: 'NewMessage',
  NewMessageTitle: 'NewMessageTitle',
} as const;

export const ROUTES = {
  ...ROOT,
  ...AUTH,
  ...NEW_MESSAGE,
} as const;

export type RootStackParamList = {
  [K in keyof typeof ROOT]: undefined;
};

export type AuthStackParamList = {
  [K in keyof typeof AUTH]: undefined;
};

export type NewMessageStackParamList = {
  [K in keyof typeof NEW_MESSAGE]: undefined;
};
