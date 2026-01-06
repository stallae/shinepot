import {UserContact} from './user.ts';

export interface Messages {
  id: number;
  user_owner_id: number;
  provider_id: number;
  s3_url: string;
  message_type: 'private' | 'public' | 'random';
  message_content_type: 'video' | 'image' | 'text' | 'audio';
  title?: string;
  publish_date: Date;
  hidden: boolean;
  created_at: Date;
  message_likes?: MessageLikes;
  messages_comments?: MessagesComments[];
  message_recipients?: MessageRecipients;
  message_audit_status?: MessageAuditStatus;
  message_thread?: MessageThread;
}

export interface MessageLikes {
  id: number;
  user_id: number;
  message_id: number;
  created_at: Date;
}

export interface MessagesComments {
  id: number;
  user_id: number;
  message_id: number;
  comment: string;
  created_at: Date;
}

export interface MessageRecipients {
  id: number;
  message_id: number;
  recipient_contact: UserContact;
}

export interface MessageAuditStatus {
  id: number;
  message_id: number;
  message_status_type: 'published' | 'pending' | 'canceled';
  created_at: Date;
}

export interface MessageThread {
  id: number;
  id_message: number;
  id_answer: number;
}
