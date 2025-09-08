import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../shared/themes';
import { useAuth } from '../../contexts/AuthContext';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.gradients.background};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 3rem;
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.surface.border};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  width: 100%;
  max-width: 900px;
  animation: ${fadeInUp} 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.gradients.primary};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.surface.border};
  animation: ${slideIn} 0.8s ease-out;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 4px solid ${props => props.theme.colors.surface};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: ${props => props.theme.colors.gradients.primary};
    z-index: -1;
    opacity: 0.3;
    filter: blur(10px);
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
  background: ${props => props.theme.colors.gradients.text};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const UserEmail = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: ${props => props.theme.colors.gradients.primary};
    border-radius: 2px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.surface.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.colors.gradients.primary};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary[300]};
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const InfoLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.primary};
  font-weight: 600;
  line-height: 1.4;
`;

const StatusBadge = styled.span<{ status: 'success' | 'error' | 'warning' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: ${props => props.theme.shadows.sm};
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
  
  ${props => {
    switch (props.status) {
      case 'success':
        return `
          background: ${props.theme.colors.success}15;
          color: ${props.theme.colors.success};
          border: 1px solid ${props.theme.colors.success}30;
        `;
      case 'error':
        return `
          background: ${props.theme.colors.error}15;
          color: ${props.theme.colors.error};
          border: 1px solid ${props.theme.colors.error}30;
        `;
      case 'warning':
        return `
          background: ${props.theme.colors.warning}15;
          color: ${props.theme.colors.warning};
          border: 1px solid ${props.theme.colors.warning}30;
        `;
    }
  }}
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: ${props => props.theme.colors.gradients.button};
  border: 1px solid ${props => props.theme.colors.surface.border};
  border-radius: ${props => props.theme.borderRadius.full};
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.theme.shadows.sm};
  font-size: 1.2rem;
  
  &:hover {
    background: ${props => props.theme.colors.gradients.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary[500]};
  }
`;

const UserProfile: React.FC = () => {
  const { theme } = useTheme();
  const { currentUser, isLoading } = useFrappeAuth();
  const { token, isAuthenticated: tokenAuth } = useAuth();
  const history = useHistory();

  // Get user document
  const { data: userDoc } = useFrappeGetDoc('User', currentUser || '', {
    enabled: !!currentUser
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatus = () => {
    if (isLoading) {
      return { status: 'warning' as const, text: 'جاري التحميل...' };
    }
    
    if (currentUser || tokenAuth) {
      return { status: 'success' as const, text: 'مسجل الدخول' };
    }
    
    return { status: 'error' as const, text: 'غير مسجل' };
  };

  const status = getStatus();

  return (
    <ProfileContainer>
      <BackButton onClick={() => history.push('/dashboard')} title="العودة للرئيسية">
        ←
      </BackButton>
      <ProfileCard>
        <ProfileHeader>
          <Avatar>
            {currentUser ? getInitials(currentUser) : '?'}
          </Avatar>
          <UserInfo>
            <UserName>
              {userDoc?.full_name || currentUser || localStorage.getItem('username') || 'مستخدم غير معروف'}
            </UserName>
            <UserEmail>
              {userDoc?.email || 'لا يوجد بريد إلكتروني'}
            </UserEmail>
            <StatusBadge status={status.status}>
              {status.text}
            </StatusBadge>
          </UserInfo>
        </ProfileHeader>

        <Section>
          <SectionTitle>معلومات المستخدم</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <InfoLabel>اسم المستخدم</InfoLabel>
              <InfoValue>{currentUser || localStorage.getItem('username') || 'غير متوفر'}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>الاسم الكامل</InfoLabel>
              <InfoValue>{userDoc?.full_name || localStorage.getItem('username') || 'غير متوفر'}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>البريد الإلكتروني</InfoLabel>
              <InfoValue>{userDoc?.email || 'غير متوفر'}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>نوع المستخدم</InfoLabel>
              <InfoValue>{userDoc?.user_type || 'مستخدم النظام'}</InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>آخر تسجيل دخول</InfoLabel>
              <InfoValue>
                {userDoc?.last_login ? new Date(userDoc.last_login).toLocaleString('ar-SA') : 'جلسة نشطة'}
              </InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>تاريخ الإنشاء</InfoLabel>
              <InfoValue>
                {userDoc?.creation ? new Date(userDoc.creation).toLocaleString('ar-SA') : 'غير متوفر'}
              </InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>🔑 مفتاح API</InfoLabel>
              <InfoValue style={{ wordBreak: 'break-all', fontSize: '0.8rem' }}>
                {token ? `${token.substring(0, 20)}...` : 'غير متوفر'}
              </InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>🔐 سر API</InfoLabel>
              <InfoValue style={{ wordBreak: 'break-all', fontSize: '0.8rem' }}>
                {localStorage.getItem('frappe_api_secret') ? 
                  `${localStorage.getItem('frappe_api_secret')?.substring(0, 20)}...` : 
                  'غير متوفر'}
              </InfoValue>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>🔐 نوع المصادقة</InfoLabel>
              <InfoValue>
                {tokenAuth ? 'REST Auth (مفتاح/سر API)' : 
                 currentUser ? 'مصادقة الكوكيز' : 'غير مصادق'}
              </InfoValue>
            </InfoItem>
          </InfoGrid>
        </Section>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;