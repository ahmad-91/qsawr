// Cookie utility functions
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

export const setCookie = (name: string, value: string, days: number = 30): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  // Add SameSite and Secure for better security
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure=${window.location.protocol === 'https:'}`;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const hasValidSession = (): boolean => {
  const sid = getCookie('sid');
  const userId = getCookie('user_id');
  return !!(sid && userId);
};

export const getCurrentUser = (): string | null => {
  return getCookie('user_id');
};

export const getUserFullName = (): string | null => {
  return getCookie('full_name');
};

// Refresh session by making a request to keep it alive
export const refreshSession = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_FRAPPE_URL}/api/method/frappe.auth.get_logged_user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return !!data.message;
    }
    return false;
  } catch (error) {
    console.error('Session refresh failed:', error);
    return false;
  }
};

// Clear all authentication data
export const clearAuthData = (): void => {
  // Clear localStorage
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  
  // Clear cookies
  deleteCookie('sid');
  deleteCookie('user_id');
  deleteCookie('full_name');
  deleteCookie('system_user');
};
