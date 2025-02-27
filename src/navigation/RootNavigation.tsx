import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import OnBoardStart from '../screens/start/onBoard/OnBoardStart.tsx';
import LoginStart from '../screens/start/auth/Login/LoginStart.tsx';
import LoginThirdParty from '../screens/start/auth/Login/LoginThirdParty.tsx';
import LoginOtp from '../screens/start/auth/Login/LoginOtp.tsx';
import RegisterEmail from '../screens/start/auth/Register/RegisterStart.tsx';
import RegisterOtp from '../screens/start/auth/Register/RegisterOtp.tsx';
import RegisterUsername from '../screens/start/auth/Register/RegisterUsername.tsx';
import RegisterVerified from '../screens/start/auth/Register/RegisterVerified.tsx';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null, headerShown: false}}
      initialRouteName={Routes.OnBoardStart}>
      <Stack.Screen name={Routes.OnBoardStart} component={OnBoardStart} />
      <Stack.Screen name={Routes.LoginStart} component={LoginStart} />
      <Stack.Screen name={Routes.LoginThirdParty} component={LoginThirdParty} />
      <Stack.Screen name={Routes.LoginOtp} component={LoginOtp} />
      <Stack.Screen name={Routes.RegisterEmail} component={RegisterEmail} />
      <Stack.Screen name={Routes.RegisterOtp} component={RegisterOtp} />
      <Stack.Screen
        name={Routes.RegisterUsername}
        component={RegisterUsername}
      />
      <Stack.Screen
        name={Routes.RegisterVerified}
        component={RegisterVerified}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
