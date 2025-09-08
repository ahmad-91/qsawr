import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useTheme } from '../../shared/themes';
import { Layout } from '../Layout';

// Task interface definition
interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
}

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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Main Container
const DashboardContainer = styled.div`
  width: 100%;
`;

// Saudi Business Center Style App Bar - Full Width Design
const AppBar = styled.header`
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
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

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
  background: ${({ theme }) => theme.colors.surface.secondary};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.elevated};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
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
  gap: ${({ theme }) => theme.spacing.lg};
`;

const VisionLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: scale(1.05);
  }
`;

const VisionTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const VisionYear = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const VisionSubtitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  opacity: 0.9;
`;

const BusinessCenterLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: scale(1.05);
  }
`;

const BusinessCenterTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const BusinessCenterSubtitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  opacity: 0.9;
`;

const BusinessCenterIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.gradients.accent};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.elevated};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.colors.gradients.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.div`
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const UserRole = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.gradients.button};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Smart Navigation
const Navigation = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  ${css`animation: ${fadeInUp} 0.8s ease-out 0.2s both;`}
`;

const NavButton = styled.button<{ active?: boolean }>`
  background: ${({ theme, active }) => 
    active 
      ? theme.colors.gradients.accent 
      : `linear-gradient(135deg, ${theme.colors.surface.primary} 0%, ${theme.colors.surface.secondary} 100%)`};
  color: ${({ theme, active }) => 
    active ? 'white' : theme.colors.text.primary};
  border: 1px solid ${({ theme, active }) => 
    active ? 'transparent' : theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: ${({ theme, active }) => 
      active 
        ? theme.colors.gradients.accent 
        : `linear-gradient(135deg, ${theme.colors.surface.elevated} 0%, ${theme.colors.surface.secondary} 100%)`};
  }

  ${({ active, theme }) => active && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${theme.colors.gradients.accent};
      z-index: -1;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      animation: ${slideIn} 2s infinite;
    }
  `}
`;

// Main Content Grid
const Content = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  ${css`animation: ${fadeInUp} 0.8s ease-out 0.4s both;`}
`;

// Enhanced Cards
const Card = styled.div<{ priority?: 'high' | 'medium' | 'low' }>`
  background: ${({ theme }) => theme.colors.gradients.card};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme, priority }) => {
    if (priority === 'high') return theme.colors.error[500];
    if (priority === 'medium') return theme.colors.warning[500];
    return theme.colors.surface.border;
  }};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;

  ${({ priority, theme }) => priority === 'high' && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: ${theme.colors.error[500]};
    }
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.surface.elevated};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CardIcon = styled.div<{ color?: string }>`
  width: 32px;
  height: 32px;
  background: ${({ theme, color }) => color || theme.colors.gradients.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

// Smart Stats Grid
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StatItem = styled.div<{ trend?: 'up' | 'down' | 'stable' }>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  ${({ trend, theme }) => trend === 'up' && `
    border-left: 4px solid ${theme.colors.success[500]};
  `}

  ${({ trend, theme }) => trend === 'down' && `
    border-left: 4px solid ${theme.colors.error[500]};
  `}
`;

const StatValue = styled.div<{ trend?: 'up' | 'down' | 'stable' }>`
  color: ${({ theme, trend }) => {
    if (trend === 'up') return theme.colors.success[500];
    if (trend === 'down') return theme.colors.error[500];
    return theme.colors.secondary[400];
  }};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TrendIcon = styled.span<{ trend?: 'up' | 'down' | 'stable' }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme, trend }) => {
    if (trend === 'up') return theme.colors.success[500];
    if (trend === 'down') return theme.colors.error[500];
    return theme.colors.text.tertiary;
  }};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// Task List Component
