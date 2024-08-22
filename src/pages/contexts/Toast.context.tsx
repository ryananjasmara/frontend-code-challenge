import { Toast } from '@/shared/components/Toast';
import React, { createContext, useContext, useState, useCallback } from 'react';

interface ShowToastProps {
  message: string;
  duration: number;
  type: 'success' | 'warning' | 'error' | null;
}

interface ToastContextProps {
  showToast: (props: ShowToastProps) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    'success' | 'warning' | 'error' | null
  >(null);

  const showToast = useCallback((props: ShowToastProps) => {
    setToastMessage(props.message);
    setToastType(props.type);
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, props.duration);
  }, []);

  const hideToast = useCallback(() => {
    setToastMessage(null);
    setToastType(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toastMessage && toastMessage && (
        <Toast message={toastMessage} type={toastType} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
