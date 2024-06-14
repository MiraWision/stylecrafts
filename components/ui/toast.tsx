import React, { createContext, useContext, useRef } from 'react';

import { Toast, ToastMessage } from 'primereact/toast';

interface ToastContextType {
  showToast: (message: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider = ({ children }: { children: React.ReactNode}) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (message: ToastMessage) => {
    if (toastRef.current) {
      toastRef.current.show(message);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast ref={toastRef} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
