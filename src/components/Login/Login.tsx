import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../shared/themes';
import { useToast } from '../../contexts/ToastContext';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useAuth } from '../../contexts/AuthContext';

import { Layout } from '../Layout';

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px); /* Account for AppBar height */
`;

const LoginCard = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['3xl']};
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
    margin: ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  
  h1 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    margin: 0;
    background: ${({ theme }) => theme.colors.gradients.accent};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: ${({ theme }) => theme.spacing.sm} 0 0 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary[500]};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.surface.elevated};
  }
`;

const LoginButton = styled.button`
  background: ${({ theme }) => theme.colors.gradients.button};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  margin-top: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, isLoading, updateCurrentUser } = useFrappeAuth();
  const { showError, showSuccess } = useToast();
  const history = useHistory();
  const { login: tokenLogin, isAuthenticated } = useAuth();
  
  const frappeUrl = process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa';

  useEffect(() => {
    // Check both SDK and Token authentication
    if (!isLoading && (currentUser || isAuthenticated)) {
      console.log('Login: User already authenticated, redirecting to dashboard...');
      history.push('/dashboard');
    }
  }, [isLoading, currentUser, isAuthenticated, history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      showError('خطأ في الإدخال', 'يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    try {
      console.log('Login: Attempting Token-based login for:', username);
      
      // Try Token-based authentication first
      const tokenSuccess = await tokenLogin(username, password);
      
      if (tokenSuccess) {
        console.log('✅ Token-based login successful');
        showSuccess('تم تسجيل الدخول بنجاح', 'مرحباً بك في النظام');
        
        // Wait a moment before redirecting
        await new Promise(resolve => setTimeout(resolve, 1000));
        history.push('/dashboard');
        return;
      }
      
      // Fallback to cookie-based authentication
      console.log('Token login failed, trying cookie-based login...');
      
      const res = await fetch(`${frappeUrl}/api/method/login`, {
        method: 'POST',
        credentials: 'include', // This is crucial for cookies!
        mode: 'cors', // Explicitly set CORS mode
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ usr: username, pwd: password }),
      });
      
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?._error_message || j?.message || `Login failed (${res.status})`);
      }
      
      console.log('Fetch login successful');
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      console.log('Cookies after login:', document.cookie);
      
      // Extract cookies from response headers
      const setCookieHeader = res.headers.get('set-cookie');
      console.log('Set-Cookie header:', setCookieHeader);
      
      // Check all response headers for debugging
      console.log('All response headers:', Object.fromEntries(res.headers.entries()));
      
      // Parse and store cookies in localStorage
      if (setCookieHeader) {
        const cookies = setCookieHeader.split(',').map(cookie => cookie.trim());
        cookies.forEach(cookie => {
          const [nameValue] = cookie.split(';');
          const [name, value] = nameValue.split('=');
          if (name && value) {
            localStorage.setItem(`cookie_${name.trim()}`, value.trim());
            console.log(`Stored cookie: ${name.trim()} = ${value.trim()}`);
          }
        });
      } else {
        console.log('❌ No Set-Cookie header found in response!');
        console.log('This means extend_auth app is not working or not configured properly.');
      }
      
      // Store login success in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      console.log('Login state stored in localStorage');
      
      // Wait a moment for cookies to be set
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Check if cookies were set properly
      const cookiesAfterLogin = document.cookie;
      console.log('Cookies after fetch login:', cookiesAfterLogin);
      
      // Check stored cookies in localStorage
      const storedCookies = Object.keys(localStorage).filter(key => key.startsWith('cookie_'));
      console.log('Stored cookies in localStorage:', storedCookies);
      
      if (cookiesAfterLogin.includes('sid') || cookiesAfterLogin.includes('user_id')) {
        console.log('✅ Frappe cookies detected in browser - SDK should work properly');
      } else if (storedCookies.length > 0) {
        console.log('✅ Frappe cookies stored in localStorage - can be used as fallback');
      } else {
        console.log('⚠️ No Frappe cookies detected - SDK might not work');
        console.log('This might be due to CORS or domain issues');
      }
      
      showSuccess('تم تسجيل الدخول بنجاح', 'جاري فتح لوحة التحكم...');
      
      // Use history.replace to avoid page refresh
      history.replace('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      showError('خطأ في تسجيل الدخول', error.message || 'حدث خطأ أثناء تسجيل الدخول');
    }
  };

  if (isLoading) {
    return (
      <Layout showAppBar={false}>
        <LoginContainer>
          <LoginCard>
            <Logo>
              <h1>قساور للمقاولات</h1>
              <p>جاري التحميل...</p>
            </Logo>
            <LoadingSpinner />
          </LoginCard>
        </LoginContainer>
      </Layout>
    );
  }

  return (
    <Layout showAppBar={false}>
      <LoginContainer>
        <LoginCard>
          <Logo>
            <h1>قساور للمقاولات</h1>
            <p>تسجيل الدخول</p>
          </Logo>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                required
              />
            </FormGroup>
            
            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'تسجيل الدخول'}
            </LoginButton>
          </Form>
        </LoginCard>
      </LoginContainer>
    </Layout>
  );
};

export default Login;
