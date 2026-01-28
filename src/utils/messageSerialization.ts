import { PublicMessage, RandomMessage, PrivateMessage } from '../interfaces';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type Message = PublicMessage | RandomMessage | PrivateMessage;

export type SerializedPublicMessage = Omit<PublicMessage, 'created_at'> & {
  created_at: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
};


export const serializeMessage = (message: Message): SerializedPublicMessage => {
  return {
    ...message,
    created_at: 'toDate' in message.created_at 
      ? message.created_at 
      : message.created_at,
  } as SerializedPublicMessage;
};

export const deserializeMessage = (message: SerializedPublicMessage): Message => {
  return {
    ...message,
    created_at: message.created_at,
  } as Message;
};

