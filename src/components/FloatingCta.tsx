import React, { useState, useEffect } from 'react';
import { Download, Gift, Zap } from 'lucide-react';
import { copyReferralToClipboard } from '../utils/referral.ts';

interface FloatingCtaProps {
  referralCode?: string;
  onDownloadAction?: () => void;
}

export const FloatingCta: React.FC<FloatingCtaProps> = ({
  referralCode = 'HG-808080',
  onDownloadAction,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const directApkUrl = "#";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    copyReferralToClipboard(referralCode);
    if (onDownloadAction) {
      onDownloadAction();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:right-6 sm:left-auto sm:max-w-md z-40 animate-slide-up">
      <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0B0F17]/95 border border-[#E6C786]/60 backdrop-blur-xl shadow-2xl shadow-black/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E6C786] to-[#D4AF37] flex items-center justify-center text-black font-extrabold text-xs shrink-0 shadow-md">
            <Zap className="w-4 h-4 fill-black stroke-black" />
          </div>
          <div className="truncate text-left">
            <div className="text-xs font-bold text-white truncate font-['Syne']">
              Mine $HGLD on Phone
            </div>
            <div className="text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
              <span>Ref: <strong className="text-[#E6C786]">{referralCode}</strong></span>
              <span className="text-[#10B981] font-bold">(+10% Boost)</span>
            </div>
          </div>
        </div>

        <a
          href="#"
          onClick={handleDownloadClick}
          className="bg-gradient-to-r from-[#E6C786] via-[#F3DAA2] to-[#D4AF37] hover:brightness-110 active:scale-95 text-black font-extrabold px-4 py-2 sm:py-2.5 rounded-xl text-xs transition duration-150 flex items-center gap-1.5 shadow-lg shadow-[#E6C786]/20 whitespace-nowrap shrink-0 font-['Syne'] cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-black" />
          <span>Get Started</span>
        </a>
      </div>
    </div>
  );
};
