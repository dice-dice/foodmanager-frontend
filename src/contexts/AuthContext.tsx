import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthUser, LoginRequest, SignupRequest, JwtResponse } from '../types';
import { authApi } from '../api';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<JwtResponse>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初期化時にlocalStorageから認証情報を復元
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest): Promise<JwtResponse> => {
    const response = await authApi.signin(data);

    // トークンとユーザー情報を保存
    localStorage.setItem('accessToken', response.accessToken);
    const authUser: AuthUser = {
      id: response.id,
      username: response.username,
      roles: response.roles,
    };
    localStorage.setItem('user', JSON.stringify(authUser));
    setUser(authUser);

    return response;
  };

  const signup = async (data: SignupRequest): Promise<void> => {
    await authApi.signup(data);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
