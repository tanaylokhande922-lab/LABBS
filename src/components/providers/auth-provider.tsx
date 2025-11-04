'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type UserCredentials = {
  displayName: string | null;
  email: string | null;
};

type AuthContextType = {
  user: UserCredentials | null;
  loading: boolean;
  login: (user: UserCredentials) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthInitializer({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserCredentials | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (user: UserCredentials) => {
    setUser(user);
    setLoading(false);
  };

  const logout = () => {
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
