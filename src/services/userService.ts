import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '../interfaces/auth';

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
                // Initial stats and address placeholders could be set here if needed
                const newUser: User = {
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
                    stats: {
                        sent: 0,
                        scheduled: 0,
                        received: 0,
                        saved: 0,
                    }
                };
                await userRef.set(newUser);
                console.log('[UserService] User created successfully');
            } catch (createError) {
                console.error('[UserService] Error creating new user:', createError);
            }
        } else {
            console.error('[UserService] Error updating user:', error);
        }
    }
};

export const getUser = async (userId: string): Promise<User | null> => {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
            return userDoc.data() as User;
        }
        return null;
    } catch (error) {
        console.error('[UserService] Error fetching user:', error);
        throw error;
    }
};


export const uploadProfileImage = async (userId: string, imageUri: string): Promise<string> => {
    try {
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const reference = storage().ref(`profile_images/${userId}/${filename}`);
        
        await reference.putFile(imageUri);
        const url = await reference.getDownloadURL();
        
        await firestore().collection('users').doc(userId).update({
            photoURL: url 
        });
        
        return url;
    } catch (error) {
        console.error('[UserService] Error uploading profile image:', error);
        throw error;
    }
};

export const updateUser = async (userId: string, data: Partial<User>): Promise<void> => {
    try {
        await firestore().collection('users').doc(userId).update(data);
        console.log('[UserService] User updated successfully');
    } catch (error) {
        console.error('[UserService] Error updating user:', error);
        throw error;
    }
};
