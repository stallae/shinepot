import { Messages } from '../interfaces/messages';
import { SerializedMessages } from '../navigation/roots';

export const serializeMessage = (message: Messages): SerializedMessages => {
  return {
    ...message,
    createdAt: 'toDate' in message.createdAt 
      ? message.createdAt 
      : message.createdAt,
    memoryLikes: message.memoryLikes?.map(like => ({
      ...like,
      created_at: like.created_at instanceof Date
        ? like.created_at.toISOString()
        : like.created_at,
    })),
    memoryComments: message.memoryComments?.map(comment => ({
      ...comment,
      created_at: comment.created_at instanceof Date
        ? comment.created_at.toISOString()
        : comment.created_at,
    })),
    memoryRecipients: message.memoryRecipients,
  };
};
export const deserializeMessage = (message: SerializedMessages): Messages => {
  return {
    ...message,
    createdAt: message.createdAt,
    memoryLikes: message.memoryLikes?.map(like => ({
      ...like,
      created_at: typeof like.created_at === 'string'
        ? new Date(like.created_at)
        : like.created_at,
    })),
    memoryComments: message.memoryComments?.map(comment => ({
      ...comment,
      created_at: typeof comment.created_at === 'string'
        ? new Date(comment.created_at)
        : comment.created_at,
    })),
    memoryRecipients: message.memoryRecipients,
  };
};

