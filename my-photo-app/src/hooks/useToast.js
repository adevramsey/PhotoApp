import { useState, useCallback } from 'react';

/**
 * useToast Hook - Manages toast notifications
 * @returns {Object} Toast state and methods
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = useCallback((type, message, duration = 5000) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type,
      message,
      duration,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    return id;
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Helper methods for different toast types
  const success = useCallback(
    (message, duration) => addToast('success', message, duration),
    [addToast]
  );

  const error = useCallback(
    (message, duration) => addToast('error', message, duration),
    [addToast]
  );

  const warning = useCallback(
    (message, duration) => addToast('warning', message, duration),
    [addToast]
  );

  const info = useCallback(
    (message, duration) => addToast('info', message, duration),
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}