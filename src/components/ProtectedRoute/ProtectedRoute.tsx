import React, { useState, useEffect } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useFrappeAuth } from 'frappe-react-sdk';

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, ...rest }) => {
  const { currentUser, isLoading } = useFrappeAuth();
  const [authStatus, setAuthStatus] = useState<'loading' | boolean>('loading');
  
  // Start session monitoring only if user is authenticated (DISABLED - causing logout issues)
  // useSessionManager();
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      console.log('ProtectedRoute: Checking auth status...');
      console.log('ProtectedRoute: currentUser =', currentUser);
      console.log('ProtectedRoute: isLoading =', isLoading);
      
      // If SDK shows user, allow access
      if (currentUser) {
        console.log('ProtectedRoute: SDK user found, allowing access');
        setAuthStatus(true);
        return;
      }
      
      // If SDK is still loading, wait
      if (isLoading) {
        console.log('ProtectedRoute: SDK still loading...');
        setAuthStatus('loading');
        return;
      }
      
      // Check localStorage for authentication
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const username = localStorage.getItem('username');
      
      console.log('ProtectedRoute: localStorage isLoggedIn:', isLoggedIn);
      console.log('ProtectedRoute: localStorage username:', username);
      
      if (isLoggedIn && username) {
        console.log('ProtectedRoute: User authenticated via localStorage, allowing access');
        setAuthStatus(true);
      } else {
        console.log('ProtectedRoute: No localStorage auth, redirecting to login');
        setAuthStatus(false);
      }
    };

    checkAuth();
  }, [currentUser, isLoading]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authStatus === 'loading') {
          return (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              fontSize: '18px',
              color: '#666'
            }}>
              جاري التحقق من الجلسة...
            </div>
          );
        }
        
        return authStatus
          ? children
          : <Redirect to={{ pathname: '/login', state: { from: location } }} />;
      }}
    />
  );
};

export default ProtectedRoute;
