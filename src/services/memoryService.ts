import firestore from '@react-native-firebase/firestore';
import { Memory } from '../interfaces/messages';


const ensureUserExists = async (userId: string, userEmail: string): Promise<void> => {
    const userRef = firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
        console.log(`[MemoryService] User document not found, creating for ${userId}`);
        await userRef.set({
            uid: userId,
            email: userEmail,
            createdAt: firestore.FieldValue.serverTimestamp(),
            lastLogin: firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
    }
};


export const addMemory = async (
    memoryData: Omit<Memory, 'id' | 'createdAt' | 'stats'>,
): Promise<string> => {
    try {
        await ensureUserExists(memoryData.ownerId, memoryData.ownerEmail);
        const userMemoriesRef = firestore()
            .collection('users')
            .doc(memoryData.ownerId)
            .collection('memories');
        
        const memoryRef = userMemoriesRef.doc();

        const newMemory: Memory = {
            ...memoryData,
            id: memoryRef.id,
            createdAt: firestore.FieldValue.serverTimestamp(),
            stats: {
                views: 0,
                likes: 0,
                commentCount: 0,
            },
        };

        await memoryRef.set(newMemory);
        console.log(`[MemoryService] Memory added successfully: users/${memoryData.ownerId}/memories/${memoryRef.id}`);
        return memoryRef.id;
    } catch (error) {
        console.error('[MemoryService] Error adding memory:', error);
        throw error;
    }
};


export const getUserMemories = async (ownerId: string): Promise<Memory[]> => {
    try {
        const querySnapshot = await firestore()
            .collection('users')
            .doc(ownerId)
            .collection('memories')
            .orderBy('createdAt', 'desc')
            .get();

        return querySnapshot.docs.map(doc => doc.data() as Memory);
    } catch (error) {
        console.error('[MemoryService] Error fetching user memories:', error);
        throw error;
    }
};
