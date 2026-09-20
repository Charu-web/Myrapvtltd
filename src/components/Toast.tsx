import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, visible, onClose }) => {
  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-900 border border-zinc-800 shadow-xl text-xs font-sans font-medium text-white animate-in fade-in slide-in-from-bottom-4 duration-200"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="p-0.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-1 cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
