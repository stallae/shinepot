import { type NewMessageData } from "../interfaces";
import { type SerializedPublicMessage } from "../utils/messageSerialization";


const ROOT = {
  OnBoardStart: 'OnBoardStart',
  Auth: 'Auth',
  Blog: 'Blog',
  Private: 'Private',
  Threads: 'Threads',
  NewMessageFlow: 'NewMessageFlow',
} as const;

const PROFILE = {
  Profile: 'Profile',
  PaymentMethods: 'PaymentMethods',
  About: 'About',
  BecomeMember: 'BecomeMember',

  PersonalInformation: 'PersonalInformation',
  PersonalInfoDetails: 'PersonalInfoDetails',
  PersonalInfoEmail: 'PersonalInfoEmail',
  PersonalInfoPhone: 'PersonalInfoPhone',
  PersonalInfoAddress: 'PersonalInfoAddress',

  DataPrivacy: 'DataPrivacy',
  PrivacyDetail: 'PrivacyDetail',

  DataCollection: 'DataCollection',
  DataUsage: 'DataUsage',
  DataSharing: 'DataSharing',
  UserRights: 'UserRights',
  SecurityMeasures: 'SecurityMeasures',

  UpdateEmail: 'UpdateEmail',
  UpdateEmailPassword: 'UpdateEmailPassword',
  UpdateEmailConfirm: 'UpdateEmailConfirm',
  UpdatePhone: 'UpdatePhone',
  UpdatePhoneOtp: 'UpdatePhoneOtp',
  UpdatePhoneConfirm: 'UpdatePhoneConfirm',

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
  NewMessageRecipient: 'NewMessageRecipient',
  NewMessageText: 'NewMessageText',
  NewMessageImage: 'NewMessageImage',
  NewMessageAudio: 'NewMessageAudio',
  NewMessageVideo: 'NewMessageVideo',
  MessageConfirmation: 'MessageConfirmation',
} as const;

export const ROUTES = {
  ...ROOT,
  ...PROFILE,
  ...AUTH,
  ...NEW_MESSAGE,
} as const;

export type RootStackParamList = {
  OnBoardStart: undefined;
  Auth: undefined;
  Blog: { message: SerializedPublicMessage } | undefined;
  Private: undefined;
  Threads: undefined;
  NewMessageFlow:
  | undefined
  | {
    screen: 'NewMessageText' | 'NewMessageImage' | 'NewMessageAudio' | 'NewMessageVideo' | 'NewMessage' | 'NewMessageTitle' | 'NewMessageRecipient' | 'MessageConfirmation';
    params?: NewMessageStackParamList['NewMessageText' | 'NewMessageImage' | 'NewMessageAudio' | 'NewMessageVideo' | 'NewMessage' | 'NewMessageTitle' | 'NewMessageRecipient' | 'MessageConfirmation'];
  };
  Profile: undefined;
  PaymentMethods: undefined;
  About: undefined;
  BecomeMember: undefined;

  PersonalInformation: undefined;
  PersonalInfoDetails: undefined;
  PersonalInfoEmail: undefined;
  PersonalInfoPhone: undefined;
  PersonalInfoAddress: undefined;

  DataPrivacy: undefined;
  PrivacyDetail: { type: 'dataCollection' | 'dataUsage' | 'dataSharing' | 'userRights' | 'securityMeasures' };
  DataCollection: { type: 'dataCollection' };
  DataUsage: { type: 'dataUsage' };
  DataSharing: { type: 'dataSharing' };
  UserRights: { type: 'userRights' };
  SecurityMeasures: { type: 'securityMeasures' };

  UpdateEmail: undefined;
  UpdateEmailPassword: { email: string };
  UpdateEmailConfirm: { email: string };
  UpdatePhone: undefined;
  UpdatePhoneOtp: { phone: string; countryCode: string };
  UpdatePhoneConfirm: { phone: string };
};

export type AuthStackParamList = {
  [K in keyof typeof AUTH]: K extends 'LoginOtpPhone' ? { confirmation: any } : undefined;
};


export type NewMessageStackParamList = {
  NewMessage: undefined;
  NewMessageTitle: { data: Omit<NewMessageData, 'title'> };
  NewMessageRecipient: { data: Omit<NewMessageData, 'recipient'> & { title: string } };
  NewMessageText: { data: NewMessageData };
  NewMessageImage: { data: NewMessageData };
  NewMessageAudio: { data: NewMessageData };
  NewMessageVideo: { data: NewMessageData };
  MessageConfirmation: undefined;
};
