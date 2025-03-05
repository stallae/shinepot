import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList, ROUTES } from './roots';

import LoginStart from '../screens/start/auth/Login/LoginStart';
import LoginThirdParty from '../screens/start/auth/Login/LoginThirdParty';
import LoginOtp from '../screens/start/auth/Login/LoginOtp';
import LoginPhone from '../screens/start/auth/Login/LoginPhone';
import LoginOtpPhone from '../screens/start/auth/Login/LoginOtpPhone';
import Login from '../screens/start/auth/Login/Login';
import RegisterEmail from '../screens/start/auth/Register/RegisterStart';
import RegisterOtp from '../screens/start/auth/Register/RegisterOtp';
import RegisterInfos from '../screens/start/auth/Register/RegisterInfos';
import RegisterVerified from '../screens/start/auth/Register/RegisterVerified';
import RegisterPassword from '../screens/start/auth/Register/RegisterPassword';
import RecoverPassword from '../screens/start/auth/Login/RecoverPassword';
import ComplianceRules from '../screens/start/auth/Register/ComplianceRules';
const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.LoginStart} component={LoginStart} />
      <Stack.Screen name={ROUTES.LoginThirdParty} component={LoginThirdParty} />
      <Stack.Screen name={ROUTES.LoginOtp} component={LoginOtp} />
      <Stack.Screen name={ROUTES.LoginPhone} component={LoginPhone} />
      <Stack.Screen name={ROUTES.LoginOtpPhone} component={LoginOtpPhone} />
      <Stack.Screen name={ROUTES.Login} component={Login} />
      <Stack.Screen name={ROUTES.RegisterEmail} component={RegisterEmail} />
      <Stack.Screen name={ROUTES.RegisterOtp} component={RegisterOtp} />
      <Stack.Screen name={ROUTES.RegisterInfos} component={RegisterInfos} />
      <Stack.Screen name={ROUTES.RegisterPassword} component={RegisterPassword} />
      <Stack.Screen name={ROUTES.RegisterVerified} component={RegisterVerified} />
      <Stack.Screen name={ROUTES.RecoverPassword} component={RecoverPassword} />
      <Stack.Screen name={ROUTES.ComplianceRules} component={ComplianceRules} />
    </Stack.Navigator>
  );
};

export default AuthNavigation; 