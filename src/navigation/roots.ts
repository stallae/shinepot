import { ModalTypeFilterType } from '../constants/filter';

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
  NewMessageText: 'NewMessageText',
  NewMessageImage: 'NewMessageImage',
  NewMessageAudio: 'NewMessageAudio',
  NewMessageVideo: 'NewMessageVideo',
  MessageConfirmation: 'MessageConfirmation',
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

export interface NewMessageData {
  mood: string;
  contentType: string;
  messageType: ModalTypeFilterType;
  date: Date | string; 
  title?: string;
}

export type NewMessageStackParamList = {
  NewMessage: undefined;
  NewMessageTitle: { data: Omit<NewMessageData, 'title'> };
  NewMessageText: { data: NewMessageData };
  NewMessageImage: { data: NewMessageData };
  NewMessageAudio: { data: NewMessageData };
  NewMessageVideo: { data: NewMessageData };
  MessageConfirmation: undefined;
};
