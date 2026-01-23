import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type MemoryType = 'video' | 'image' | 'text' | 'audio';
export type MemoryStatus = 'locked' | 'released';
export type MemoryVisibility = 'public' | 'private' | 'random' | 'invite';
export type MemoryMood = 'happy' | 'sad' | 'love' | 'nostalgic';

export interface Memory {
    id?: string;
    ownerId: string;
    ownerEmail: string;
    mood: MemoryMood;
    type: MemoryType;
    status: MemoryStatus;
    visibility: MemoryVisibility;
    releaseDate: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
    createdAt: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
    title: string;
    description: string;
    mediaUrl: string;
    thumbnailUrl?: string;
    stats: {
        views: number;
        likes: number;
        commentCount: number;
    };
    recipient?: {
        type: 'self' | 'other';
        email?: string;
        phone?: string;
    };
}


export const addMemory = async (
    memoryData: Omit<Memory, 'id' | 'createdAt' | 'stats'>,
) => {
    try {
        const memoryRef = firestore().collection('memories').doc();

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
        console.log(`[MemoryService] Memory added successfully: ${memoryRef.id}`);
        return memoryRef.id;
    } catch (error) {
        console.error('[MemoryService] Error adding memory:', error);
        throw error;
    }
};


export const getUserMemories = async (ownerId: string) => {
    try {
        const querySnapshot = await firestore()
            .collection('memories')
            .where('ownerId', '==', ownerId)
            .orderBy('createdAt', 'desc')
            .get();

        return querySnapshot.docs.map(doc => doc.data() as Memory);
    } catch (error) {
        console.error('[MemoryService] Error fetching user memories:', error);
        throw error;
    }
};
