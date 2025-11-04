'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { getAuth, onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { auth, db, storage } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';

type UserCredentials = {
  uid: string;
  displayName: string | null;
  email: string | null;
};

type AuthContextType = {
  user: UserCredentials | null;
  loading: boolean;
  login: (credentials: { displayName: string; email: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthInitializer({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserCredentials | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveUserData = async (uid: string, name: string, email: string) => {
    const signupDate = new Date();
    const userType = 'guest';

    // Firestore
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        name,
        email,
        signupDate: serverTimestamp(),
        userType,
      });
       toast({
        title: 'User data saved to Firestore',
        description: `Name: ${name}, Email: ${email}`,
      });
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      toast({
        variant: 'destructive',
        title: 'Firestore Error',
        description: 'Could not save user data.',
      });
    }

    // Firebase Storage
    try {
      const fileContent = `Name: ${name}\nEmail: ${email}\nSignup Date: ${signupDate.toISOString()}\nUser Type: ${userType}`;
      const storageRef = ref(storage, `user_data/${uid}.txt`);
      await uploadString(storageRef, fileContent);
       toast({
        title: 'User data saved to Storage',
        description: `File uploaded to user_data/${uid}.txt`,
      });
    } catch (error) {
      console.error('Error saving to Storage:', error);
      toast({
        variant: 'destructive',
        title: 'Storage Error',
        description: 'Could not upload user data file.',
      });
    }
  };

  const login = async (credentials: { displayName: string, email: string }) => {
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInAnonymously(auth);
      const firebaseUser = userCredential.user;
      
      if (firebaseUser) {
        const userData = {
            uid: firebaseUser.uid,
            displayName: credentials.displayName,
            email: credentials.email,
        };
        setUser(userData);
        await saveUserData(firebaseUser.uid, credentials.displayName, credentials.email);
      }
    } catch (error) {
      console.error("Anonymous sign-in failed", error);
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthInitializer>{children}</AuthInitializer>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
