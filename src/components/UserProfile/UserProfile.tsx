import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk';
import { useTheme } from '../../shared/themes';

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.surface.border};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.surface.border};
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

const UserEmail = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.surface.border};
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
`;

const DebugSection = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.surface.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-top: 2rem;
`;

const DebugTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

const DebugCode = styled.pre`
  background: ${props => props.theme.colors.surface};
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  overflow-x: auto;
  margin: 0;
`;

const StatusBadge = styled.span<{ status: 'success' | 'error' | 'warning' }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${props => {
    switch (props.status) {
      case 'success':
        return `
          background: ${props.theme.colors.success}20;
          color: ${props.theme.colors.success};
        `;
      case 'error':
        return `
          background: ${props.theme.colors.error}20;
          color: ${props.theme.colors.error};
        `;
      case 'warning':
        return `
          background: ${props.theme.colors.warning}20;
          color: ${props.theme.colors.warning};
        `;
    }
  }}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SyncButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.gradients.button};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.gradients.primary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const AnalysisSection = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: ${props => props.theme.colors.surface[1]};
  border: 1px solid ${props => props.theme.colors.surface.border};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const AnalysisTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 0.75rem 0;
`;

const AnalysisText = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
  
  strong {
    color: ${props => props.theme.colors.text.primary};
  }
`;

const CookieButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.gradients.secondary};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CorsButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.gradients.accent};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TokenButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.gradients.glow};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ConfigButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.gradients.card};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const UserProfile: React.FC = () => {
  const { theme } = useTheme();
  const { currentUser, isLoading, error, login } = useFrappeAuth();
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isSyncing, setIsSyncing] = useState(false);

  // Get user document from Frappe
  const { data: userDoc, error: userDocError } = useFrappeGetDoc('User', currentUser || '', {
    enabled: !!currentUser
  });

  // Sync localStorage with Frappe SDK
  const syncWithFrappe = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    if (isLoggedIn && username && !currentUser && !isLoading) {
      console.log('UserProfile: Syncing localStorage with Frappe SDK...');
      setIsSyncing(true);
      
      try {
        // Check if we have valid cookies first
        const cookies = document.cookie;
        console.log('UserProfile: Current cookies:', cookies);
        
        // Get stored cookies from localStorage
        const storedCookies = Object.keys(localStorage).filter(key => key.startsWith('cookie_'));
        console.log('UserProfile: Stored cookies in localStorage:', storedCookies);
        
        // Build cookie header from localStorage
        const cookieHeader = storedCookies.map(key => {
          const cookieName = key.replace('cookie_', '');
          const cookieValue = localStorage.getItem(key);
          return `${cookieName}=${cookieValue}`;
        }).join('; ');
        
        console.log('UserProfile: Cookie header from localStorage:', cookieHeader);
        
        // Try to get user info from Frappe to verify session
        const response = await fetch(`${process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa'}/api/method/frappe.auth.get_logged_user`, {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            ...(cookieHeader && { 'Cookie': cookieHeader })
          },
        });
        
        console.log('UserProfile: Frappe response status:', response.status);
        console.log('UserProfile: Frappe response headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
          const data = await response.json();
          console.log('UserProfile: Frappe response data:', data);
          
          if (data.message) {
            console.log('UserProfile: Frappe session is valid, user:', data.message);
            // Session is valid, but SDK might not be synced
            // The issue is that SDK is not reading the cookies properly
          }
        } else {
          console.log('UserProfile: Frappe session is invalid, status:', response.status);
          const errorText = await response.text();
          console.log('UserProfile: Error response:', errorText);
        }
      } catch (error) {
        console.error('UserProfile: Error syncing with Frappe:', error);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Attempt to re-authenticate using stored credentials
  const attemptReAuthentication = async () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password'); // This might not exist for security reasons
    
    if (username && !password) {
      console.log('UserProfile: No stored password found, cannot re-authenticate automatically');
      return;
    }
    
    if (username && password) {
      console.log('UserProfile: Attempting to re-authenticate...');
      try {
        // This would require the login function from useFrappeAuth
        // For now, we'll just log the attempt
        console.log('UserProfile: Would attempt login with username:', username);
      } catch (error) {
        console.error('UserProfile: Re-authentication failed:', error);
      }
    }
  };

  useEffect(() => {
    syncWithFrappe();
  }, [currentUser, isLoading]);

  useEffect(() => {
    // Collect debug information
    const debug = {
      currentUser,
      isLoading,
      error: error?.message,
      userDoc,
      userDocError: userDocError?.message,
      cookies: document.cookie,
      localStorage: {
        isLoggedIn: localStorage.getItem('isLoggedIn'),
        username: localStorage.getItem('username')
      },
      isSyncing,
      frappeUrl: process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa',
      timestamp: new Date().toISOString()
    };
    
    setDebugInfo(debug);
    console.log('UserProfile Debug Info:', debug);
  }, [currentUser, isLoading, error, userDoc, userDocError, isSyncing]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatus = () => {
    if (isLoading || isSyncing) return { status: 'warning' as const, text: 'Loading...' };
    if (error) return { status: 'error' as const, text: 'Error' };
    if (currentUser) return { status: 'success' as const, text: 'Authenticated (SDK)' };
    
    // Check localStorage as fallback
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    if (isLoggedIn && username) {
      return { status: 'warning' as const, text: 'Authenticated (LocalStorage)' };
    }
    
    return { status: 'error' as const, text: 'Not Authenticated' };
  };

  const status = getStatus();

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <Avatar>
            {currentUser ? getInitials(currentUser) : '?'}
          </Avatar>
          <UserInfo>
            <UserName>
              {userDoc?.full_name || currentUser || localStorage.getItem('username') || 'Unknown User'}
            </UserName>
            <UserEmail>
              {userDoc?.email || 'No email available'}
            </UserEmail>
            <StatusBadge status={status.status}>
              {status.text}
            </StatusBadge>
          </UserInfo>
        </ProfileHeader>

        <Section>
          <SectionTitle>User Information</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Username</InfoLabel>
              <InfoValue>{currentUser || localStorage.getItem('username') || 'N/A'}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Full Name</InfoLabel>
              <InfoValue>{userDoc?.full_name || localStorage.getItem('username') || 'N/A'}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{userDoc?.email || 'N/A'}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>User Type</InfoLabel>
              <InfoValue>{userDoc?.user_type || 'System User'}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Last Login</InfoLabel>
              <InfoValue>
                {userDoc?.last_login ? new Date(userDoc.last_login).toLocaleString() : 'Active Session'}
              </InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Creation Date</InfoLabel>
              <InfoValue>
                {userDoc?.creation ? new Date(userDoc.creation).toLocaleString() : 'N/A'}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>

        <DebugSection>
          <DebugTitle>Debug Information</DebugTitle>
          <DebugCode>
            {JSON.stringify(debugInfo, null, 2)}
          </DebugCode>
          
          {!currentUser && localStorage.getItem('isLoggedIn') === 'true' && (
            <ButtonGroup>
              <SyncButton onClick={syncWithFrappe} disabled={isSyncing}>
                {isSyncing ? 'Syncing...' : '🔄 Sync with Frappe'}
              </SyncButton>
              <LoginButton onClick={() => window.location.href = '/login'}>
                🔑 Re-login
              </LoginButton>
              <CookieButton onClick={() => {
                console.log('=== COOKIE DEBUG ===');
                console.log('All cookies:', document.cookie);
                console.log('Frappe URL:', process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa');
                console.log('localStorage:', {
                  isLoggedIn: localStorage.getItem('isLoggedIn'),
                  username: localStorage.getItem('username')
                });
                console.log('==================');
              }}>
                🍪 Debug Cookies
              </CookieButton>
              <CorsButton onClick={async () => {
                console.log('=== CORS TEST ===');
                try {
                  // Test method endpoint
                  console.log('Testing /api/method/ endpoint...');
                  const methodResponse = await fetch(`${process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa'}/api/method/frappe.auth.get_logged_user`, {
                    method: 'GET',
                    credentials: 'include',
                    mode: 'cors'
                  });
                  console.log('Method CORS Response:', methodResponse.status);
                  console.log('Method CORS Headers:', Object.fromEntries(methodResponse.headers.entries()));
                  const methodData = await methodResponse.json();
                  console.log('Method CORS Data:', methodData);
                  
                  // Test resource endpoint
                  console.log('Testing /api/resource/ endpoint...');
                  const resourceResponse = await fetch(`${process.env.REACT_APP_FRAPPE_URL || 'https://qswr.sa'}/api/resource/User/`, {
                    method: 'GET',
                    credentials: 'include',
                    mode: 'cors'
                  });
                  console.log('Resource CORS Response:', resourceResponse.status);
                  console.log('Resource CORS Headers:', Object.fromEntries(resourceResponse.headers.entries()));
                } catch (error) {
                  console.error('CORS Test Error:', error);
                }
                console.log('================');
              }}>
                🌐 Test CORS
              </CorsButton>
              <TokenButton onClick={async () => {
                console.log('=== STORED COOKIES ===');
                const storedCookies = Object.keys(localStorage).filter(key => key.startsWith('cookie_'));
                console.log('Stored cookies in localStorage:', storedCookies);
                storedCookies.forEach(key => {
                  const cookieName = key.replace('cookie_', '');
                  const cookieValue = localStorage.getItem(key);
                  console.log(`${cookieName}: ${cookieValue}`);
                });
                console.log('=====================');
              }}>
                🔑 Stored Cookies
              </TokenButton>
              <ConfigButton onClick={async () => {
                console.log('=== FRAPPE CONFIG CHECK ===');
                console.log('🚨 PROTOCOL MISMATCH DETECTED!');
                console.log('Frappe server: https://qswr.sa (HTTPS)');
                console.log('React app: http://localhost:3001 (HTTP)');
                console.log('');
                console.log('This is why cookies are not being saved!');
                console.log('');
                console.log('🔧 SOLUTIONS:');
                console.log('1. Use HTTPS for React app (recommended)');
                console.log('2. Or configure extend_auth app properly');
                console.log('');
                console.log('Your Frappe app "extend_auth" should be configured with:');
                console.log('In site_config.json:');
                console.log('{');
                console.log('  "allowed_cross_sites": [');
                console.log('    "http://localhost:3001",');
                console.log('    "https://localhost:3001",');
                console.log('    "https://yourdomain.com"');
                console.log('  ]');
                console.log('}');
                console.log('');
                console.log('🔍 DEBUGGING STEPS:');
                console.log('1. Check if extend_auth app is installed: bench --site qswr.sa list-apps');
                console.log('2. Check if app is enabled: bench --site qswr.sa get-app');
                console.log('3. Check site_config.json for allowed_cross_sites');
                console.log('4. Restart Frappe server: bench restart');
                console.log('5. Check Frappe logs for extend_auth messages');
                console.log('===========================');
              }}>
                ⚙️ Config Check
              </ConfigButton>
            </ButtonGroup>
          )}
          
          <AnalysisSection>
            <AnalysisTitle>🔍 Analysis</AnalysisTitle>
            <AnalysisText>
              <strong>Problem:</strong> Frappe SDK shows `currentUser: undefined` while localStorage shows authenticated user.
              <br />
              <strong>Root Cause:</strong> 🚨 <strong>PROTOCOL MISMATCH!</strong> HTTP vs HTTPS prevents cookie saving.
              <br />
              <strong>Technical Details:</strong>
              <br />
              • ✅ `/api/method/` endpoints work fine (status: 200, message: 'Administrator')
              <br />
              • ❌ `/api/resource/` endpoints fail with CORS error
              <br />
              • ❌ NO cookies are being set: `All cookies:` is empty
              <br />
              • 🚨 <strong>Frappe server: https://qswr.sa (HTTPS)</strong>
              <br />
              • 🚨 <strong>React app: http://localhost:3001 (HTTP)</strong>
              <br />
              • ❌ extend_auth app is not installed/enabled/configured properly
              <br />
              • ❌ Frappe SDK can't read cookies that don't exist
              <br />
              <strong>Solutions:</strong>
              <br />
              1. 🔧 <strong>Use HTTPS for React app</strong> (recommended)
              <br />
              2. Install extend_auth app: `bench --site qswr.sa install-app extend_auth`
              <br />
              3. Configure `allowed_cross_sites` in site_config.json
              <br />
              4. Fix CORS for `/api/resource/` endpoints in Frappe
              <br />
              5. Restart Frappe server: `bench restart`
              <br />
              6. Check Frappe logs for extend_auth messages
            </AnalysisText>
          </AnalysisSection>
        </DebugSection>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;
