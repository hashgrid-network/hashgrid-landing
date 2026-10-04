import React from 'react';
import { X, Download, ShieldCheck, Sparkles, Zap, ArrowUpRight } from 'lucide-react';
import { AppUpdateManager, APP_UPDATE_CONFIG } from '../utils/AppUpdateManager.ts';
import { copyReferralToClipboard } from '../utils/referral.ts';

interface AppUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string;
  onDownloadAction?: () => void;
}

export const AppUpdateModal: React.FC<AppUpdateModalProps> = ({
  isOpen,
  onClose,
  referralCode = 'HG-808080',
  onDownloadAction,
}) => {
  if (!isOpen) return null;

  const updateUrl = "#";

  const handleUpdateClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    copyReferralToClipboard(referralCode);
    if (onDownloadAction) {
      onDownloadAction();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#121622] border border-[#E6C786]/50 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#E6C786]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1D2436]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6C786] to-[#D4AF37] text-black flex items-center justify-center font-extrabold text-lg shadow-md">
              ⚡
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Syne']">
                New Version Available
              </h3>
              <span className="text-xs text-[#E6C786] font-mono">v{APP_UPDATE_CONFIG.latestVersion} Genesis Production</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1D2436] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="my-5 space-y-3.5">
          <p className="text-xs text-slate-300 leading-relaxed">
            A new version of HashGrid is available with updated cloud hashrate telemetry and performance improvements.
          </p>

          <div className="p-3.5 rounded-2xl bg-[#0B0F17] border border-[#1D2436] space-y-2 text-xs">
            <div className="text-[11px] font-bold text-[#E6C786] uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C786]" />
              <span>What's New in this Release:</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 pl-4 list-disc text-[11px]">
              {APP_UPDATE_CONFIG.releaseNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons: Button Label 'UPDATE' */}
        <div className="space-y-2.5">
          <a
            href="#"
            onClick={handleUpdateClick}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E6C786] via-[#F3DAA2] to-[#D4AF37] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition shadow-xl shadow-[#E6C786]/25 font-['Syne'] cursor-pointer"
          >
            <Download className="w-4 h-4 text-black" />
            <span>UPDATE</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-[#1D2436] text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};
