import { ModalTypeFilterType } from '../constants/filter';
import { Messages, MessagesComments, MessageLikes, MessageAuditStatus, MessageRecipients } from '../interfaces/messages';

export type SerializedMessages = Omit<Messages, 'publish_date' | 'created_at' | 'message_likes' | 'messages_comments' | 'message_audit_status' | 'message_recipients'> & {
  publish_date: string | Date;
  created_at: string | Date;
  message_likes?: Omit<MessageLikes, 'created_at'> & { created_at: string | Date };
  messages_comments?: Array<Omit<MessagesComments, 'created_at'> & { created_at: string | Date }>;
  message_recipients?: MessageRecipients;
  message_audit_status?: Omit<MessageAuditStatus, 'created_at'> & { created_at: string | Date };
};

const ROOT = {
  OnBoardStart: 'OnBoardStart',
  Auth: 'Auth',
  Blog: 'Blog',
  NewMessageFlow: 'NewMessageFlow',
  ViewMessage: 'ViewMessage',
  Profile: 'Profile',
  PersonalInformation: 'PersonalInformation',
  PaymentMethods: 'PaymentMethods',
  DataPrivacy: 'DataPrivacy',
  About: 'About',
  BecomeMember: 'BecomeMember',
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
  ...AUTH,
  ...NEW_MESSAGE,
} as const;

export type RootStackParamList = {
  OnBoardStart: undefined;
  Auth: undefined;
  Blog: undefined;
  NewMessageFlow:
  | undefined
  | {
    screen: 'NewMessageText' | 'NewMessageImage' | 'NewMessageAudio' | 'NewMessageVideo' | 'NewMessage' | 'NewMessageTitle' | 'NewMessageRecipient' | 'MessageConfirmation';
    params?: NewMessageStackParamList['NewMessageText' | 'NewMessageImage' | 'NewMessageAudio' | 'NewMessageVideo' | 'NewMessage' | 'NewMessageTitle' | 'NewMessageRecipient' | 'MessageConfirmation'];
  };
  ViewMessage: { message: SerializedMessages };
  Profile: undefined;
  PersonalInformation: undefined;
  PaymentMethods: undefined;
  DataPrivacy: undefined;
  About: undefined;
  BecomeMember: undefined;
};

export type AuthStackParamList = {
  [K in keyof typeof AUTH]: undefined;
};

export interface NewMessageData {
  mood?: string;
  contentType: string;
  messageType: ModalTypeFilterType;
  date: Date | string;
  title?: string;
  recipient?: {
    type: 'self' | 'other';
    email?: string;
    phone?: string;
  };
}

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
