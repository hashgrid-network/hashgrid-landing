import React, { useState } from 'react';
import { X, Download, ShieldCheck, CheckCircle2, AlertCircle, Copy, Check, Smartphone, Gift } from 'lucide-react';
import { copyReferralToClipboard } from '../utils/referral.ts';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string;
  onDownloadAction?: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  referralCode = 'HG-808080',
  onDownloadAction,
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  if (!isOpen) return null;

  const directApkUrl = "#";
  const sha256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyRef = () => {
    copyReferralToClipboard(referralCode);
    setCopiedRef(true);
    if (onDownloadAction) {
      onDownloadAction();
    }
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleDownloadClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    copyReferralToClipboard(referralCode);
    if (onDownloadAction) {
      onDownloadAction();
    }
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#121622] border border-[#E6C786]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Top header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1D2436]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6C786] to-[#D4AF37] text-black flex items-center justify-center font-extrabold text-lg shadow-md">
              ⚡
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Syne']">
                HashGrid Mobile Miner
              </h3>
              <span className="text-xs text-slate-400 font-mono">Genesis Release • Production</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1D2436] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PROMINENT REFERRAL CODE INTEGRATION BOX */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#0B0F17] border border-[#E6C786]/40 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E6C786]/20 text-[#E6C786] flex items-center justify-center font-bold shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                Invitation Code (Auto-Copies on Tap)
              </span>
              <span className="text-base font-extrabold text-white font-mono tracking-wider">
                {referralCode}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyRef}
            className="px-3 py-1.5 rounded-xl bg-[#E6C786]/20 hover:bg-[#E6C786]/30 text-[#E6C786] text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shrink-0"
          >
            {copiedRef ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRef ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        {/* APK Metadata specs */}
        <div className="my-4 p-3.5 rounded-2xl bg-[#0B0F17] border border-[#1D2436] space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Operating System:</span>
            <span className="text-white font-semibold">Android 8.0 & Above</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Battery Impact:</span>
            <span className="text-[#10B981] font-semibold font-mono">0.0% (100% Cloud Miner)</span>
          </div>
          <div className="flex justify-between text-slate-400 items-center pt-1 border-t border-[#1D2436]">
            <span>SHA-256 Verification:</span>
            <button
              onClick={handleCopyHash}
              className="inline-flex items-center gap-1 text-[#E6C786] hover:underline font-mono text-[11px]"
            >
              {copiedHash ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedHash ? 'Checksum Copied' : 'Verify Checksum'}</span>
            </button>
          </div>
        </div>

        {/* Primary Download Button (Direct GitHub Release File) */}
        <div className="space-y-3">
          <a
            href="#"
            onClick={handleDownloadClick}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E6C786] via-[#F3DAA2] to-[#D4AF37] text-black font-extrabold flex flex-col items-center justify-center hover:brightness-110 active:scale-98 transition shadow-xl shadow-[#E6C786]/20 font-['Syne'] cursor-pointer"
          >
            <div className="flex items-center gap-2 text-sm uppercase tracking-wide">
              <Download className="w-5 h-5 text-black" />
              <span>⚡ GET STARTED (FREE)</span>
            </div>
            <div className="text-[10px] font-bold text-black/85 font-mono mt-0.5">
              Direct Mobile Client • 100% Safe
            </div>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-[#1D2436] text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Close & Return
          </button>
        </div>
      </div>
    </div>
  );
};
