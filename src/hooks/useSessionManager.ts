import { useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { hasValidSession } from '../shared/utils/cookies';

export const useSessionManager = () => {
  const history = useHistory();
  const sessionCheckInterval = useRef<NodeJS.Timeout | null>(null);

  // Check session validity
  const checkSession = useCallback(async () => {
    try {
      console.log('SessionManager: Checking session...');
      
      // First check if user is logged in locally
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        console.log('SessionManager: User not logged in locally, skipping session check');
        return false;
      }
      
      // Check if we have valid cookies
      const hasValidCookies = hasValidSession();
      console.log('SessionManager: hasValidCookies:', hasValidCookies);
      
      if (!hasValidCookies) {
        console.log('SessionManager: No valid cookies, but user is logged in locally - this might be a new session');
        // Don't clear localStorage immediately, let the backend check decide
      }

      // Verify session with backend
      const frappeUrl = process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa';
      console.log('SessionManager: Using Frappe URL:', frappeUrl);
      
      const response = await fetch(`${frappeUrl}/api/method/frappe.auth.get_logged_user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log('SessionManager: Backend session check failed, but keeping local auth');
        // Don't clear localStorage on network errors, just log the error
        return false;
      }

      const data = await response.json();
      if (!data.message) {
        console.log('SessionManager: No user data from backend, but keeping local auth');
        // Don't clear localStorage on network errors, just log the error
        return false;
      }

      console.log('SessionManager: Session is valid, user:', data.message);
      return true;
    } catch (error) {
      console.error('SessionManager: Error checking session:', error);
      // Don't clear localStorage on network errors, just log the error
      return false;
    }
  }, []);

  // Start session monitoring
  const startSessionMonitoring = useCallback(() => {
    // Check session every 10 minutes, but start after 5 minutes to avoid interfering with login
    setTimeout(() => {
      console.log('SessionManager: Starting session monitoring...');
      sessionCheckInterval.current = setInterval(checkSession, 10 * 60 * 1000);
    }, 5 * 60 * 1000);
  }, [checkSession]);

  // Stop session monitoring
  const stopSessionMonitoring = useCallback(() => {
    if (sessionCheckInterval.current) {
      clearInterval(sessionCheckInterval.current);
      sessionCheckInterval.current = null;
    }
  }, []);

  // Initialize session check
  useEffect(() => {
    // Only start monitoring if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    console.log('SessionManager: Initializing, isLoggedIn:', isLoggedIn);
    
    if (isLoggedIn) {
      console.log('SessionManager: User is logged in, starting session monitoring');
      // Initial session check
      checkSession();
      
      // Start monitoring
      startSessionMonitoring();
    } else {
      console.log('SessionManager: User not logged in, skipping session monitoring');
    }

    // Cleanup on unmount
    return () => {
      stopSessionMonitoring();
    };
  }, [checkSession, startSessionMonitoring, stopSessionMonitoring]);

  return {
    checkSession,
    startSessionMonitoring,
    stopSessionMonitoring
  };
};
