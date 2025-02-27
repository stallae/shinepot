import {RootStackParamList} from './RoutesInterface.tsx';

export const Routes: Record<keyof RootStackParamList, string> = {
  OnBoardStart: 'onBoardStart',
  LoginOtp: 'loginOtp',
  LoginStart: 'loginStart',
  LoginThirdParty: 'loginThirdParty',
  RegisterEmail: 'registerEmail',
  RegisterOtp: 'registerOtp',
  RegisterUsername: 'registerUsername',
  RegisterVerified: 'registerVerified',
};
