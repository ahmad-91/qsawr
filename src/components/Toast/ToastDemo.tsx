import React from 'react';
import styled from 'styled-components';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../shared/themes';

const DemoContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradients.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  background: ${({ theme }) => theme.colors.gradients.accent};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.spacing['2xl']} 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Button = styled.button<{ variant: 'success' | 'error' | 'warning' | 'info' }>`
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'success':
        return theme.colors.gradients.button;
      case 'error':
        return `linear-gradient(135deg, ${theme.colors.error[500]} 0%, ${theme.colors.error[600]} 100%)`;
      case 'warning':
        return `linear-gradient(135deg, ${theme.colors.warning[500]} 0%, ${theme.colors.warning[600]} 100%)`;
      case 'info':
        return `linear-gradient(135deg, ${theme.colors.info[500]} 0%, ${theme.colors.info[600]} 100%)`;
      default:
        return theme.colors.gradients.button;
    }
  }};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.surface.elevated};
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.gradients.accent};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.theme?.typography?.sizes?.xl || '1.25rem'};
  font-weight: ${({ theme }) => theme.theme?.typography?.weights?.semibold || 600};
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.theme?.spacing?.md || '1rem'} 0;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.currentMode?.color?.text?.secondary || '#e2e8f0'};
  text-align: center;
  line-height: ${({ theme }) => theme.theme?.typography?.lineHeights?.relaxed || 1.75};
  margin: 0;
`;

const ToastDemo: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleShowToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'success':
        showSuccess('تم بنجاح!', 'مرحباً بك في لوحة التحكم. يمكنك من خلال هذه اللوحة إدارة جميع جوانب مشاريعك وأعمالك.');
        break;
      case 'error':
        showError('حدث خطأ!', 'عذراً، حدث خطأ أثناء تنفيذ العملية. يرجى المحاولة مرة أخرى.');
        break;
      case 'warning':
        showWarning('تحذير!', 'يرجى مراجعة المعلومات المدخلة قبل المتابعة.');
        break;
      case 'info':
        showInfo('معلومات', 'تم فتح نظام الإشعارات. يمكنك اختيار جميع أنواع الإشعارات.');
        break;
    }
  };

  const features = [
    {
      icon: '🎨',
      title: 'تصميم عصري',
      description: 'نظام إشعارات بتصميم عصري ومتطور مع تأثيرات بصرية متقدمة'
    },
    {
      icon: '✨',
      title: 'تأثيرات بصرية',
      description: 'تأثيرات زجاجية (Glassmorphism) وظلال متقدمة للشكل الاحترافي'
    },
    {
      icon: '📱',
      title: 'تصميم متجاوب',
      description: 'يعمل بشكل مثالي على جميع الأجهزة والأحجام'
    },
    {
      icon: '⚡',
      title: 'أداء عالي',
      description: 'حركات سلسة وانتقالات سريعة مع تحسين الأداء'
    },
    {
      icon: '🎯',
      title: 'سهولة الاستخدام',
      description: 'واجهة بديهية وسهلة الاستخدام مع تجربة مستخدم استثنائية'
    },
    {
      icon: '🔧',
      title: 'قابلية التخصيص',
      description: 'سهولة تخصيص الألوان والأنماط حسب احتياجاتك'
    }
  ];

  return (
    <DemoContainer>
      <Title>🚀 نظام الإشعارات الحديث 2025</Title>
      <Subtitle>
        تصميم عصري ومتطور مع تأثيرات بصرية متقدمة وتجربة مستخدم استثنائية
      </Subtitle>
      
      <ButtonGrid>
        <Button variant="success" onClick={() => handleShowToast('success')}>
          نجح ✅
          </Button>
        <Button variant="error" onClick={() => handleShowToast('error')}>
          خطأ ❌
          </Button>
        <Button variant="warning" onClick={() => handleShowToast('warning')}>
          تحذير ⚠️
          </Button>
        <Button variant="info" onClick={() => handleShowToast('info')}>
          معلومات ℹ️
          </Button>
        </ButtonGrid>

      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </DemoContainer>
  );
};

export default ToastDemo;
