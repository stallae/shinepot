import {PaidServices} from './providers';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
  lastLogin: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
  phoneNumber: string;
  plan: 'free';
  stripeCustomerId: null;
  stripeSubscriptionId: null;
  stripePriceId: null;
  stripeCurrentPeriodEnd: null;
  stripeCurrentPeriodStart: null;
  allow_random_messages: boolean;
  address: Address;
  paid_services?: PaidServices[];
}

export interface Address {
  id: number;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  zip_code?: string;
}

