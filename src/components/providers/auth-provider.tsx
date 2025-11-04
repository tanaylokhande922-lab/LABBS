'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  signInAnonymously,
  User,
  updateProfile,
} from 'firebase/auth';
import { useUser, useAuth, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { ref, uploadString, getStorage } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

// Simplified credentials, as we only need the display name for anonymous users
type UserCredentials = {
  uid: string;
  displayName: string | null;
  email: string | null;
};

type AuthContextType = {
  user: UserCredentials | null;
  loading: boolean;
  login: (credentials: { displayName: string; email: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser, isUserLoading } = useUser(); // Get user from the central provider
  const auth = useAuth(); // Get auth instance from the central provider
  const firestore = useFirestore(); // Get firestore instance
  const [user, setUser] = useState<UserCredentials | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(isUserLoading);
    if (!isUserLoading && firebaseUser) {
      setUser({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
      });
    } else if (!isUserLoading && !firebaseUser) {
      setUser(null);
    }
  }, [firebaseUser, isUserLoading]);

  const saveUserData = (
    fs: Firestore,
    userToSave: User,
    name: string,
    email: string
  ) => {
    const signupDate = new Date();
    const userType = 'guest';

    // Firestore
    const userRef = doc(fs, 'users', userToSave.uid);
    const userData = {
      id: userToSave.uid,
      displayName: name,
      email,
      signupDate: serverTimestamp(),
      userType,
    };
    setDoc(userRef, userData, { merge: true }).catch((serverError) => {
      const permissionError = new FirestorePermissionError({
        path: userRef.path,
        operation: 'write',
        requestResourceData: userData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });

    // Firebase Storage
    const storage = getStorage();
    const fileContent = `Name: ${name}\nEmail: ${email}\nSignup Date: ${signupDate.toISOString()}\nUser Type: ${userType}`;
    const storageRef = ref(storage, `user_data/${userToSave.uid}.txt`);
    uploadString(storageRef, fileContent).catch((error) => {
      console.error('Error saving to Storage:', error);
      toast({
        variant: 'destructive',
        title: 'Storage Error',
        description: 'Could not upload user data file.',
      });
    });
  };

  const login = async (credentials: { displayName: string; email: string }) => {
    setLoading(true);
    try {
      if (!auth) {
        throw new Error('Auth service is not available.');
      }
      
      const userCredential = await signInAnonymously(auth);
      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        // Update Firebase Auth profile
        await updateProfile(firebaseUser, {
          displayName: credentials.displayName,
        });

        const userWithEmail: UserCredentials = {
          uid: firebaseUser.uid,
          displayName: credentials.displayName,
          email: credentials.email,
        };
        setUser(userWithEmail);

        // Save data to Firestore and Storage
        saveUserData(firestore, firebaseUser, credentials.displayName, credentials.email);
        
        toast({
          title: 'Signed in as Guest',
          description: `Welcome, ${credentials.displayName}!`,
        });
      }
    } catch (error) {
      console.error('Anonymous sign-in failed', error);
      toast({
        variant: 'destructive',
        title: 'Sign-in Failed',
        description:
          'Could not sign you in. Please check the console for details.',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (auth) {
      auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
