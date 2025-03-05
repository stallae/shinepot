import { NavigatorScreenParams } from '@react-navigation/native';

// Root Stack
export const ROOT = {
  OnBoardStart: 'OnBoardStart',
  Auth: 'Auth',
  Blog: 'Blog',
} as const;

// Auth Stack
export const AUTH = {
  // Login Flow
  LoginStart: 'LoginStart',
  LoginThirdParty: 'LoginThirdParty',
  LoginOtp: 'LoginOtp',
  LoginPhone: 'LoginPhone',
  LoginOtpPhone: 'LoginOtpPhone',
  Login: 'Login',
  RecoverPassword: 'RecoverPassword',

  // Registration Flow
  RegisterEmail: 'RegisterEmail',
  RegisterOtp: 'RegisterOtp',
  RegisterInfos: 'RegisterInfos',
  RegisterPassword: 'RegisterPassword',
  RegisterVerified: 'RegisterVerified',

  // Legal Pages
  TermsOfUse: 'TermsOfUse',
  PrivacyPolicy: 'PrivacyPolicy',
} as const;

// Combined routes for easy access
export const ROUTES = {
  ...ROOT,
  ...AUTH,
} as const;

// Types
export type RootRoutes = typeof ROOT;
export type AuthRoutes = typeof AUTH;
export type Routes = typeof ROUTES;

// Helper for type-safe navigation
export type RootStackParamList = {
  [K in keyof typeof ROOT]: undefined;
};

export type AuthStackParamList = {
  [K in keyof typeof AUTH]: undefined;
}; 