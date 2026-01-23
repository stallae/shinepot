import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import firestore from '@react-native-firebase/firestore';

const WEB_CLIENT_ID = '611205230918-qab5st61rci2p906aokgflfn6s1j7ulg.apps.googleusercontent.com';
const IOS_CLIENT_ID = '611205230918-kf9eapkogl3d8do53mgkc1mibhbh5pno.apps.googleusercontent.com';

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
});

const createOrUpdateUser = async (user: FirebaseAuthTypes.User) => {
    const userRef = firestore().collection('users').doc(user.uid);
    console.log(`[AuthService] Syncing user ${user.uid} to Firestore...`);

    try {
        await userRef.update({
            lastLogin: firestore.FieldValue.serverTimestamp(),
        });
        console.log('[AuthService] User updated successfully');
    } catch (error: any) {
        if (error.code === 'firestore/not-found' || error.message?.includes('not-found')) {
            console.log('[AuthService] User not found, creating new record...');
            try {
                await userRef.set({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    lastLogin: firestore.FieldValue.serverTimestamp(),
                });
                console.log('[AuthService] User created successfully');
            } catch (createError) {
                console.error('[AuthService] Error creating new user:', createError);
            }
        } else {
            console.error('[AuthService] Error updating user:', error);
        }
    }
};

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

export const signOut = async () => {
    try {
        await GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        console.error('Sign-Out Error:', error);
        throw error;
    }
};
