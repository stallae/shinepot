import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';


function isFirestoreError(error: unknown): error is { code: string; message?: string } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as { code: unknown }).code === 'string'
    );
}

export const createOrUpdateUser = async (user: FirebaseAuthTypes.User) => {
    const userRef = firestore().collection('users').doc(user.uid);
    console.log(`[UserService] Syncing user ${user.uid} to Firestore...`);

    try {
        await userRef.update({
            lastLogin: firestore.FieldValue.serverTimestamp(),
        });
        console.log('[UserService] User updated successfully');
    } catch (error: unknown) {
        if (isFirestoreError(error) && (error.code === 'firestore/not-found' || error.message?.includes('not-found'))) {
            console.log('[UserService] User not found, creating new record...');
            try {
                await userRef.set({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    lastLogin: firestore.FieldValue.serverTimestamp(),
                    phoneNumber: user.phoneNumber,
                    plan: 'free',
                    stripeCustomerId: null,
                    stripeSubscriptionId: null,
                    stripePriceId: null,
                    stripeCurrentPeriodEnd: null,
                    stripeCurrentPeriodStart: null,
                });
                console.log('[UserService] User created successfully');
            } catch (createError) {
                console.error('[UserService] Error creating new user:', createError);
            }
        } else {
            console.error('[UserService] Error updating user:', error);
        }
    }
};
