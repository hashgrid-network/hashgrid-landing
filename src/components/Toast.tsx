import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message?: string;
  code?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message = "✓ Referral code copied to clipboard! It will auto-apply when you open HashGrid.",
  code,
  onClose,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-lg w-[92%] sm:w-auto px-5 py-4 rounded-2xl bg-[#0e161f]/95 border-2 border-[#10B981] text-white shadow-2xl backdrop-blur-xl flex items-center gap-3.5 animate-bounce-subtle transition-all duration-300">
      <div className="w-9 h-9 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center font-extrabold shrink-0 border border-[#10B981]/40 shadow-inner">
        <CheckCircle2 className="w-5 h-5" />
      </div>

      <div className="flex-1 text-left">
        <div className="text-xs sm:text-sm font-bold text-white leading-tight">
          {message}
        </div>
        {code && (
          <div className="text-[11px] text-[#10B981] font-mono font-bold mt-1 flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-300">Code:</span>
            <span className="bg-[#10B981]/15 px-2 py-0.5 rounded border border-[#10B981]/30 text-white tracking-wider">
              {code}
            </span>
            <span className="text-[#F5A623] font-sans font-semibold text-[10px]">
              (+10% Boost Auto-Applied)
            </span>
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2433] transition shrink-0 ml-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
