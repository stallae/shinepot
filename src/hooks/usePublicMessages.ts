import {useEffect, useState} from 'react';
import {getPublicMessages} from '../services/publicMessageService';
import {PublicMessage} from '../interfaces/messages/Messages';
import useAuth from './useAuth';

interface UsePublicMessagesReturn {
  messages: PublicMessage[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const usePublicMessages = (): UsePublicMessagesReturn => {
  const [messages, setMessages] = useState<PublicMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const {isAuthenticated} = useAuth();

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`[usePublicMessages] Fetching public messages`);
      const publicMessages = await getPublicMessages();
      console.log(`[usePublicMessages] Fetched ${publicMessages.length} public messages`);
      setMessages(publicMessages);
    } catch (err) {
      console.error('[usePublicMessages] Error fetching messages:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

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

export default usePublicMessages;
