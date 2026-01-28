import {useEffect, useState} from 'react';
import {getPrivateMessagesByOwner} from '../services/privateMessageService';
import type { PrivateMessage } from '../interfaces';
import useAuth from './useAuth';

interface UsePrivateMessagesReturn {
  messages: PrivateMessage[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const usePrivateMessages = (): UsePrivateMessagesReturn => {
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const {isAuthenticated, user} = useAuth();

  const fetchMessages = async () => {
    if (!user?.uid) {
      setIsLoading(false);
      setMessages([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log(`[usePrivateMessages] Fetching private messages for user: ${user.uid}`);
      const privateMessages = await getPrivateMessagesByOwner(user.uid);
      console.log(`[usePrivateMessages] Fetched ${privateMessages.length} private messages`);
      setMessages(privateMessages);
    } catch (err) {
      console.error('[usePrivateMessages] Error fetching messages:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      fetchMessages();
    }
  }, [isAuthenticated, user?.uid]);

  const refetch = () => {
    fetchMessages();
  };

  return {
    messages,
    isLoading,
    error,
    refetch,
  };
};

export default usePrivateMessages;
