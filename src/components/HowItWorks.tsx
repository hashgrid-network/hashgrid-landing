import React from 'react';
import { UserCheck, Zap, Layers, LockOpen, RefreshCw, Key } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: '1-Click Signup & Fast 2FA',
      desc: 'Register with email & password and bind Google Authenticator (TOTP 2FA). Password resets require active 6-digit Authenticator codes to eliminate account takeover risks.',
      icon: Key,
    },
    {
      num: '02',
      title: 'Daily Tap-To-Mine $HGLD',
      desc: 'Tap the center gold button once every 24 hours to claim 24.0 free native $HGLD coins. All operations run on remote cloud servers with 0% battery or CPU impact.',
      icon: Zap,
    },
    {
      num: '03',
      title: '30-Day Fixed Rigs ($10 - $500)',
      desc: 'Deploy dedicated hardware nodes ($10, $25, $50, $100, $500) operating on a 30-day fixed mining contract generating 10% – 15% monthly ROI with real-time daily yield accumulation.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Capital Target & Maturity Release',
      desc: 'Capital is protected via 30% yield milestone locks. Accrued mining yields unlock into withdrawable balance upon completing the 30-day maturity cycle (10.00 USDT min withdrawal).',
      icon: RefreshCw,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1D2436]">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[#E6C786] text-xs font-bold uppercase tracking-widest font-mono">
          Transparent Ecosystem Architecture
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-['Syne']">
          How HashGrid Works
        </h2>
        <p className="text-slate-400 mt-2.5 text-xs sm:text-base">
          A sustainable, fraud-proof platform built on 30-day fixed contracts, 30% milestone capital locks, and mandatory anti-hijack TOTP 2FA security.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="p-6 sm:p-7 rounded-2xl bg-[#121622] border border-[#1D2436] hover:border-[#E6C786]/50 transition-all duration-200 group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#E6C786]/10 text-[#E6C786] flex items-center justify-center font-extrabold text-base border border-[#E6C786]/30 group-hover:scale-105 transition-transform">
                    {step.num}
                  </div>
                  <Icon className="w-5 h-5 text-slate-500 group-hover:text-[#E6C786] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 font-['Syne']">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#1D2436]/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Protocol Step {step.num}</span>
                <span className="text-[#10B981] font-semibold">Verified</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
