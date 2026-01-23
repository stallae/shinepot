import {UserContact} from './user';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type MemoryType = 'video' | 'image' | 'text' | 'audio';
export type MemoryStatus = 'locked' | 'released' | 'canceled';
export type MemoryVisibility = 'public' | 'private' | 'random' | 'invite';
export type MemoryMood = 'happy' | 'sad' | 'love' | 'nostalgic';
export type RecipientType = 'self' | 'other';
export type ProviderType = 'WhatsApp' | 'Email' | 'SMS' | 'None';

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
        type: RecipientType;
        email?: string;
        phone?: string;
        provider?: ProviderType;
    };
    memoryLikes?: MemoryLikes[];
    memoryComments?: MemoryComments[];
    memoryRecipients?: MemoryRecipients[];
    memoryThread?: MemoryThread;
}

export interface MemoryLikes {
  id?: string;
  user_id: number;
  memory_id: number;
  created_at: Date;
}

export interface MemoryComments {
  id: number;
  user_id: number;
  memory_id: number;
  comment: string;
  created_at: Date;
}

export interface MemoryRecipients {
  id: number;
  memory_id: number;
  recipient_contact: UserContact;
}

export interface MemoryThread {
  id: number;
  memory_id: number;
  parent_id: number;
}
