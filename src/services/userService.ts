import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { User } from '../interfaces';

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
            last_login: firestore.FieldValue.serverTimestamp(),
        });
        console.log('[UserService] User updated successfully');
    } catch (error: unknown) {
        if (isFirestoreError(error) && (error.code === 'firestore/not-found' || error.message?.includes('not-found'))) {
            console.log('[UserService] User not found, creating new record...');
            try {
                const newUser: User = {
                    id: user.uid,
                    email: user.email || '',
                    name: user.displayName || '',
                    photo_URL: user.photoURL || '',
                    created_at: firestore.FieldValue.serverTimestamp(),
                    last_login: firestore.FieldValue.serverTimestamp(),
                    phone_number: user.phoneNumber || '',
                    allow_random: true,
                    address: {
                        id: `address_${user.uid}`,
                    },
                    paid_messages: 0,
                    stripe_customer_id: '',
                    liked: [],
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
            photo_URL: url 
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

export const ensureUserExists = async (userId: string, userEmail: string): Promise<void> => {
    const userRef = firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
        console.log(`[UserService] User document not found, creating for ${userId}`);
        await userRef.set({
            id: userId,
            email: userEmail,
            created_at: firestore.FieldValue.serverTimestamp(),
            last_login: firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
    }
};

// TODO : Ori ao salva msg aumenta o SENT do usuario aqui 

export const checkIfPhoneNumberExists = async (phoneNumber: string): Promise<boolean> => {
    try {
        const querySnapshot = await firestore()
            .collection('users')
            .where('phone_number', '==', phoneNumber)
            .get();

        return !querySnapshot.empty;
    } catch (error) {
        console.error('[UserService] Error checking phone number existence:', error);
        throw error;
    }
};