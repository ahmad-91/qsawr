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

  // Fallback to regular Frappe login
  const fallbackFrappeLogin = async (username: string, password: string): Promise<boolean> => {
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
        throw new Error('Fallback login failed');
      }

      const data = await response.json();
      console.log('🔍 Fallback Frappe login response:', data);
      
      if (data.message && data.message === 'Logged In') {
        // Generate a simple session token for our app
        const sessionToken = `frappe_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        setToken(sessionToken);
        setUser({ name: username });
        
        // Store in localStorage
        localStorage.setItem('frappe_token', sessionToken);
        localStorage.setItem('frappe_user', JSON.stringify({ name: username }));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        console.log('✅ Fallback session-based login successful');
        console.log('🔑 Session Token:', sessionToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Fallback login failed:', error);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Try rest_auth login first
      const response = await fetch(`${process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa'}/api/method/rest_auth.rest_auth.api.auth.login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('🔍 rest_auth Login response data:', data);
      
      // Check if rest_auth login was successful
      if (data.message === 'Logged In' && data.key_details && data.key_details.api_key) {
        // Use the API key from rest_auth
        const authToken = data.key_details.api_key;
        const apiSecret = data.key_details.api_secret;
        
        setToken(authToken);
        setUser({ 
          name: data.user_details.name,
          full_name: data.user_details.first_name + ' ' + data.user_details.last_name,
          email: data.user_details.email
        });
        
        // Store in localStorage
        localStorage.setItem('frappe_token', authToken);
        localStorage.setItem('frappe_api_secret', apiSecret);
        localStorage.setItem('frappe_user', JSON.stringify({
          name: data.user_details.name,
          full_name: data.user_details.first_name + ' ' + data.user_details.last_name,
          email: data.user_details.email
        }));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.user_details.name);
        
        // Verify storage
        console.log('🔍 Verifying localStorage storage:');
        console.log('frappe_token:', localStorage.getItem('frappe_token'));
        console.log('frappe_api_secret:', localStorage.getItem('frappe_api_secret'));
        console.log('frappe_user:', localStorage.getItem('frappe_user'));
        
        console.log('✅ rest_auth login successful');
        console.log('🔑 API Key:', authToken);
        console.log('🔐 API Secret:', apiSecret);
        console.log('👤 User:', data.user_details.name, data.user_details.first_name, data.user_details.last_name);
        console.log('📱 Token stored in localStorage as "frappe_token"');
        console.log('ℹ️ Using rest_auth API key for authentication');
        return true;
      } else {
        // Fallback to regular Frappe login
        console.log('⚠️ rest_auth failed, trying regular Frappe login...');
        return await fallbackFrappeLogin(username, password);
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
    localStorage.removeItem('frappe_api_secret');
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
