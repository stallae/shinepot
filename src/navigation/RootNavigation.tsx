import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, ROUTES } from './roots';
import OnBoardStart from '../screens/start/onBoard/OnBoardStart';
import AuthNavigation from './AuthNavigation';
import Blog from '../screens/main/Blog';
import NewMessageNavigation from './NewMessageNavigation';
import ViewMessage from '../screens/main/view/ViewMessage';
import Profile from '../screens/profile/Profile';
import PersonalInformation from '../screens/profile/PersonalInformation';
import PaymentMethods from '../screens/profile/PaymentMethods';
import DataPrivacy from '../screens/profile/DataPrivacy';
import About from '../screens/profile/About';
import BecomeMember from '../screens/profile/BecomeMember';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTES.OnBoardStart}>
      <Stack.Screen name={ROUTES.OnBoardStart} component={OnBoardStart} />
      <Stack.Screen name={ROUTES.Auth} component={AuthNavigation} />
      <Stack.Screen name={ROUTES.Blog} component={Blog} />
      <Stack.Screen name={ROUTES.NewMessageFlow} component={NewMessageNavigation} />
      <Stack.Screen name={ROUTES.ViewMessage} component={ViewMessage} />
      <Stack.Screen name={ROUTES.Profile} component={Profile} />
      <Stack.Screen name={ROUTES.PersonalInformation} component={PersonalInformation} />
      <Stack.Screen name={ROUTES.PaymentMethods} component={PaymentMethods} />
      <Stack.Screen name={ROUTES.DataPrivacy} component={DataPrivacy} />
      <Stack.Screen name={ROUTES.About} component={About} />
      <Stack.Screen name={ROUTES.BecomeMember} component={BecomeMember} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