const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TaskItem = styled.div<{ completed?: boolean; priority?: 'high' | 'medium' | 'low' }>`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme, completed }) => 
    completed ? theme.colors.surface.secondary : theme.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme, priority }) => {
    if (priority === 'high') return theme.colors.error[500];
    if (priority === 'medium') return theme.colors.warning[500];
    if (priority === 'low') return theme.colors.success[500];
    return theme.colors.surface.border;
  }};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateX(4px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  ${({ completed, theme }) => completed && `
    opacity: 0.7;
    text-decoration: line-through;
  `}
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TaskTitle = styled.span<{ completed?: boolean }>`
  color: ${({ theme, completed }) => 
    completed ? theme.colors.text.tertiary : theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const TaskPriority = styled.span<{ priority?: 'high' | 'medium' | 'low' }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  background: ${({ theme, priority }) => {
    if (priority === 'high') return theme.colors.error[500];
    if (priority === 'medium') return theme.colors.warning[500];
    if (priority === 'low') return theme.colors.success[500];
    return theme.colors.surface.secondary;
  }};
  color: white;
`;

// Quick Actions
const QuickActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  ${css`animation: ${fadeInUp} 0.8s ease-out 0.6s both;`}
`;

const ActionButton = styled.button<{ variant?: 'team' | 'settings' | 'report' | 'project' }>`
  background: ${({ theme, variant }) => {
    if (variant === 'team') return '#3b82f6'; // Blue
    if (variant === 'settings') return '#f59e0b'; // Orange
    if (variant === 'report') return 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'; // Purple-blue gradient
    if (variant === 'project') return 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'; // Purple-blue gradient
    return theme.colors.gradients.button;
  }};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.gradients.button};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useFrappeAuth();
  const { theme } = useTheme();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, title: 'مراجعة تقارير المشاريع', completed: false, priority: 'high' as const },
    { id: 2, title: 'تحديث بيانات العملاء', completed: false, priority: 'medium' as const },
    { id: 3, title: 'إعداد اجتماع الفريق', completed: true, priority: 'low' as const },
    { id: 4, title: 'تحليل الأداء الشهري', completed: false, priority: 'high' as const },
    { id: 5, title: 'تطوير استراتيجية جديدة', completed: false, priority: 'medium' as const },
  ]);

  // Debug logging
  console.log('Dashboard rendering with theme:', theme);
      console.log('User:', currentUser);
  console.log('Auth context working:', !!currentUser);

  // Live time update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleActionButton = (action: string) => {
    switch (action) {
      case 'project':
        history.push('/create-project');
        break;
      case 'report':
        history.push('/create-report');
        break;
      case 'settings':
        history.push('/settings');
        break;
      case 'team':
        history.push('/team-management');
        break;
      case 'projects':
        history.push('/projects');
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <DashboardContainer>
        {/* Remove the old AppBar and Header components */}
        
        <QuickActions>
          <ActionButton onClick={() => handleActionButton('project')}>
            📋 إنشاء مشروع
          </ActionButton>
          <ActionButton onClick={() => handleActionButton('report')}>
            📊 إنشاء تقرير
          </ActionButton>
          <ActionButton onClick={() => handleActionButton('settings')}>
            ⚙️ الإعدادات
          </ActionButton>
          <ActionButton onClick={() => handleActionButton('team')}>
            👥 إدارة الفريق
          </ActionButton>
          <ActionButton onClick={() => handleActionButton('projects')}>
            📋 عرض المشاريع
          </ActionButton>
        </QuickActions>

        <Navigation>
          <NavButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            نظرة عامة
          </NavButton>
          <NavButton 
            active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')}
          >
            المشاريع
          </NavButton>
          <NavButton 
            active={activeTab === 'tasks'} 
            onClick={() => setActiveTab('tasks')}
          >
            المهام
          </NavButton>
          <NavButton 
            active={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')}
          >
            التقارير
          </NavButton>
        </Navigation>

        {activeTab === 'overview' && (
          <Content>
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات سريعة</CardTitle>
                <CardIcon>📊</CardIcon>
              </CardHeader>
              <CardContent>
                <StatsGrid>
                  <StatItem>
                    <StatValue>24</StatValue>
                    <StatLabel>المشاريع النشطة</StatLabel>
                    <TrendIcon>📈</TrendIcon>
                  </StatItem>
                  <StatItem>
                    <StatValue>156</StatValue>
                    <StatLabel>المهام المكتملة</StatLabel>
                    <TrendIcon>✅</TrendIcon>
                  </StatItem>
                  <StatItem>
                    <StatValue>89%</StatValue>
                    <StatLabel>معدل الإنجاز</StatLabel>
                    <TrendIcon>🎯</TrendIcon>
                  </StatItem>
                  <StatItem>
                    <StatValue>12</StatValue>
                    <StatLabel>أعضاء الفريق</StatLabel>
                    <TrendIcon>👥</TrendIcon>
                  </StatItem>
                </StatsGrid>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المهام العاجلة</CardTitle>
                <CardIcon>⚡</CardIcon>
              </CardHeader>
              <CardContent>
                <TaskList>
                  {tasks.filter(task => !task.completed && task.priority === 'high').map(task => (
                    <TaskItem key={task.id} priority={task.priority}>
                      <TaskHeader>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskPriority priority={task.priority}>
                          {task.priority === 'high' ? 'عالي' : task.priority === 'medium' ? 'متوسط' : 'منخفض'}
                        </TaskPriority>
                      </TaskHeader>
                    </TaskItem>
                  ))}
                </TaskList>
              </CardContent>
            </Card>
          </Content>
        )}

        {activeTab === 'projects' && (
          <Content>
            <Card>
              <CardHeader>
                <CardTitle>إدارة المشاريع</CardTitle>
                <CardIcon>🏗️</CardIcon>
              </CardHeader>
              <CardContent>
                <p>عرض وإدارة جميع المشاريع في النظام</p>
                <ButtonGroup>
                  <Button onClick={() => history.push('/projects-new')}>
                    🚀 الجدول المتقدم (جديد)
                  </Button>
                  <Button onClick={() => history.push('/projects-old')}>
                    📄 الجدول العادي (قديم)
                  </Button>
                  <Button onClick={() => history.push('/create-project')}>
                    ➕ إنشاء مشروع جديد
                  </Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Content>
        )}

        {activeTab === 'tasks' && (
          <Content>
            <Card>
              <CardHeader>
                <CardTitle>إدارة المهام</CardTitle>
                <CardIcon>📋</CardIcon>
              </CardHeader>
              <CardContent>
                <TaskList>
                  {tasks.map(task => (
                    <TaskItem key={task.id} priority={task.priority}>
                      <TaskHeader>
                        <TaskTitle 
                          style={{ 
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.6 : 1
                          }}
                        >
                          {task.title}
                        </TaskTitle>
                        <TaskPriority priority={task.priority}>
                          {task.priority === 'high' ? 'عالي' : task.priority === 'medium' ? 'متوسط' : 'منخفض'}
                        </TaskPriority>
                      </TaskHeader>
                      <button 
                        onClick={() => toggleTask(task.id)}
                        style={{ 
                          background: task.completed ? '#10b981' : '#6b7280',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {task.completed ? 'مكتمل' : 'إكمال'}
                      </button>
                    </TaskItem>
                  ))}
                </TaskList>
              </CardContent>
            </Card>
          </Content>
        )}

        {activeTab === 'reports' && (
          <Content>
            <Card>
              <CardHeader>
                <CardTitle>التقارير</CardTitle>
                <CardIcon>📊</CardIcon>
              </CardHeader>
              <CardContent>
                <p>إنشاء وعرض التقارير المختلفة</p>
                <ButtonGroup>
                                  <Button onClick={() => history.push('/create-report')}>
                  إنشاء تقرير جديد
                </Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Content>
        )}

        {activeTab === 'profile' && (
          <Content>
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
                <CardIcon>👤</CardIcon>
              </CardHeader>
              <CardContent>
                <p>انقر على صورتك في الشريط العلوي للوصول إلى الملف الشخصي</p>
              </CardContent>
            </Card>
          </Content>
        )}
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;
