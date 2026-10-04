import React, { useState } from 'react';
import { Download, QrCode, Smartphone, Gift, Copy, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { copyReferralToClipboard } from '../utils/referral.ts';

interface InstallationSectionProps {
  onOpenDownload?: () => void;
  referralCode?: string;
  onDownloadAction?: () => void;
}

export const InstallationSection: React.FC<InstallationSectionProps> = ({
  referralCode = 'HG-808080',
  onDownloadAction,
}) => {
  const [copiedRef, setCopiedRef] = useState(false);
  const directApkUrl = "#";

  const handleCopyReferral = () => {
    copyReferralToClipboard(referralCode);
    setCopiedRef(true);
    if (onDownloadAction) {
      onDownloadAction();
    }
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleDownloadClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    copyReferralToClipboard(referralCode);
    if (onDownloadAction) {
      onDownloadAction();
    }
  };

  return (
    <section id="download" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#1D2436]">
      <div className="bg-[#121622] p-6 sm:p-12 rounded-3xl border border-[#1D2436] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
        {/* Left Column: 3 Simple Steps */}
        <div className="w-full lg:w-3/5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6C786]/10 border border-[#E6C786]/30 text-[#E6C786] text-xs font-bold uppercase tracking-wider mb-4 font-mono">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Fast Android Setup</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-['Syne']">
            How to Install HashGrid APK
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-6">
            Follow these 3 quick steps to start mining $HGLD on your phone in under 60 seconds:
          </p>

          {/* Prominent Referral Code Box */}
          <div className="mb-6 p-4 rounded-2xl bg-[#0B0F17] border border-[#E6C786]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E6C786]/20 text-[#E6C786] flex items-center justify-center font-bold shrink-0 border border-[#E6C786]/30">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                  Genesis Invitation Code
                </span>
                <span className="text-base font-extrabold text-white font-mono tracking-wider">
                  {referralCode}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyReferral}
              className="px-3.5 py-1.5 rounded-xl bg-[#E6C786]/15 hover:bg-[#E6C786]/25 border border-[#E6C786]/40 text-[#E6C786] text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shrink-0"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRef ? 'Copied' : 'Copy Invite Code'}</span>
            </button>
          </div>

          {/* 3 Simple Steps Required */}
          <ol className="space-y-4 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-3.5 p-3 rounded-xl bg-[#0B0F17]/60 border border-[#1D2436]">
              <span className="w-7 h-7 rounded-xl bg-[#E6C786] text-black flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-white">Step 1:</strong> Tap <span className="text-[#E6C786] font-bold">"Download Latest APK"</span> below to get the official release.
              </div>
            </li>

            <li className="flex items-start gap-3.5 p-3 rounded-xl bg-[#0B0F17]/60 border border-[#1D2436]">
              <span className="w-7 h-7 rounded-xl bg-[#E6C786] text-black flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-white">Step 2:</strong> Open file &amp; select <strong className="text-white">"Allow from this source"</strong> if prompted by Android.
              </div>
            </li>

            <li className="flex items-start gap-3.5 p-3 rounded-xl bg-[#0B0F17]/60 border border-[#1D2436]">
              <span className="w-7 h-7 rounded-xl bg-[#E6C786] text-black flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-white">Step 3:</strong> Enter invite code <span className="text-[#E6C786] font-bold font-mono">{referralCode}</span> at sign up to claim Genesis mining boost!
              </div>
            </li>
          </ol>

          {/* DOWNLOAD BUTTON */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#"
              onClick={handleDownloadClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#E6C786] via-[#F3DAA2] to-[#D4AF37] hover:brightness-110 active:scale-95 text-black font-extrabold px-7 py-4 rounded-2xl transition shadow-xl shadow-[#E6C786]/20 cursor-pointer"
            >
              <Download className="w-5 h-5 text-black shrink-0" />
              <div className="text-left">
                <div className="text-sm font-extrabold leading-tight font-['Syne'] uppercase">
                  ⚡ GET STARTED (FREE)
                </div>
                <div className="text-[10px] font-semibold text-black/85 font-mono">
                  Direct Mobile Access • 100% Safe
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Scan QR code */}
        <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-7 bg-[#0B0F17] rounded-2xl border border-[#1D2436] text-center shadow-inner">
          <div className="w-44 h-44 bg-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-center relative group">
            {/* Real SVG QR code pointing to releases */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
              <path d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z" />
              <path d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z" />
              <path d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z" />
              <rect x="35" y="5" width="8" height="8" />
              <rect x="48" y="5" width="8" height="8" />
              <rect x="58" y="15" width="8" height="8" />
              <rect x="35" y="25" width="8" height="8" />
              <rect x="48" y="35" width="8" height="8" />
              <rect x="58" y="45" width="8" height="8" />
              <rect x="15" y="45" width="8" height="8" />
              <rect x="25" y="55" width="8" height="8" />
              <rect x="35" y="65" width="8" height="8" />
              <rect x="48" y="75" width="8" height="8" />
              <rect x="68" y="65" width="8" height="8" />
              <rect x="78" y="75" width="8" height="8" />
              <rect x="88" y="85" width="8" height="8" />
              <rect x="65" y="35" width="8" height="8" />
              <rect x="75" y="45" width="8" height="8" />
              <rect x="85" y="55" width="8" height="8" />
            </svg>

            {/* Center Logo Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-9 h-9 rounded-lg bg-[#0B0F17] text-[#E6C786] flex items-center justify-center font-bold text-xs shadow-md border border-[#E6C786]/40">
                ⚡
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-200 font-bold">
            <QrCode className="w-4 h-4 text-[#E6C786]" />
            <span>Scan to access on mobile</span>
          </div>

          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            Android 8.0+ • Cloud Verified
          </p>

          <div className="mt-4 pt-3 border-t border-[#1D2436] w-full flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Invite Code:</span>
            <span className="text-[#E6C786] font-bold">{referralCode}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
