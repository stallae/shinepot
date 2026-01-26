import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthHookReturn {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const useAuth = (): AuthHookReturn => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      setUser(authUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAuthenticated = !!user;

  return {user, isLoading, isAuthenticated};
};

export default useAuth;