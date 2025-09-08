import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { ToastProps } from '../components/Toast/Toast';

interface ToastContextType {
  toasts: ToastProps[];
  showSuccess: (title: string, message: string, duration?: number) => void;
  showError: (title: string, message: string, duration?: number) => void;
  showWarning: (title: string, message: string, duration?: number) => void;
  showInfo: (title: string, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((type: ToastProps['type'], title: string, message: string, duration: number = 5000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastProps = {
      id,
      type,
      title,
      message,
      duration,
      onClose: removeToast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showSuccess = useCallback((title: string, message: string, duration?: number) => {
    addToast('success', title, message, duration);
  }, [addToast]);

  const showError = useCallback((title: string, message: string, duration?: number) => {
    addToast('error', title, message, duration);
  }, [addToast]);

  const showWarning = useCallback((title: string, message: string, duration?: number) => {
    addToast('warning', title, message, duration);
  }, [addToast]);

  const showInfo = useCallback((title: string, message: string, duration?: number) => {
    addToast('info', title, message, duration);
  }, [addToast]);

  const value: ToastContextType = {
    toasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};
