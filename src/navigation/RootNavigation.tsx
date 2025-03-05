import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, ROUTES } from './roots';
import OnBoardStart from '../screens/start/onBoard/OnBoardStart';
import AuthNavigation from './AuthNavigation';
import Blog from '../screens/main/Blog';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={ROUTES.OnBoardStart}
    >
      <Stack.Screen name={ROUTES.OnBoardStart} component={OnBoardStart} />
      <Stack.Screen name={ROUTES.Auth} component={AuthNavigation} />
      <Stack.Screen name={ROUTES.Blog} component={Blog} />
    </Stack.Navigator>
  );
};

export default RootNavigation; 