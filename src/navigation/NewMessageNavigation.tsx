import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NewMessageStackParamList, ROUTES } from './roots';
import NewMessage from '../screens/create/NewMessage';
import NewMessageTitle from '../screens/create/NewMessageTitle';

const Stack = createStackNavigator<NewMessageStackParamList>();

const NewMessageNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={ROUTES.NewMessage}>
            <Stack.Screen name={ROUTES.NewMessage} component={NewMessage} />
            <Stack.Screen name={ROUTES.NewMessageTitle} component={NewMessageTitle} />
        </Stack.Navigator>
    );
};

export default NewMessageNavigation;
