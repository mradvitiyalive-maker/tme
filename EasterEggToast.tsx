import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface EasterEggToastProps {
  message: string | null;
  onClose: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-[90vw] bg-[#FFF9F2] border-2 border-[#EBA8BC] shadow-xl rounded-2xl p-4 animate-bounce-in transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#F8DDE5] rounded-full text-rose-500 shrink-0">
          <Sparkles className="w-5 h-5 animate-spin-slow" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-heading uppercase tracking-wider text-[#786B73] font-bold">
            Secret Easter Egg Unlocked 🤫
          </div>
          <p className="mt-1 text-sm font-heading font-semibold text-[#352D32] leading-snug">
            "{message}"
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-[#786B73] hover:text-[#352D32] hover:bg-[#F8DDE5]/50 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
