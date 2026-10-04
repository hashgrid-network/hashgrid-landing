import React, { useState, useEffect } from 'react';
import { Download, PlayCircle, ShieldCheck, Server, Activity, Zap, Lock, Copy, Check, Gift, Sparkles, Smartphone, ChevronRight } from 'lucide-react';
import { copyReferralToClipboard } from '../utils/referral.ts';

interface HeroProps {
  onOpenDownload: () => void;
  onOpenDemo: () => void;
  referralCode?: string;
  onDownloadAction?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDownload,
  onOpenDemo,
  referralCode = 'HG-808080',
  onDownloadAction,
}) => {
  const [activeNodesCount, setActiveNodesCount] = useState(4892);
  const [networkHashrate, setNetworkHashrate] = useState(12.65);
  const [copiedRef, setCopiedRef] = useState(false);

  const directApkUrl = "#";

  // Gentle live network simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodesCount((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
      setNetworkHashrate((prev) => Number((prev + (Math.random() * 0.02 - 0.01)).toFixed(2)));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleCopyReferral = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <header className="relative pt-8 sm:pt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient luxury lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] bg-gradient-to-tr from-[#E6C786]/12 via-[#D4AF37]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="text-center max-w-4xl mx-auto">
        {/* Exact Pill Badge Required */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E6C786]/40 bg-[#121622]/90 text-[#E6C786] text-xs font-bold tracking-wider uppercase mb-6 badge-glow font-mono shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span>⚡ GENESIS PHASE 1 • CLOUD MINING ACTIVE</span>
        </div>

        {/* Exact Main Headline Required */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] gold-text-gradient mb-5 font-['Syne']">
          Mine $HGLD on Your Phone with 0% Battery Drain
        </h1>

        {/* Exact Sub-headline Required */}
        <p className="text-slate-300 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          100% cloud-based architecture. No hardware load, no overheating, maximum rewards.
        </p>

        {/* PROMINENT REFERRAL INVITE CARD */}
        <div className="max-w-md mx-auto mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#121622] border border-[#E6C786]/40 shadow-xl relative overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#E6C786]/15 text-[#E6C786] flex items-center justify-center font-bold shrink-0 border border-[#E6C786]/30">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 font-mono flex items-center gap-1.5">
                  <span>Referral Invite Active</span>
                  <span className="text-[9px] bg-[#10B981]/20 text-[#10B981] px-1.5 py-0.2 rounded font-bold">
                    +10% Boost
                  </span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white font-mono tracking-wider">
                  {referralCode}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyReferral}
              className="px-3.5 py-1.5 rounded-xl bg-[#E6C786]/15 hover:bg-[#E6C786]/25 border border-[#E6C786]/40 text-[#E6C786] text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 whitespace-nowrap"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRef ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <div className="text-[10px] text-slate-400 text-center mt-2 pt-1.5 border-t border-[#1D2436]">
            ✨ Code auto-copies to clipboard when you tap Download below!
          </div>
        </div>

        {/* PROMINENT PRIMARY CTA BUTTON & SUB-TEXT */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12 max-w-lg mx-auto">
          <a
            href="#"
            onClick={handleDownloadClick}
            className="w-full bg-gradient-to-r from-[#E6C786] via-[#F3DAA2] to-[#D4AF37] text-black font-extrabold px-6 sm:px-8 py-4 sm:py-4.5 rounded-2xl flex items-center justify-center gap-3 gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-2xl cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-black/15 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div className="text-left">
              <div className="text-base sm:text-lg font-black tracking-wide leading-tight uppercase font-['Syne']">
                ⚡ GET STARTED WITH HASHGRID
              </div>
              <div className="text-[11px] font-semibold text-black/85 font-mono">
                Official Genesis Release (Direct Access)
              </div>
            </div>
          </a>

          {/* Exact Sub-text */}
          <p className="text-xs text-slate-400 font-mono text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Direct Android App • Official Release • 100% Safe & Verified</span>
          </p>

          <button
            onClick={onOpenDemo}
            className="mt-2 text-xs text-[#E6C786] hover:text-white font-semibold flex items-center gap-1 transition"
          >
            <span>Or try the Live Web Sandbox Simulator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Highlights Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#121622]/80 border border-[#1D2436] text-left backdrop-blur-md mb-8 shadow-xl">
          <div className="border-r border-[#1D2436] pr-2 sm:pr-4">
            <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold font-mono">Native Asset</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#E6C786] mt-0.5 tabular-nums font-mono">
              $HGLD <span className="text-xs text-slate-400 font-normal">Genesis</span>
            </div>
          </div>
          <div className="border-r border-[#1D2436] pr-2 sm:pr-4">
            <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold font-mono">Phone Battery Impact</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#10B981] mt-0.5 tabular-nums font-mono">
              0.0% <span className="text-xs text-slate-300 font-normal">Cloud Only</span>
            </div>
          </div>
          <div className="border-r border-[#1D2436] pr-2 sm:pr-4">
            <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold font-mono">Global Hashrate</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 tabular-nums font-mono">
              {networkHashrate} <span className="text-xs text-slate-400 font-normal">PH/s</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold font-mono">Active Cloud Nodes</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#E6C786] mt-0.5 tabular-nums font-mono">
              {activeNodesCount.toLocaleString()}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
