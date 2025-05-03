'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence } from 'framer-motion';
import { Toast, ToastType } from './Toast';

type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
};

export const toast = {
  _notify: null as ((toast: Omit<ToastItem, 'id'>) => void) | null,

  success(message: string, duration?: number) {
    this._notify?.({ message, type: 'success', duration });
  },

  error(message: string, duration?: number) {
    this._notify?.({ message, type: 'error', duration });
  },

  warning(message: string, duration?: number) {
    this._notify?.({ message, type: 'warning', duration });
  },

  info(message: string, duration?: number) {
    this._notify?.({ message, type: 'info', duration });
  },
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    toast._notify = (newToast) => {
      setToasts((prev) => [...prev, { ...newToast, id: uuidv4() }]);
    };

    return () => {
      toast._notify = null;
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
