import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface User {
    uid: string;
    email: string | null;
    firstName?: string;
    lastName?: string;
    displayName: string | null;
    photoURL?: string | null;
    phoneNumber: string | null;
    createdAt: FirebaseFirestoreTypes.FieldValue | Date;
    lastLogin: FirebaseFirestoreTypes.FieldValue | Date;
    birthday?: string;
    
    // Stripe & Subscription
    plan?: 'free' | 'premium';
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    stripePriceId?: string | null;
    stripeCurrentPeriodEnd?: string | null;
    stripeCurrentPeriodStart?: string | null;

    // Address (optional for now, but good to have)
    addressDetails?: {
        country: string;
        state: string;
        city: string;
        street: string;
        number: string;
        complement: string;
        zipCode: string;
    };

    // Stats (to match ProfileData)
    stats?: {
        sent: number;
        scheduled: number;
        received: number;
        saved: number;
    };
}
