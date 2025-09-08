import React from 'react';
import { useAuth } from '../contexts/AuthContext';

class FrappeApiClient {
  private baseURL: string;
  private token: string | null = null;
  private apiSecret: string | null = null;

  constructor() {
    this.baseURL = process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa';
    this.token = localStorage.getItem('frappe_token');
    this.apiSecret = localStorage.getItem('frappe_api_secret');
  }

  setToken(token: string | null) {
    this.token = token;
  }

  setApiSecret(apiSecret: string | null) {
    this.apiSecret = apiSecret;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add token to headers if available
    if (this.token) {
      // Check if it's a rest_auth token, Frappe API key, or our session token
      if (this.token.startsWith('frappe_session_')) {
        // For session tokens, we'll use cookies for authentication
        console.log('🔑 Using session token for app state, cookies for Frappe API');
      } else {
        // For rest_auth API keys, use Frappe's API key format
        headers['Authorization'] = `token ${this.token}:${this.apiSecret || ''}`;
        console.log('🔑 Using rest_auth API key authentication:', this.token.substring(0, 8) + '...');
      }
    }

    const config: RequestInit = {
      ...options,
      headers,
      mode: 'cors',
      credentials: 'include', // Always include cookies for Frappe authentication
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Frappe API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(username: string, password: string): Promise<any> {
    return this.request('/api/method/login', {
      method: 'POST',
      body: JSON.stringify({
        usr: username,
        pwd: password,
      }),
    });
  }

  async logout(): Promise<any> {
    return this.request('/api/method/logout', {
      method: 'POST',
    });
  }

  async getLoggedUser(): Promise<any> {
    return this.request('/api/method/frappe.auth.get_logged_user');
  }

  // Document methods
  async getDoc(doctype: string, name: string): Promise<any> {
    return this.request(`/api/resource/${doctype}/${name}`);
  }

  async getDocList(doctype: string, params: any = {}): Promise<any> {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/resource/${doctype}${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async createDoc(doctype: string, data: any): Promise<any> {
    return this.request(`/api/resource/${doctype}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDoc(doctype: string, name: string, data: any): Promise<any> {
    return this.request(`/api/resource/${doctype}/${name}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDoc(doctype: string, name: string): Promise<any> {
    return this.request(`/api/resource/${doctype}/${name}`, {
      method: 'DELETE',
    });
  }

  // Method calls
  async callMethod(method: string, args: any = {}): Promise<any> {
    return this.request(`/api/method/${method}`, {
      method: 'POST',
      body: JSON.stringify(args),
    });
  }
}

// Create singleton instance
export const frappeApi = new FrappeApiClient();

// Hook to use Frappe API with current auth context
export const useFrappeApi = () => {
  const { token } = useAuth();
  
  // Update token and API secret in API client when auth context changes
  React.useEffect(() => {
    frappeApi.setToken(token);
    const apiSecret = localStorage.getItem('frappe_api_secret');
    frappeApi.setApiSecret(apiSecret);
  }, [token]);

  return frappeApi;
};
