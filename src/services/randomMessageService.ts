import firestore from '@react-native-firebase/firestore';
import { RandomMessage } from '../interfaces/messages/Messages';


export const addRandomMessage = async (
  messageData: Omit<RandomMessage, 'id' | 'created_at'>,
): Promise<string> => {
  try {
    const randomMessagesRef = firestore().collection('random_messages');
    const messageRef = randomMessagesRef.doc();

    const newMessage: RandomMessage = {
      ...messageData,
      id: messageRef.id,
      created_at: firestore.FieldValue.serverTimestamp(),
    };

    await messageRef.set(newMessage);
    console.log(`[RandomMessageService] Random message added successfully: random_messages/${messageRef.id}`);
    return messageRef.id;
  } catch (error) {
    console.error('[RandomMessageService] Error adding random message:', error);
    throw error;
  }
};

export const getRandomMessages = async (): Promise<RandomMessage[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('random_messages')
      .orderBy('created_at', 'desc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as RandomMessage);
  } catch (error) {
    console.error('[RandomMessageService] Error fetching random messages:', error);
    throw error;
  }
};

export const getRandomMessagesByOwner = async (ownerId: string): Promise<RandomMessage[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('random_messages')
      .where('owner_id', '==', ownerId)
      .orderBy('created_at', 'desc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as RandomMessage);
  } catch (error) {
    console.error('[RandomMessageService] Error fetching random messages by owner:', error);
    throw error;
  }
};

export const getRandomMessagesByThread = async (threadId: string): Promise<RandomMessage[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('random_messages')
      .where('thread_id', '==', threadId)
      .orderBy('index', 'asc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as RandomMessage);
  } catch (error) {
    console.error('[RandomMessageService] Error fetching random messages by thread:', error);
    throw error;
  }
};

export const getRandomMessageById = async (messageId: string): Promise<RandomMessage | null> => {
  try {
    const docSnapshot = await firestore()
      .collection('random_messages')
      .doc(messageId)
      .get();

    if (!docSnapshot.exists) {
      return null;
    }

    return docSnapshot.data() as RandomMessage;
  } catch (error) {
    console.error('[RandomMessageService] Error fetching random message:', error);
    throw error;
  }
};

export const updateRandomMessageStatus = async (
  messageId: string,
  status: 'locked' | 'released' | 'canceled',
): Promise<void> => {
  try {
    await firestore()
      .collection('random_messages')
      .doc(messageId)
      .update({ status });
    
    console.log(`[RandomMessageService] Message status updated to ${status}: ${messageId}`);
  } catch (error) {
    console.error('[RandomMessageService] Error updating message status:', error);
    throw error;
  }
};

export const deleteRandomMessage = async (messageId: string): Promise<void> => {
  try {
    await firestore().collection('random_messages').doc(messageId).delete();
    console.log(`[RandomMessageService] Random message deleted: ${messageId}`);
  } catch (error) {
    console.error('[RandomMessageService] Error deleting random message:', error);
    throw error;
  }
};

export const getNextThreadIndex = async (threadId: string): Promise<number> => {
  try {
    const querySnapshot = await firestore()
      .collection('random_messages')
      .where('thread_id', '==', threadId)
      .orderBy('index', 'desc')
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return 0;
    }

    const lastMessage = querySnapshot.docs[0].data() as RandomMessage;
    return lastMessage.index + 1;
  } catch (error) {
    console.error('[RandomMessageService] Error getting next thread index:', error);
    throw error;
  }
};
