import {useEffect, useState} from 'react';
import {getRandomMessages} from '../services/randomMessageService';
import {RandomMessage} from '../interfaces/messages/RandomMessage';
import useAuth from './useAuth';

interface UseRandomMessagesReturn {
  messages: RandomMessage[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const useRandomMessages = (): UseRandomMessagesReturn => {
  const [messages, setMessages] = useState<RandomMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const {isAuthenticated} = useAuth();

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`[useRandomMessages] Fetching random messages`);
      const randomMessages = await getRandomMessages();
      console.log(`[useRandomMessages] Fetched ${randomMessages.length} random messages`);
      setMessages(randomMessages);
    } catch (err) {
      console.error('[useRandomMessages] Error fetching messages:', err);
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

export default useRandomMessages;
