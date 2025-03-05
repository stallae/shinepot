import { NavigatorScreenParams } from '@react-navigation/native';

// Root Stack
export const ROOT = {
  OnBoardStart: 'OnBoardStart',
  Auth: 'Auth',
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

  // Registration Flow
  RegisterEmail: 'RegisterEmail',
  RegisterOtp: 'RegisterOtp',
  RegisterInfos: 'RegisterInfos',
  RegisterPassword: 'RegisterPassword',
  RegisterVerified: 'RegisterVerified',
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
  [K in keyof typeof ROOT]: K extends 'Auth' 
    ? NavigatorScreenParams<AuthStackParamList> | undefined
    : undefined;
};

export type AuthStackParamList = {
  [K in keyof typeof AUTH]: undefined;
}; 