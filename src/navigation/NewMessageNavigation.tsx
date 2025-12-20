import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NewMessageStackParamList, ROUTES } from './roots';
import NewMessage from '../screens/create/NewMessage';
import NewMessageTitle from '../screens/create/NewMessageTitle';
import NewMessageText from '../screens/create/NewMessageText';
import NewMessageImage from '../screens/create/NewMessageImage';
import NewMessageAudio from '../screens/create/NewMessageAudio';
import NewMessageVideo from '../screens/create/NewMessageVideo';
import MessageConfirmation from '../screens/create/MessageConfirmation';

const Stack = createStackNavigator<NewMessageStackParamList>();

const NewMessageNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={ROUTES.NewMessage}>
            <Stack.Screen name={ROUTES.NewMessage} component={NewMessage} />
            <Stack.Screen name={ROUTES.NewMessageTitle} component={NewMessageTitle} />
            <Stack.Screen name={ROUTES.NewMessageText} component={NewMessageText} />
            <Stack.Screen name={ROUTES.NewMessageImage} component={NewMessageImage} />
            <Stack.Screen name={ROUTES.NewMessageAudio} component={NewMessageAudio} />
            <Stack.Screen name={ROUTES.NewMessageVideo} component={NewMessageVideo} />
            <Stack.Screen name={ROUTES.MessageConfirmation} component={MessageConfirmation} />
        </Stack.Navigator>
    );
};

export default NewMessageNavigation;
