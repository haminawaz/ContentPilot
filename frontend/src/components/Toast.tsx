import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const toastConfig: Record<ToastType, { icon: React.ReactNode; color: string }> = {
  success: {
    icon: <CheckCircle size={20} />,
    color: 'var(--success)',
  },
  error: {
    icon: <XCircle size={20} />,
    color: 'var(--error)',
  },
  info: {
    icon: <Info size={20} />,
    color: 'var(--info)',
  },
  warning: {
    icon: <AlertTriangle size={20} />,
    color: 'var(--warning)',
  },
};

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const config = toastConfig[toast.type];

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        onDismiss(toast.id);
      }, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="glass-panel"
      style={{
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        minWidth: '340px',
        maxWidth: '420px',
        borderLeft: `3px solid ${config.color}`,
      }}
    >
      <div style={{ color: config.color, flexShrink: 0, marginTop: '1px' }}>
        {config.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ 
          margin: 0, 
          fontWeight: 600, 
          color: 'var(--text-primary)', 
          fontSize: '0.95rem' 
        }}>
          {toast.title}
        </p>
        {toast.message && (
          <p style={{ 
            margin: '0.25rem 0 0', 
            color: 'var(--text-secondary)', 
            fontSize: '0.85rem', 
            lineHeight: 1.4 
          }}>
            {toast.message}
          </p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="btn-ghost btn-icon"
        style={{ 
          width: '28px', 
          height: '28px', 
          flexShrink: 0,
          marginTop: '-2px',
          marginRight: '-4px'
        }}
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = React.useCallback(
    (title: string, message?: string) => addToast({ type: 'success', title, message }),
    [addToast]
  );

  const error = React.useCallback(
    (title: string, message?: string) => addToast({ type: 'error', title, message }),
    [addToast]
  );

  const info = React.useCallback(
    (title: string, message?: string) => addToast({ type: 'info', title, message }),
    [addToast]
  );

  const warning = React.useCallback(
    (title: string, message?: string) => addToast({ type: 'warning', title, message }),
    [addToast]
  );

  return { toasts, addToast, dismissToast, success, error, info, warning };
};
