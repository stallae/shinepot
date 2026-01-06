export interface MessageTypeInfo {
  type: string;
  description: string;
}

export const MESSAGE_TYPES_INFO: MessageTypeInfo[] = [
  {
    type: 'Public',
    description:
      'Everyone can see, comment, react, or share your message. Perfect for open conversations and sharing with the community.',
  },
  {
    type: 'Private',
    description:
      'Choose who receives your message. You can send it to someone specific or yourself. Messages can be set to be viewed only once or saved. No replies are allowed.',
  },
  {
    type: 'Random',
    description:
      'Your message is sent to a random person who can either pass it along or respond. You must reply with the same content type and can only participate once. Everyone in the conversation can see all messages until it ends—either when the limit is reached (e.g., 5 responses) or when the same message is passed twice in a row.',
  },
  {
    type: 'Invite',
    description:
      'Send an invite to a friend to join the app. You will be able to message them once they join.',
  },
];

