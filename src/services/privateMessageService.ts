import firestore from '@react-native-firebase/firestore';
import type { PrivateMessage } from '../interfaces';

export const addPrivateMessage = async (
  messageData: Omit<PrivateMessage, 'id' | 'created_at'>,
): Promise<string> => {
  try {
    const privateMessagesRef = firestore().collection('private_messages');
    const messageRef = privateMessagesRef.doc();

    const newMessage: PrivateMessage = {
      ...messageData,
      id: messageRef.id,
      created_at: firestore.FieldValue.serverTimestamp(),
    };

    await messageRef.set(newMessage);
    console.log(`[PrivateMessageService] Private message added successfully: private_messages/${messageRef.id}`);
    return messageRef.id;
  } catch (error) {
    console.error('[PrivateMessageService] Error adding private message:', error);
    throw error;
  }
};

export const getPrivateMessagesByOwner = async (ownerId: string): Promise<PrivateMessage[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('private_messages')
      .where('owner_id', '==', ownerId)
      .orderBy('created_at', 'desc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as PrivateMessage);
  } catch (error) {
    console.error('[PrivateMessageService] Error fetching private messages by owner:', error);
    throw error;
  }
};

export const getPrivateMessagesByRecipientEmail = async (email: string): Promise<PrivateMessage[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('private_messages')
      .where('recipient.email', '==', email)
      .orderBy('created_at', 'desc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as PrivateMessage);
  } catch (error) {
    console.error('[PrivateMessageService] Error fetching private messages by recipient email:', error);
    throw error;
  }
};

export const getPrivateMessagesByRecipientPhone = async (phoneNumber: string): Promise<PrivateMessage[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('private_messages')
      .where('recipient.phone_number', '==', phoneNumber)
      .orderBy('created_at', 'desc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as PrivateMessage);
  } catch (error) {
    console.error('[PrivateMessageService] Error fetching private messages by recipient phone:', error);
    throw error;
  }
};

export const getPrivateMessageById = async (messageId: string): Promise<PrivateMessage | null> => {
  try {
    const docSnapshot = await firestore()
      .collection('private_messages')
      .doc(messageId)
      .get();

    if (!docSnapshot.exists) {
      return null;
    }

    return docSnapshot.data() as PrivateMessage;
  } catch (error) {
    console.error('[PrivateMessageService] Error fetching private message:', error);
    throw error;
  }
};

export const updatePrivateMessageStatus = async (
  messageId: string,
  status: 'locked' | 'released' | 'canceled',
): Promise<void> => {
  try {
    await firestore()
      .collection('private_messages')
      .doc(messageId)
      .update({ status });
    
    console.log(`[PrivateMessageService] Message status updated to ${status}: ${messageId}`);
  } catch (error) {
    console.error('[PrivateMessageService] Error updating message status:', error);
    throw error;
  }
};

export const deletePrivateMessage = async (messageId: string): Promise<void> => {
  try {
    await firestore().collection('private_messages').doc(messageId).delete();
    console.log(`[PrivateMessageService] Private message deleted: ${messageId}`);
  } catch (error) {
    console.error('[PrivateMessageService] Error deleting private message:', error);
    throw error;
  }
};
