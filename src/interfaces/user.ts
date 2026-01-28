
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface User {
  id: string;
  email: string;
  name: string;
  photo_URL: string;
  birthday?: string;
  created_at: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
  last_login: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
  phone_number: string;
  allow_random: boolean;
  address: Address;
  paid_messages?: number;
  stripe_customer_id?: string;
  liked?: UserLike[];
}

export interface Address {
  id: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  complement?: string;
  zip_code?: string;
  additional?: string;
}

export interface UserLike {
  id: string;
  message_id: string;
}

