import {useEffect, useState} from 'react';
import {getUserMemories} from '../services/memoryService';
import {Memory} from '../interfaces/messages';
import useAuth from './useAuth';

interface UseMemoriesReturn {
  memories: Memory[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const useMemories = (): UseMemoriesReturn => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const {user, isAuthenticated} = useAuth();

  const fetchMemories = async () => {
    if (!isAuthenticated || !user?.uid) {
      setIsLoading(false);
      setMemories([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log(`[useMemories] Fetching memories for user: ${user.uid}`);
      const userMemories = await getUserMemories(user.uid);
      console.log(`[useMemories] Fetched ${userMemories.length} memories`);
      setMemories(userMemories);
    } catch (err) {
      console.error('[useMemories] Error fetching memories:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, [isAuthenticated, user?.uid]);

  const refetch = () => {
    fetchMemories();
  };

  return {
    memories,
    isLoading,
    error,
    refetch,
  };
};

export default useMemories;