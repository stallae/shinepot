import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { createOrUpdateUser } from './userService';

const WEB_CLIENT_ID = '611205230918-qab5st61rci2p906aokgflfn6s1j7ulg.apps.googleusercontent.com';
const IOS_CLIENT_ID = '611205230918-kf9eapkogl3d8do53mgkc1mibhbh5pno.apps.googleusercontent.com';

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
});

export const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        const response = await GoogleSignin.signIn();

        if (response.type === 'success') {
            const { idToken } = response.data;
            if (!idToken) {
                throw new Error('No ID token found');
            }

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            const userCredential = await auth().signInWithCredential(googleCredential);
            
            if (userCredential.user) {
                await createOrUpdateUser(userCredential.user);
            }

            return userCredential;
        } else {
            throw new Error('Google Sign-In was cancelled or failed');
        }
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
    }
};

export const signInWithApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
    }

    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    const userCredential = await auth().signInWithCredential(appleCredential);
    
    if (userCredential.user) {
        await createOrUpdateUser(userCredential.user);
    }
    
    return userCredential;
  } catch (error: any) {
    if (error.code === appleAuth.Error.CANCELED) {
        console.log('User canceled the sign-in flow');
        return;
    }
    console.error('Apple Sign-In Error:', error);
    throw error;
  }
};


export const signOut = async () => {
    try {
        await GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        console.error('Sign-Out Error:', error);
        throw error;
    }
};


