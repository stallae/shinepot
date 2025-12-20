import { Messages } from '../interfaces/messages';
import { SerializedMessages } from '../navigation/roots';

export const serializeMessage = (message: Messages): SerializedMessages => {
  return {
    ...message,
    publish_date: message.publish_date instanceof Date 
      ? message.publish_date.toISOString() 
      : message.publish_date,
    created_at: message.created_at instanceof Date 
      ? message.created_at.toISOString() 
      : message.created_at,
    message_likes: message.message_likes ? {
      ...message.message_likes,
      created_at: message.message_likes.created_at instanceof Date
        ? message.message_likes.created_at.toISOString()
        : message.message_likes.created_at,
    } : undefined,
    messages_comments: message.messages_comments?.map(comment => ({
      ...comment,
      created_at: comment.created_at instanceof Date
        ? comment.created_at.toISOString()
        : comment.created_at,
    })),
    message_recipients: message.message_recipients ? {
      ...message.message_recipients,
    } : undefined,
    message_audit_status: message.message_audit_status ? {
      ...message.message_audit_status,
      created_at: message.message_audit_status.created_at instanceof Date
        ? message.message_audit_status.created_at.toISOString()
        : message.message_audit_status.created_at,
    } : undefined,
  };
};
export const deserializeMessage = (message: SerializedMessages): Messages => {
  return {
    ...message,
    publish_date: typeof message.publish_date === 'string' 
      ? new Date(message.publish_date) 
      : message.publish_date,
    created_at: typeof message.created_at === 'string'
      ? new Date(message.created_at)
      : message.created_at,
    message_likes: message.message_likes ? {
      ...message.message_likes,
      created_at: typeof message.message_likes.created_at === 'string'
        ? new Date(message.message_likes.created_at)
        : message.message_likes.created_at,
    } : undefined,
    messages_comments: message.messages_comments?.map(comment => ({
      ...comment,
      created_at: typeof comment.created_at === 'string'
        ? new Date(comment.created_at)
        : comment.created_at,
    })),
    message_recipients: message.message_recipients,
    message_audit_status: message.message_audit_status ? {
      ...message.message_audit_status,
      created_at: typeof message.message_audit_status.created_at === 'string'
        ? new Date(message.message_audit_status.created_at)
        : message.message_audit_status.created_at,
    } : undefined,
  };
};

