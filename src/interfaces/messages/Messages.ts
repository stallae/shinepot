import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Address } from '../user';

export type MessageMood = 'happy' | 'sad' | 'love' | 'nostalgic';
export type MessageFormat = 'video' | 'image' | 'text' | 'audio';
export type MessageStatus = 'locked' | 'released' | 'canceled';

interface BaseMessage {
  id: string;
  owner_id: string;
  mood: MessageMood;
  format: MessageFormat;
  status: MessageStatus;
  publish_date: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
  created_at: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
  title: string;
  description: string;
  media_URL: string;
}

export interface PublicMessage extends BaseMessage {
  stats: MessageStats;
}

export interface PrivateMessage extends BaseMessage {
  recipient: Recipient;
}

export interface RandomMessage extends BaseMessage {
  thread_id: string;
  index: number;
}


export interface Recipient {
  id: string;
  provider: string;
  email?: string;
  phone_number?: string;
  address?: Address;
}


export interface MessageStats {
  views: number;
  likes: number;
  comments: number;
}

export interface MessageLike {
  id: string;
  user_id: string;
}

export interface MessageComment {
  id: string;
  user_id: string;
  created_at: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
  text: string;
  stats: CommentStats;
}

export interface CommentStats {
  likes: number;
}

export interface CommentLike {
  id: string;
  user_id: string;
}
