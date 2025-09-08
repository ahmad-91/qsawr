import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useTheme } from '../../shared/themes';

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const AppBarContainer = styled.header`
  background: ${({ theme }) => theme.colors.surface.primary};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  ${css`animation: ${fadeInUp} 0.6s ease-out;`}
`;

const TopStrip = styled.div`
  background: ${({ theme }) => theme.colors.primary[600]};
  height: 4px;
  width: 100%;
`;

const AppBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  width: 100%;
`;

const AppBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MenuButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.secondary};
    border-color: ${({ theme }) => theme.colors.surface.elevated};
  }
`;

const LanguageButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.secondary};
    border-color: ${({ theme }) => theme.colors.surface.elevated};
  }
`;

const SearchButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.secondary};
    border-color: ${({ theme }) => theme.colors.surface.elevated};
  }
`;

const PlatformButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.secondary};
    border-color: ${({ theme }) => theme.colors.surface.elevated};
  }
`;

const AppBarCenter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.secondary};
    transform: translateY(-2px);
  }
`;

const NavText = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-align: center;
  white-space: nowrap;
`;

const AppBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const VisionLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const VisionTitle = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

const VisionYear = styled.div`
  color: ${({ theme }) => theme.colors.primary[300]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const VisionSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

const BusinessCenterLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const BusinessCenterTitle = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

const BusinessCenterSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradients.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const UserName = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const UserRole = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.border};
  }
`;

const AppBar: React.FC = () => {
  const { theme } = useTheme();
  const { currentUser, logout } = useFrappeAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      console.log('Starting logout process...');
      
      // Call Frappe logout first
      await logout();
      console.log('Frappe logout successful');
      
      // Clear all authentication data
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      
      // Clear cookies
      document.cookie = 'sid=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'user_id=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'full_name=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'system_user=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      
      console.log('All authentication data cleared');
      
      // Redirect to login
      history.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if Frappe logout fails, clear everything and redirect
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      
      // Clear cookies
      document.cookie = 'sid=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'user_id=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'full_name=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = 'system_user=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      
      history.push('/login');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get username from localStorage as fallback if currentUser is not available
  const storedUsername = localStorage.getItem('username');
  const userName = currentUser || storedUsername;
  const userFullName = currentUser || storedUsername;

  return (
    <AppBarContainer>
      <TopStrip />
      <AppBarContent>
        <AppBarLeft>
          <MenuButton>☰</MenuButton>
          <LanguageButton>En</LanguageButton>
          <SearchButton>🔍</SearchButton>
          <PlatformButton>
            لوحة التحكم
          </PlatformButton>
        </AppBarLeft>

        <AppBarCenter>
          <NavItem>
            <NavText> الرئيسية</NavText>
          </NavItem>
        </AppBarCenter>

        <AppBarRight>
          <VisionLogo>
            <VisionTitle></VisionTitle>
            <VisionYear> </VisionYear>
            <VisionSubtitle>  </VisionSubtitle>
          </VisionLogo>
          <BusinessCenterLogo>
            <BusinessCenterTitle>

            </BusinessCenterTitle>
            <BusinessCenterSubtitle>  </BusinessCenterSubtitle>
          </BusinessCenterLogo>
          <UserProfile>
            <UserAvatar>
                              {currentUser ? getInitials(userFullName || 'مستخدم') : 'U'}
            </UserAvatar>
            <UserInfo>
                             <UserName>{userFullName || 'مستخدم'}</UserName>
              <UserRole>مستخدم</UserRole>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>
              تسجيل خروج
            </LogoutButton>
          </UserProfile>
        </AppBarRight>
      </AppBarContent>
    </AppBarContainer>
  );
};

export default AppBar;
