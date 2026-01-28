import firestore from '@react-native-firebase/firestore';
import type { PublicMessage, MessageStats, MessageComment } from '../interfaces';

export const addPublicMessage = async (
  messageData: Omit<PublicMessage, 'id' | 'created_at' | 'stats'>,
): Promise<string> => {
  try {
    const publicMessagesRef = firestore().collection('public_messages');
    const messageRef = publicMessagesRef.doc();

    const newMessage: PublicMessage = {
      ...messageData,
      id: messageRef.id,
      created_at: firestore.FieldValue.serverTimestamp(),
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
      },
    };

    await messageRef.set(newMessage);
    console.log(`[PublicMessageService] Public message added successfully: public_messages/${messageRef.id}`);
    return messageRef.id;
  } catch (error) {
    console.error('[PublicMessageService] Error adding public message:', error);
    throw error;
  }
};

export const getPublicMessages = async (): Promise<PublicMessage[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('public_messages')
      .orderBy('created_at', 'desc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as PublicMessage);
  } catch (error) {
    console.error('[PublicMessageService] Error fetching public messages:', error);
    throw error;
  }
};

export const getPublicMessagesByOwner = async (ownerId: string): Promise<PublicMessage[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('public_messages')
      .where('owner_id', '==', ownerId)
      .orderBy('created_at', 'desc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as PublicMessage);
  } catch (error) {
    console.error('[PublicMessageService] Error fetching public messages by owner:', error);
    throw error;
  }
};

export const getPublicMessageById = async (messageId: string): Promise<PublicMessage | null> => {
  try {
    const docSnapshot = await firestore()
      .collection('public_messages')
      .doc(messageId)
      .get();

    if (!docSnapshot.exists) {
      return null;
    }

    return docSnapshot.data() as PublicMessage;
  } catch (error) {
    console.error('[PublicMessageService] Error fetching public message:', error);
    throw error;
  }
  };

export const updatePublicMessageStats = async (
  messageId: string,
  stats: Partial<MessageStats>,
): Promise<void> => {
  try {
    const messageRef = firestore().collection('public_messages').doc(messageId);
    
    const updateData: Record<string, number> = {};
    if (stats.views !== undefined) {
      updateData['stats.views'] = stats.views;
    }
    if (stats.likes !== undefined) {
      updateData['stats.likes'] = stats.likes;
    }
    if (stats.comments !== undefined) {
      updateData['stats.comments'] = stats.comments;
    }

    await messageRef.update(updateData);
    console.log(`[PublicMessageService] Stats updated for message: ${messageId}`);
  } catch (error) {
    console.error('[PublicMessageService] Error updating message stats:', error);
    throw error;
  }
};

export const deletePublicMessage = async (messageId: string): Promise<void> => {
  try {
    await firestore().collection('public_messages').doc(messageId).delete();
    console.log(`[PublicMessageService] Public message deleted: ${messageId}`);
  } catch (error) {
    console.error('[PublicMessageService] Error deleting public message:', error);
    throw error;
  }
};

export const updatePublicMessageStatus = async (
  messageId: string,
  status: 'locked' | 'released' | 'canceled',
): Promise<void> => {
  try {
    await firestore()
      .collection('public_messages')
      .doc(messageId)
      .update({ status });
    
    console.log(`[PublicMessageService] Message status updated to ${status}: ${messageId}`);
  } catch (error) {
    console.error('[PublicMessageService] Error updating message status:', error);
    throw error;
  }
};

export const addLikeToPublicMessage = async (
  messageId: string,
  userId: string,
): Promise<string> => {
  try {
    const likesRef = firestore()
      .collection('public_messages')
      .doc(messageId)
      .collection('likes');
    
    const likeRef = likesRef.doc();
    
    await likeRef.set({
      id: likeRef.id,
      user_id: userId,
    });

    const messageRef = firestore().collection('public_messages').doc(messageId);
    await messageRef.update({
      'stats.likes': firestore.FieldValue.increment(1),
    });

    console.log(`[PublicMessageService] Like added to message: ${messageId}`);
    return likeRef.id;
  } catch (error) {
    console.error('[PublicMessageService] Error adding like:', error);
    throw error;
  }
};

export const removeLikeFromPublicMessage = async (
  messageId: string,
  likeId: string,
): Promise<void> => {
  try {
    await firestore()
      .collection('public_messages')
      .doc(messageId)
      .collection('likes')
      .doc(likeId)
      .delete();

    const messageRef = firestore().collection('public_messages').doc(messageId);
    await messageRef.update({
      'stats.likes': firestore.FieldValue.increment(-1),
    });

    console.log(`[PublicMessageService] Like removed from message: ${messageId}`);
  } catch (error) {
    console.error('[PublicMessageService] Error removing like:', error);
    throw error;
  }
};

export const addCommentToPublicMessage = async (
  messageId: string,
  userId: string,
  text: string,
): Promise<string> => {
  try {
    const commentsRef = firestore()
      .collection('public_messages')
      .doc(messageId)
      .collection('comments');
    
    const commentRef = commentsRef.doc();
    
    await commentRef.set({
      id: commentRef.id,
      user_id: userId,
      text,
      created_at: firestore.FieldValue.serverTimestamp(),
      stats: {
        likes: 0,
      },
    });

    const messageRef = firestore().collection('public_messages').doc(messageId);
    await messageRef.update({
      'stats.comments': firestore.FieldValue.increment(1),
    });

    console.log(`[PublicMessageService] Comment added to message: ${messageId}`);
    return commentRef.id;
  } catch (error) {
    console.error('[PublicMessageService] Error adding comment:', error);
    throw error;
  }
};

export const getPublicMessageComments = async (messageId: string): Promise<MessageComment[]> => {
  try {
    const querySnapshot = await firestore()
      .collection('public_messages')
      .doc(messageId)
      .collection('comments')
      .orderBy('created_at', 'desc')
      .get();

    return querySnapshot.docs.map(doc => doc.data() as MessageComment);
  } catch (error) {
    console.error('[PublicMessageService] Error fetching comments:', error);
    throw error;
  }
};

export const addLikeToComment = async (
  messageId: string,
  commentId: string,
  userId: string,
): Promise<string> => {
  try {
    const likesRef = firestore()
      .collection('public_messages')
      .doc(messageId)
      .collection('comments')
      .doc(commentId)
      .collection('likes');
    
    const likeRef = likesRef.doc();
    
    await likeRef.set({
      id: likeRef.id,
      user_id: userId,
    });

    const commentRef = firestore()
      .collection('public_messages')
      .doc(messageId)
      .collection('comments')
      .doc(commentId);
    
    await commentRef.update({
      'stats.likes': firestore.FieldValue.increment(1),
    });

    console.log(`[PublicMessageService] Like added to comment: ${commentId}`);
    return likeRef.id;
  } catch (error) {
    console.error('[PublicMessageService] Error adding like to comment:', error);
    throw error;
  }
};

export const incrementPublicMessageViews = async (messageId: string): Promise<void> => {
  try {
    await firestore()
      .collection('public_messages')
      .doc(messageId)
      .update({
        'stats.views': firestore.FieldValue.increment(1),
      });
    
    console.log(`[PublicMessageService] View count incremented for message: ${messageId}`);
  } catch (error) {
    console.error('[PublicMessageService] Error incrementing views:', error);
    throw error;
  }
};
