import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { get, ref, set } from 'firebase/database';
import { auth, database } from '../services/firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);

      if (nextUser) {
        const snapshot = await get(ref(database, `users/${nextUser.uid}/profile`));
        setProfile(snapshot.exists() ? snapshot.val() : null);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async ({ email, password, displayName, schoolClass }) => {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(credentials.user, {
      displayName,
    });

    const profilePayload = {
      displayName,
      schoolClass,
      createdAt: new Date().toISOString(),
    };

    await set(ref(database, `users/${credentials.user.uid}/profile`), profilePayload);
    setProfile(profilePayload);

    return credentials.user;
  };

  const login = ({ email, password }) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const value = useMemo(
    () => ({
      user,
      profile,
      isLoading,
      register,
      login,
      logout,
    }),
    [isLoading, profile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }

  return context;
}
