import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use Frappe SDK for user info once we have token
  const { currentUser, isLoading: sdkLoading } = useFrappeAuth();

  // Initialize token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('frappe_token');
    const storedUser = localStorage.getItem('frappe_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update user when SDK loads
  useEffect(() => {
    if (currentUser && token) {
      setUser(currentUser);
      localStorage.setItem('frappe_user', JSON.stringify(currentUser));
    }
  }, [currentUser, token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa'}/api/method/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          usr: username,
          pwd: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      if (data.message && data.message.login_key) {
        // Store token and user info
        const authToken = data.message.login_key;
        setToken(authToken);
        setUser({ name: username });
        
        // Store in localStorage
        localStorage.setItem('frappe_token', authToken);
        localStorage.setItem('frappe_user', JSON.stringify({ name: username }));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        console.log('✅ Token-based login successful');
        return true;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      console.error('❌ Token-based login failed:', errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
    
    // Clear localStorage
    localStorage.removeItem('frappe_token');
    localStorage.removeItem('frappe_user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    // Clear any stored cookies
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cookie_')) {
        localStorage.removeItem(key);
      }
    });
    
    console.log('✅ Token-based logout completed');
  };

  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    isLoading: isLoading || sdkLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
