import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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

            return auth().signInWithCredential(googleCredential);
        } else {
            throw new Error('Google Sign-In was cancelled or failed');
        }
    } catch (error) {
        console.error('Google Sign-In Error:', error);
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
