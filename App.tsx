import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';

// Initialize Firebase manually to bypass native linking issues
const firebaseConfig = {
  apiKey: "AIzaSyCyNeAFFw-rskorpq6O3Phv9Z_ThYppKCI",
  appId: "1:611205230918:ios:b0c1856adb2565200bb547",
  projectId: "shine-pot",
  storageBucket: "shine-pot.firebasestorage.app",
  messagingSenderId: "611205230918",
  authDomain: "shine-pot.firebaseapp.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase initialized manually');
}
import {ThemeProvider} from './src/utils/themeContext.tsx';
import './src/components/global/global.css';
import RootNavigation from './src/navigation/RootNavigation.tsx';
import {createServer} from 'miragejs';

createServer({
  routes() {
    this.get('/users', () => {
      return [];
    });
  },
});

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
