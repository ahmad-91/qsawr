import React from 'react';
import styled, { keyframes, css } from 'styled-components';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

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

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
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

const ToastContainer = styled.div<{ type: string; isVisible: boolean }>`
  position: relative;
  min-width: 320px;
  max-width: 420px;
  background: ${({ type }) => {
    switch (type) {
      case 'success':
        return 'linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(34, 197, 94, 0.9) 100%)';
      case 'error':
        return 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(239, 68, 68, 0.9) 100%)';
      case 'warning':
        return 'linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(245, 158, 11, 0.9) 100%)';
      case 'info':
        return 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(59, 130, 246, 0.9) 100%)';
      default:
        return 'linear-gradient(135deg, rgba(107, 114, 128, 0.95) 0%, rgba(107, 114, 128, 0.9) 100%)';
    }
  }};
  
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${({ type }) => {
    switch (type) {
      case 'success':
        return 'rgba(34, 197, 94, 0.3)';
      case 'error':
        return 'rgba(239, 68, 68, 0.3)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.3)';
      case 'info':
        return 'rgba(59, 130, 246, 0.3)';
      default:
        return 'rgba(107, 114, 128, 0.3)';
    }
  }};
  
  border-radius: 16px;
  padding: 20px 24px 20px 20px;
  margin-bottom: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  animation: ${({ isVisible }) => 
    isVisible 
      ? css`${slideIn} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`
      : css`${slideOut} 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`
  };
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.2),
      0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
`;

const ToastHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;
`;

const IconContainer = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ type }) => {
    switch (type) {
      case 'success':
        return 'linear-gradient(135deg, #22c55e, #16a34a)';
      case 'error':
        return 'linear-gradient(135deg, #ef4444, #dc2626)';
      case 'warning':
        return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'info':
        return 'linear-gradient(135deg, #3b82f6, #2563eb)';
      default:
        return 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
  }};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  animation: ${pulse} 2s ease-in-out infinite;
`;

const ContentContainer = styled.div`
  flex: 1;
  min-width: 0;
  padding-right: 16px;
`;

const Title = styled.h4<{ type: string }>`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ type }) => {
    switch (type) {
      case 'success':
        return '#ffffff';
      case 'error':
        return '#ffffff';
      case 'warning':
        return '#ffffff';
      case 'info':
        return '#ffffff';
      default:
        return '#ffffff';
    }
  }};
  line-height: 1.4;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.5;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
  z-index: 2;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const ProgressBar = styled.div<{ type: string; progress: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: ${({ progress }) => progress}%;
  background: ${({ type }) => {
    switch (type) {
      case 'success':
        return 'linear-gradient(90deg, #22c55e, #16a34a)';
      case 'error':
        return 'linear-gradient(90deg, #ef4444, #dc2626)';
      case 'warning':
        return 'linear-gradient(90deg, #f59e0b, #d97706)';
      case 'info':
        return 'linear-gradient(90deg, #3b82f6, #2563eb)';
      default:
        return 'linear-gradient(90deg, #6b7280, #4b5563)';
    }
  }};
  border-radius: 0 0 16px 16px;
  transition: width 0.1s linear;
  z-index: 1;
`;

const Toast: React.FC<ToastProps> = ({ id, type, title, message, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    if (duration <= 0) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      setProgress(newProgress);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      }
    };

    // Start the progress animation
    const progressInterval = setInterval(() => {
      updateProgress();
    }, 50); // Update every 50ms for smooth animation

    // Auto-close timer
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(closeTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        );
      case 'error':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      case 'warning':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      case 'info':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
    }
  };

  return (
    <ToastContainer type={type} isVisible={isVisible}>
      <CloseButton onClick={handleClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </CloseButton>
      <ToastHeader>
        <IconContainer type={type}>
          {getIcon()}
        </IconContainer>
        <ContentContainer>
          <Title type={type}>{title}</Title>
          <Message>{message}</Message>
        </ContentContainer>
      </ToastHeader>
      {duration > 0 && <ProgressBar type={type} progress={progress} />}
    </ToastContainer>
  );
};

export default Toast;
