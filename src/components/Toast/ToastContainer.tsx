import React from 'react';
import styled, { keyframes } from 'styled-components';
import Toast, { ToastProps } from './Toast';

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 420px;
  pointer-events: none;
  
  @media (max-width: 768px) {
    top: 16px;
    left: 16px;
    right: 16px;
    max-width: none;
  }
`;

const ToastWrapper = styled.div`
  pointer-events: auto;
  animation: ${slideInFromLeft} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
`;

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <Container>
      {toasts.map((toast) => (
        <ToastWrapper key={toast.id}>
          <Toast
            {...toast}
            onClose={onClose}
          />
        </ToastWrapper>
      ))}
    </Container>
  );
};

export default ToastContainer;
