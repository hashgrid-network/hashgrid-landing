import React, { useState, useEffect } from 'react';
import { 
  Download, 
  ShieldCheck, 
  Zap, 
  Key, 
  Globe, 
  Flame, 
  ExternalLink, 
  CheckCircle2, 
  Smartphone, 
  ChevronRight, 
  X, 
  Check, 
  Copy, 
  Gift, 
  Send, 
  MessageSquare, 
  Share2, 
  Coins, 
  Server, 
  Calculator, 
  Users, 
  Fingerprint, 
  Shield, 
  Sparkles,
  Bot,
  RotateCcw
} from 'lucide-react';
import { ProfitCalculator, GRID_TOKEN_PRICE } from './components/ProfitCalculator';
import { Toast } from './components/Toast';

export const OFFICIAL_DOWNLOAD_URL = "https://github.com/hashgrid-network/hashgrid-proapp/releases/download/v1.0.0/HashGrid-Pro-v1.0.0.apk";

export default function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [referralCode, setReferralCode] = useState<string>('');
  const [refCopied, setRefCopied] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Detect dynamic referral parameter: ?ref= or ?r=
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref') || params.get('r');
      if (ref && ref.trim().length > 0) {
        setReferralCode(ref.trim());
      }
    } catch (e) {
      console.warn('URL parsing error', e);
    }
  }, []);

  // Universal download action handler: auto-copies referral code and triggers direct APK download
  const handleDownloadAction = () => {
    if (referralCode) {
      try {
        navigator.clipboard.writeText(referralCode);
        setRefCopied(true);
        setToastMessage(`🎁 Sponsor Invite [${referralCode}] copied to clipboard! It will auto-apply when you open HashGrid Pro.`);
        setShowToast(true);
        setTimeout(() => setRefCopied(false), 3000);
      } catch (err) {
        console.warn('Clipboard write failed', err);
      }
    } else {
      setToastMessage('⬇️ Starting HashGrid Pro APK download (v1.0.0 - 27 MB)...');
      setShowToast(true);
    }

    // Trigger download
    const a = document.createElement('a');
    a.href = OFFICIAL_DOWNLOAD_URL;
    a.download = 'HashGrid-Pro-v1.0.0.apk';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyRefToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setRefCopied(true);
      setToastMessage(`🎁 Sponsor code [${referralCode}] copied!`);
      setShowToast(true);
      setTimeout(() => setRefCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-200 font-sans selection:bg-[#00F5A0] selection:text-black flex flex-col justify-between">
      
      {/* Top Pre-Launch Announcement Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-[#00F5A0] via-[#00D2FF] to-[#00F5A0] text-black py-2 px-4 text-center text-xs font-black tracking-wider uppercase flex items-center justify-between shadow-md relative z-50 font-mono">
          <div className="flex-1 text-center flex items-center justify-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-black" />
              <span>PRE-LAUNCH PHASE ACTIVE • 1 GRID = $0.01 USDT</span>
            </span>
            <span className="hidden sm:inline text-black/50">•</span>
            <span className="hidden sm:inline">DAILY FREE CLOUD MINING: 302.4 GRID / 24H (ZERO BATTERY DRAIN)</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 hover:bg-black/10 rounded text-black transition cursor-pointer shrink-0"
            aria-label="Close banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Global Sticky Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090E]/90 border-b border-[#1C2436]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo & Live Node Pulse */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5A0] to-[#00D2FF] flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-[#00F5A0]/20 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-['Syne'] leading-none">
                    HASH<span className="text-[#00F5A0]">GRID</span>
                  </span>
                  <span className="text-[10px] font-extrabold font-mono bg-[#00F5A0]/15 text-[#00F5A0] px-1.5 py-0.2 rounded border border-[#00F5A0]/40">
                    PRO
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-[#00D2FF] font-semibold mt-1 font-mono">
                  MOBILE CLOUD MINING NETWORK
                </span>
              </div>
            </a>

            {/* Navigation Links & Download Action Button */}
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                <a href="#features" className="hover:text-[#00F5A0] transition">App Features</a>
                <a href="#tiers" className="hover:text-[#00F5A0] transition">Mining Rigs</a>
                <a href="#calculator" className="hover:text-[#00F5A0] transition text-[#00F5A0]">Profit Calculator</a>
                <a href="#install" className="hover:text-[#00F5A0] transition">Install Guide</a>
              </div>

              {/* Dynamic Sponsor Pill in Nav if referral code detected */}
              {referralCode && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F141F] border border-[#00F5A0]/40 text-xs font-mono">
                  <Gift className="w-3.5 h-3.5 text-[#00F5A0]" />
                  <span className="text-slate-400">Ref:</span>
                  <strong className="text-[#00F5A0] font-bold">{referralCode}</strong>
                </div>
              )}

              {/* Master Download Action CTA */}
              <button
                onClick={handleDownloadAction}
                className="bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] hover:brightness-110 active:scale-95 text-[#06080D] font-black px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm tracking-wide uppercase font-['Syne'] flex items-center gap-2 shadow-lg shadow-[#00F5A0]/25 transition duration-150 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#06080D]" />
                <span>Download APK</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION (Pre-Launch & Download Focus) */}
      <header className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Ambient Glow Backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[400px] bg-gradient-to-tr from-[#00F5A0]/15 via-[#00D2FF]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* EXACT PRE-LAUNCH BADGE */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00F5A0]/40 bg-[#0F141F]/90 text-[#00F5A0] text-xs font-bold tracking-wider uppercase mb-8 font-mono shadow-lg shadow-[#00F5A0]/10 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5A0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F5A0]"></span>
          </span>
          <span>🔥 Pre-Launch Phase • 1 GRID = $0.01 USDT • 302.4 Free GRID/Day</span>
        </div>

        {/* EXACT MAIN TITLE */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white max-w-5xl mx-auto mb-6 font-['Syne']">
          HashGrid Pro — <span className="text-[#00F5A0] shadow-[0_0_15px_rgba(0,245,160,0.3)]">Next-Gen Mobile Cloud Mining</span>
        </h1>

        {/* EXACT SUBTITLE */}
        <p className="text-slate-300 text-sm sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
          Mine GRID token 24/7 directly from your Android phone with cloud-backed server sync, zero battery drain, and verified USDT payouts.
        </p>

        {/* DYNAMIC REFERRAL BANNER (WHEN ?ref= IS PRESENT) */}
        {referralCode ? (
          <div className="max-w-lg mx-auto mb-8 p-4 rounded-2xl bg-[#0F141F] border border-[#00F5A0]/50 shadow-2xl shadow-[#00F5A0]/10 flex items-center justify-between gap-3 text-left animate-fadeIn backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#00F5A0]/15 text-[#00F5A0] flex items-center justify-center text-2xl shrink-0 border border-[#00F5A0]/30 shadow-inner">
                🎁
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                  Sponsor Invite Detected
                </div>
                <div className="text-base sm:text-lg font-black text-white font-mono tracking-wider flex items-center gap-2">
                  <span>{referralCode}</span>
                  <span className="text-[10px] bg-[#00F5A0]/20 text-[#00F5A0] px-2 py-0.5 rounded-full font-mono font-bold">
                    Auto-Applies Upon Install
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={copyRefToClipboard}
              className="px-3.5 py-2 rounded-xl bg-[#00F5A0]/15 hover:bg-[#00F5A0]/25 border border-[#00F5A0]/40 text-[#00F5A0] text-xs font-bold font-mono transition active:scale-95 cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              {refCopied ? <Check className="w-3.5 h-3.5 text-[#00F5A0]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{refCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto mb-8 p-3 rounded-2xl bg-[#0F141F]/60 border border-[#1C2436] flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#00D2FF]" />
              <span>Have an invite link?</span>
            </span>
            <span className="text-[#00D2FF] font-semibold">Clipboard auto-detects on install</span>
          </div>
        )}

        {/* PRIMARY CTA */}
        <div className="flex flex-col items-center justify-center gap-3.5 max-w-xl mx-auto mb-10">
          <button
            onClick={handleDownloadAction}
            className="special-download-btn w-full px-6 py-4.5 shadow-2xl cursor-pointer group"
          >
            {/* Shimmer Sweep Effect */}
            <div className="special-download-shimmer" />

            <div className="flex items-center justify-center gap-3.5 relative z-10 w-full">
              <div className="w-11 h-11 rounded-xl bg-black/15 flex items-center justify-center text-black font-extrabold text-2xl shrink-0 border border-black/10 group-hover:scale-105 transition-transform">
                ⬇️
              </div>

              <div className="text-left flex flex-col justify-center">
                <div className="text-[17px] sm:text-[20px] font-extrabold tracking-[0.5px] leading-tight text-[#06080D]">
                  Download Official Android APK (v1.0.0)
                </div>
                <div className="text-[11px] font-bold text-[#06080D]/85 font-mono tracking-wide mt-0.5">
                  v1.0.0 • 27 MB • Android 8.0+ • SHA-256 Verified
                </div>
              </div>
            </div>
          </button>

          {/* BADGES UNDER CTA: "Direct APK Install" • "100% Virus Free" • "Android 8.0+" */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs text-[#00D2FF] font-mono tracking-wide flex-wrap">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F5A0]" />
              <span>v1.0.0 (27 MB)</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00F5A0]" />
              <span>100% Virus &amp; Bot Proof</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#00F5A0]" />
              <span>Android 8.0+</span>
            </span>
          </div>
        </div>

        {/* Live Network & Token Economics Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0F141F]/85 border border-[#1C2436] max-w-5xl mx-auto text-left shadow-2xl backdrop-blur-md font-mono">
          <div className="border-r border-[#1C2436] pr-4">
            <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold">Pre-Launch Rate</div>
            <div className="text-xl sm:text-2xl font-black text-[#00F5A0] mt-0.5 tabular-nums">
              $0.01 <span className="text-xs text-slate-300 font-sans font-normal">USDT</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">1 GRID = $0.01 Fixed</div>
          </div>
          <div className="border-r border-[#1C2436] pr-4">
            <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold">Free Cloud Mining</div>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5 tabular-nums">
              302.4 <span className="text-xs text-[#00F5A0] font-bold">GRID/d</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">~0.0007 GRID / second</div>
          </div>
          <div className="border-r border-[#1C2436] pr-4">
            <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold">Battery Drain</div>
            <div className="text-xl sm:text-2xl font-black text-[#00D2FF] mt-0.5">
              0.0% <span className="text-xs text-slate-300 font-sans font-normal">Impact</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Time-Delta Firestore Accrual</div>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-semibold">Monthly Node Yield</div>
            <div className="text-xl sm:text-2xl font-black text-[#00F5A0] mt-0.5">
              15% <span className="text-xs text-slate-300 font-sans font-normal">USDT</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">0.5% Daily for 200 Days</div>
          </div>
        </div>
      </header>

      {/* 2. KEY APP FEATURES (EXACT 4 PILLARS ALIGNED WITH PRODUCTION APP) */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1C2436]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00F5A0] text-xs font-bold uppercase tracking-widest font-mono">
            Core Production Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 font-['Syne']">
            Engineered For HashGrid Pro v1.0.0
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Zero bloat, zero passwords. Every module in HashGrid Pro executes directly against high-performance distributed cloud mining nodes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pillar 1: Non-Custodial Web3 Secret Key */}
          <div className="p-8 rounded-3xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00F5A0]/50 transition-all flex flex-col justify-between shadow-xl relative group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00F5A0]/10 text-[#00F5A0] border border-[#00F5A0]/30 flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-105 transition-transform">
                <Key className="w-6 h-6 text-[#00F5A0]" />
              </div>
              <span className="text-xs font-bold text-[#00F5A0] font-mono uppercase tracking-wider">
                Pillar 1 • Non-Custodial Identity
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3 font-['Syne']">
                Non-Custodial Web3 Secret Key
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Deterministic 16-character format (<code className="text-[#00F5A0] font-mono font-bold bg-[#07090E] px-1.5 py-0.5 rounded">HG-XXXX-XXXX-XXXX</code>). No complicated emails or forgotten passwords—instant 1-click cloud account and balance restoration on any device.
              </p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-[#1C2436] space-y-2">
              <div className="p-3 rounded-xl bg-[#07090E] border border-[#1C2436] flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">Secret Key Format:</span>
                <span className="text-[#00F5A0] font-bold tracking-widest">HG-9F2B-9626-2B4D</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>✓ 100% Non-Custodial</span>
                <span>•</span>
                <span>✓ Zero Password Vulnerabilities</span>
                <span>•</span>
                <span className="text-[#00F5A0]">Instant Restore</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Hardware Device Anti-Bot Shield */}
          <div className="p-8 rounded-3xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00D2FF]/50 transition-all flex flex-col justify-between shadow-xl relative group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30 flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6 text-[#00D2FF]" />
              </div>
              <span className="text-xs font-bold text-[#00D2FF] font-mono uppercase tracking-wider">
                Pillar 2 • Hardware Verification
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3 font-['Syne']">
                Hardware Device Anti-Bot Shield
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Enforces a strict limit of maximum 2 accounts per physical device via native <code className="text-[#00D2FF] font-mono font-bold bg-[#07090E] px-1.5 py-0.5 rounded">ANDROID_ID</code> and real-time Firestore cloud validation to eliminate emulator bot farms.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1C2436] space-y-2">
              <div className="p-3 rounded-xl bg-[#07090E] border border-[#1C2436] flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>Device Hardware Gate:</span>
                </span>
                <span className="text-[#00D2FF] font-bold">Max 2 Accounts / ANDROID_ID</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>✓ Anti-Emulator Protection</span>
                <span>•</span>
                <span>✓ Screen PIN Lock</span>
                <span>•</span>
                <span className="text-[#00D2FF]">Fair Yield Distribution</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Real-Time Accrual Engine */}
          <div className="p-8 rounded-3xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00F5A0]/50 transition-all flex flex-col justify-between shadow-xl relative group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00F5A0]/10 text-[#00F5A0] border border-[#00F5A0]/30 flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-105 transition-transform">
                <RotateCcw className="w-6 h-6 text-[#00F5A0]" />
              </div>
              <span className="text-xs font-bold text-[#00F5A0] font-mono uppercase tracking-wider">
                Pillar 3 • Time-Delta Engine
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3 font-['Syne']">
                Real-Time Accrual Engine
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Time-delta background yield accrual on Firestore. Mining calculations continue running uninterrupted in the cloud ledger even when the app is minimized or your device is completely powered off.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1C2436] space-y-2">
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-[#07090E] border border-[#1C2436] text-center">
                  <span className="text-slate-400 block text-[10px]">Free Cycle</span>
                  <strong className="text-white">302.4 GRID / 24h</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-[#07090E] border border-[#1C2436] text-center">
                  <span className="text-slate-400 block text-[10px]">Active Node</span>
                  <strong className="text-[#00F5A0]">0.5% USDT / day</strong>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>✓ Zero Local Battery Drain</span>
                <span>•</span>
                <span className="text-[#00F5A0]">99.99% Server-Side Uptime</span>
              </div>
            </div>
          </div>

          {/* Pillar 4: Daily Lucky Wheel & Instant Ledger */}
          <div className="p-8 rounded-3xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00D2FF]/50 transition-all flex flex-col justify-between shadow-xl relative group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30 flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-[#00D2FF]" />
              </div>
              <span className="text-xs font-bold text-[#00D2FF] font-mono uppercase tracking-wider">
                Pillar 4 • Gamified Ledger
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3 font-['Syne']">
                Daily Lucky Wheel & Instant Ledger
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Spin the in-app Lucky Wheel every 24 hours for instant bonus GRID tokens &amp; USDT. Full automated withdrawal support across BEP-20 (BNB Smart Chain) and TRC-20 (Tron).
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1C2436] space-y-2">
              <div className="p-3 rounded-xl bg-[#07090E] border border-[#1C2436] flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">Withdrawal Networks:</span>
                <span className="text-[#00D2FF] font-bold">BEP-20 (BSC) &amp; TRC-20 (Tron)</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="text-[#00F5A0] font-bold">Daily Free Wheel Spins</span>
                <span>•</span>
                <span className="text-[#00D2FF]">Instant Dual-Network Settlements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MINING RIG TIERS & PROFIT CALCULATOR (Updated to exact 15% Monthly / 200 Days lifecycle) */}
      <section id="tiers" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1C2436]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00D2FF] text-xs font-bold uppercase tracking-widest font-mono">
            Fixed 15% Monthly Yield • 200-Day Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 font-['Syne']">
            HashGrid Pro Hardware Node Catalog
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Every node in HashGrid Pro earns a fixed <strong>15% Monthly USDT Yield (0.5% Daily)</strong> over a 200-day active cloud cycle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          
          {/* Tier 1: Micro Miner ($10) */}
          <div className="p-5 rounded-2xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00F5A0]/50 transition-all flex flex-col justify-between relative shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#00F5A0] font-mono uppercase tracking-wider">Tier 1</span>
                <span className="text-[10px] font-extrabold bg-[#00F5A0]/10 text-[#00F5A0] px-2 py-0.5 rounded-full border border-[#00F5A0]/30 font-mono">Starter</span>
              </div>
              <h3 className="text-lg font-bold text-white font-['Syne']">Micro Miner</h3>
              
              <div className="text-2xl font-extrabold text-white mt-2 font-mono tabular-nums">
                $10 <span className="text-xs text-slate-400 font-sans font-normal">USDT</span>
              </div>
              <div className="text-xs text-[#00F5A0] font-mono mt-0.5 font-bold">
                = 1,000 GRID (@ $0.01)
              </div>

              <div className="mt-2.5 px-2 py-1 rounded-lg bg-[#00F5A0]/10 border border-[#00F5A0]/25 text-[#00F5A0] text-[10px] font-extrabold font-mono text-center truncate">
                Lifecycle: 200 Days
              </div>

              <ul className="my-4 space-y-2 text-xs text-slate-300 border-t border-[#1C2436] pt-3 font-mono">
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Hashrate:</span>
                  <strong className="text-white font-bold">4 GH/s</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Daily (0.5%):</span>
                  <strong className="text-[#00F5A0] font-bold">+$0.05 / day</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly (15%):</span>
                  <strong className="text-[#00D2FF] font-bold">$1.50 / mo</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">200d Net ROI:</span>
                  <strong className="text-white font-bold">+$10.00</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Total Return:</span>
                  <strong className="text-[#00F5A0] font-bold">$20.00 (200%)</strong>
                </li>
              </ul>
            </div>

            <button
              onClick={handleDownloadAction}
              className="w-full py-2.5 rounded-xl border border-[#00F5A0]/40 bg-[#0F141F] hover:bg-[#00F5A0] text-[#00F5A0] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer font-['Syne'] flex items-center justify-center gap-1.5"
            >
              <span>Deploy ($10)</span>
              <span>→</span>
            </button>
          </div>

          {/* Tier 2: Starter Node ($25) */}
          <div className="p-5 rounded-2xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00F5A0]/50 transition-all flex flex-col justify-between relative shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#00F5A0] font-mono uppercase tracking-wider">Tier 2</span>
                <span className="text-[10px] font-extrabold bg-[#00F5A0]/10 text-[#00F5A0] px-2 py-0.5 rounded-full border border-[#00F5A0]/30 font-mono">Popular</span>
              </div>
              <h3 className="text-lg font-bold text-white font-['Syne']">Starter Node</h3>
              
              <div className="text-2xl font-extrabold text-white mt-2 font-mono tabular-nums">
                $25 <span className="text-xs text-slate-400 font-sans font-normal">USDT</span>
              </div>
              <div className="text-xs text-[#00F5A0] font-mono mt-0.5 font-bold">
                = 2,500 GRID (@ $0.01)
              </div>

              <div className="mt-2.5 px-2 py-1 rounded-lg bg-[#00F5A0]/10 border border-[#00F5A0]/25 text-[#00F5A0] text-[10px] font-extrabold font-mono text-center truncate">
                Lifecycle: 200 Days
              </div>

              <ul className="my-4 space-y-2 text-xs text-slate-300 border-t border-[#1C2436] pt-3 font-mono">
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Hashrate:</span>
                  <strong className="text-white font-bold">10 GH/s</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Daily (0.5%):</span>
                  <strong className="text-[#00F5A0] font-bold">+$0.125 / day</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly (15%):</span>
                  <strong className="text-[#00D2FF] font-bold">$3.75 / mo</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">200d Net ROI:</span>
                  <strong className="text-white font-bold">+$25.00</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Total Return:</span>
                  <strong className="text-[#00F5A0] font-bold">$50.00 (200%)</strong>
                </li>
              </ul>
            </div>

            <button
              onClick={handleDownloadAction}
              className="w-full py-2.5 rounded-xl border border-[#00F5A0]/40 bg-[#0F141F] hover:bg-[#00F5A0] text-[#00F5A0] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer font-['Syne'] flex items-center justify-center gap-1.5"
            >
              <span>Deploy ($25)</span>
              <span>→</span>
            </button>
          </div>

          {/* Tier 3: Pro Rig ($100) */}
          <div className="p-5 rounded-2xl bg-[#0F141F] border border-[#00F5A0]/60 flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-3 right-3 bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-mono shadow-md">
              Featured
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#00F5A0] font-mono uppercase tracking-wider">Tier 3</span>
                <span className="text-[10px] font-extrabold bg-[#00F5A0]/10 text-[#00F5A0] px-2 py-0.5 rounded-full border border-[#00F5A0]/30 font-mono">Standard</span>
              </div>
              <h3 className="text-lg font-bold text-white font-['Syne']">Pro Rig</h3>
              
              <div className="text-2xl font-extrabold text-white mt-2 font-mono tabular-nums">
                $100 <span className="text-xs text-slate-400 font-sans font-normal">USDT</span>
              </div>
              <div className="text-xs text-[#00F5A0] font-mono mt-0.5 font-bold">
                = 10,000 GRID (@ $0.01)
              </div>

              <div className="mt-2.5 px-2 py-1 rounded-lg bg-[#00F5A0]/10 border border-[#00F5A0]/25 text-[#00F5A0] text-[10px] font-extrabold font-mono text-center truncate">
                Lifecycle: 200 Days
              </div>

              <ul className="my-4 space-y-2 text-xs text-slate-300 border-t border-[#1C2436] pt-3 font-mono">
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Hashrate:</span>
                  <strong className="text-white font-bold">40 GH/s</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Daily (0.5%):</span>
                  <strong className="text-[#00F5A0] font-bold">+$0.50 / day</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly (15%):</span>
                  <strong className="text-[#00D2FF] font-bold">$15.00 / mo</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">200d Net ROI:</span>
                  <strong className="text-white font-bold">+$100.00</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Total Return:</span>
                  <strong className="text-[#00F5A0] font-bold">$200.00 (200%)</strong>
                </li>
              </ul>
            </div>

            <button
              onClick={handleDownloadAction}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer font-['Syne'] flex items-center justify-center gap-1.5 shadow-lg shadow-[#00F5A0]/20"
            >
              <span>Deploy ($100)</span>
              <span>→</span>
            </button>
          </div>

          {/* Tier 4: Master Node ($500) */}
          <div className="p-5 rounded-2xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00F5A0]/50 transition-all flex flex-col justify-between relative shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#00D2FF] font-mono uppercase tracking-wider">Tier 4</span>
                <span className="text-[10px] font-extrabold bg-[#00D2FF]/10 text-[#00D2FF] px-2 py-0.5 rounded-full border border-[#00D2FF]/30 font-mono">High Yield</span>
              </div>
              <h3 className="text-lg font-bold text-white font-['Syne']">Master Node</h3>
              
              <div className="text-2xl font-extrabold text-white mt-2 font-mono tabular-nums">
                $500 <span className="text-xs text-slate-400 font-sans font-normal">USDT</span>
              </div>
              <div className="text-xs text-[#00D2FF] font-mono mt-0.5 font-bold">
                = 50,000 GRID (@ $0.01)
              </div>

              <div className="mt-2.5 px-2 py-1 rounded-lg bg-[#00D2FF]/10 border border-[#00D2FF]/25 text-[#00D2FF] text-[10px] font-extrabold font-mono text-center truncate">
                Lifecycle: 200 Days
              </div>

              <ul className="my-4 space-y-2 text-xs text-slate-300 border-t border-[#1C2436] pt-3 font-mono">
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Hashrate:</span>
                  <strong className="text-white font-bold">200 GH/s</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Daily (0.5%):</span>
                  <strong className="text-[#00F5A0] font-bold">+$2.50 / day</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly (15%):</span>
                  <strong className="text-[#00D2FF] font-bold">$75.00 / mo</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">200d Net ROI:</span>
                  <strong className="text-white font-bold">+$500.00</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Total Return:</span>
                  <strong className="text-[#00F5A0] font-bold">$1,000.00 (200%)</strong>
                </li>
              </ul>
            </div>

            <button
              onClick={handleDownloadAction}
              className="w-full py-2.5 rounded-xl border border-[#00F5A0]/40 bg-[#0F141F] hover:bg-[#00F5A0] text-[#00F5A0] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer font-['Syne'] flex items-center justify-center gap-1.5"
            >
              <span>Deploy ($500)</span>
              <span>→</span>
            </button>
          </div>

          {/* Tier 5: Elite Hardware Cluster ($1,000) */}
          <div className="p-5 rounded-2xl bg-[#0F141F] border border-[#00D2FF]/50 hover:border-[#00D2FF] transition-all flex flex-col justify-between relative shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-yellow-400 font-mono uppercase tracking-wider">Tier 5</span>
                <span className="text-[10px] font-extrabold bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-400/30 font-mono">Enterprise</span>
              </div>
              <h3 className="text-lg font-bold text-white font-['Syne']">Elite Cluster</h3>
              
              <div className="text-2xl font-extrabold text-white mt-2 font-mono tabular-nums">
                $1,000 <span className="text-xs text-slate-400 font-sans font-normal">USDT</span>
              </div>
              <div className="text-xs text-yellow-400 font-mono mt-0.5 font-bold">
                = 100,000 GRID (@ $0.01)
              </div>

              <div className="mt-2.5 px-2 py-1 rounded-lg bg-yellow-400/10 border border-yellow-400/25 text-yellow-400 text-[10px] font-extrabold font-mono text-center truncate">
                Lifecycle: 200 Days
              </div>

              <ul className="my-4 space-y-2 text-xs text-slate-300 border-t border-[#1C2436] pt-3 font-mono">
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Hashrate:</span>
                  <strong className="text-white font-bold">400 GH/s</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Daily (0.5%):</span>
                  <strong className="text-[#00F5A0] font-bold">+$5.00 / day</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly (15%):</span>
                  <strong className="text-[#00D2FF] font-bold">$150.00 / mo</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">200d Net ROI:</span>
                  <strong className="text-white font-bold">+$1,000.00</strong>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400">Total Return:</span>
                  <strong className="text-[#00F5A0] font-bold">$2,000.00 (200%)</strong>
                </li>
              </ul>
            </div>

            <button
              onClick={handleDownloadAction}
              className="w-full py-2.5 rounded-xl border border-yellow-400/50 bg-[#0F141F] hover:bg-yellow-400 text-yellow-400 hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer font-['Syne'] flex items-center justify-center gap-1.5"
            >
              <span>Deploy ($1,000)</span>
              <span>→</span>
            </button>
          </div>

        </div>

        {/* Embedded Interactive Profit Calculator Component with Dual Token Calculations */}
        <ProfitCalculator
          downloadUrl={OFFICIAL_DOWNLOAD_URL}
          onDeploy={handleDownloadAction}
        />
      </section>

      {/* 4. 3-STEP SIMPLE INSTALLATION GUIDE */}
      <section id="install" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1C2436]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00F5A0] text-xs font-bold uppercase tracking-widest font-mono">
            Fast Android Setup
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2 font-['Syne']">
            3-Step Simple Installation Guide
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Get your mobile cloud node operational and accumulating 302.4 free GRID tokens daily in under 60 seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00F5A0]/40 transition-all flex flex-col justify-between shadow-xl relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#00F5A0]/15 text-[#00F5A0] font-black text-xl flex items-center justify-center mb-6 font-mono border border-[#00F5A0]/30">
              01
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#00F5A0] uppercase font-mono tracking-wider">
                Step 1: Download APK
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3 font-['Syne']">
                Install HashGrid Pro APK
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Download and install the official HashGrid Pro APK directly from <strong>hashgrid.online</strong> (Android 8.0+ supported, 27 MB).
              </p>
            </div>
            <button
              onClick={handleDownloadAction}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black font-extrabold text-xs uppercase tracking-wider font-['Syne'] flex items-center justify-center gap-2 cursor-pointer shadow-md hover:brightness-110"
            >
              <Download className="w-4 h-4" />
              <span>Download APK (v1.0.0)</span>
            </button>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00D2FF]/40 transition-all flex flex-col justify-between shadow-xl relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#00D2FF]/15 text-[#00D2FF] font-black text-xl flex items-center justify-center mb-6 font-mono border border-[#00D2FF]/30">
              02
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#00D2FF] uppercase font-mono tracking-wider">
                Step 2: Account Security
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3 font-['Syne']">
                Backup Key &amp; Set PIN
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Open app, securely backup your 16-character Web3 Secret Key (<code>HG-XXXX-XXXX-XXXX</code>), and set your 4-digit PIN for instant 1-click recovery.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#07090E] border border-[#1C2436] text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00D2FF] shrink-0" />
              <span>Max 2 accounts per physical device</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-[#0F141F] border border-[#00F5A0]/40 transition-all flex flex-col justify-between shadow-xl relative group">
            <div className="w-12 h-12 rounded-2xl bg-[#00F5A0]/20 text-[#00F5A0] font-black text-xl flex items-center justify-center mb-6 font-mono border border-[#00F5A0]/40 shadow-inner">
              03
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#00F5A0] uppercase font-mono tracking-wider">
                Step 3: Start Cloud Mining
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3 font-['Syne']">
                Tap 'Start Mining' &amp; Spin Wheel
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Tap 'Start Mining' to accumulate 302.4 free GRID daily or deploy fixed 15% monthly USDT nodes with automated 24/7 cloud yields.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#00F5A0]/10 border border-[#00F5A0]/30 text-[11px] font-mono text-[#00F5A0] flex items-center gap-2">
              <Zap className="w-4 h-4 shrink-0 text-[#00F5A0]" />
              <span>Zero battery drain • 24/7 background sync</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER & TRUST BADGES */}
      <footer className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#1C2436] bg-[#07090E] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand & Domain */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F5A0] to-[#00D2FF] flex items-center justify-center text-black font-extrabold text-base shadow-md">
                  ⚡
                </div>
                <span className="text-2xl font-black text-white font-['Syne']">
                  HASH<span className="text-[#00F5A0]">GRID</span> <span className="text-[#00D2FF] text-lg font-mono">PRO</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
                Next-generation Web3 mobile cloud mining protocol. Mine GRID token 24/7 with zero battery load, automated dual-network USDT settlements, and Web3 key security.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-500">Official Domain:</span>
                <a
                  href="https://hashgrid.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00D2FF] bg-[#00D2FF]/10 hover:bg-[#00D2FF]/20 px-2.5 py-1 rounded-lg border border-[#00D2FF]/30 transition inline-flex items-center gap-1 font-bold"
                >
                  <span>hashgrid.online</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Column 2: Official Download & Pre-Launch */}
            <div className="space-y-3 font-mono">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Mobile Client</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={handleDownloadAction}
                    className="text-[#00F5A0] hover:underline font-bold flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Android APK (v1.0.0)</span>
                  </button>
                </li>
                <li className="text-slate-400">Release: v1.0.0 • 27 MB • Android 8.0+</li>
                <li className="text-slate-400">Pre-Launch Price: 1 GRID = $0.01 USDT</li>
                <li className="text-slate-400">Security: SHA-256 Cloud Verified</li>
              </ul>
            </div>

            {/* Column 3: Community Channels & Support */}
            <div className="space-y-3 font-mono">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Community & Concierge</h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://t.me/hashgrid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#00F5A0] transition flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Official Telegram Channel</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/message/hashgrid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#00F5A0] transition flex items-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#00F5A0]" />
                    <span>WhatsApp Concierge Support</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/hashgrid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#00F5A0] transition flex items-center gap-2"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Twitter / X Updates</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Terms Disclaimer */}
          <div className="pt-8 border-t border-[#1C2436] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[11px] font-mono text-slate-500">
            <p>
              © 2026 HashGrid Pro Network (hashgrid.online). Decentralized Cloud Mining &amp; Automated Settlement Protocol.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Pre-Launch Tokenomics (1 GRID = $0.01)</span>
              <span>•</span>
              <span>Dual-Network TRC20/BEP20</span>
              <span>•</span>
              <span className="text-[#00F5A0]">Zero Battery Architecture</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Referral / Notification Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          code={referralCode}
          onClose={() => setShowToast(false)}
        />
      )}

    </div>
  );
}
