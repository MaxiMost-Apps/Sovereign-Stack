import { toast as sonnerToast, Toaster as SonnerToaster } from 'sonner';

// Re-export Toaster with our preferred default styling
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <SonnerToaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0b0c10',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600'
          },
          className: 'my-toast-class',
        }}
      />
    </>
  );
};

// COMPATIBILITY LAYER:
// Wrap Sonner to match the old useToast API as much as possible to avoid breaking changes.
export const useToast = () => {
  return {
    addToast: (msg: string, type: 'success' | 'error' = 'success') => {
      if (type === 'error') {
        sonnerToast.error(msg);
      } else {
        sonnerToast.success(msg);
      }
    },
    // Direct access if needed
    toast: sonnerToast
  };
};
