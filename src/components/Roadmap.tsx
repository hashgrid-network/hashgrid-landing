import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const phases = [
    {
      phase: 'Phase 1 • Live Now',
      title: 'Genesis Launch',
      status: 'Current Active',
      isCurrent: true,
      items: [
        'Android Mobile App official rollout',
        'Free 24h $HGLD tap-to-mine sync',
        '$10 Starter cloud rigs deployment',
        'Daily lucky wheel faucet & 2FA security',
      ],
    },
    {
      phase: 'Phase 2 • Q3 2026',
      title: 'Play Store & Expansion',
      status: 'In Progress',
      isCurrent: false,
      items: [
        '14-day closed tester qualification',
        'Google Play Store public release',
        'First halving event (< 1,000 users)',
        'Enterprise server clusters addition',
      ],
    },
    {
      phase: 'Phase 3 • Q4 2026',
      title: 'Smart Contract Audit',
      status: 'Upcoming',
      isCurrent: false,
      items: [
        'BEP-20 / Arbitrum smart contract',
        'CertiK independent security audit',
        'Public Testnet faucet & bridge',
        '$HGLD KYC verification protocol',
      ],
    },
    {
      phase: 'Phase 4 • 2027',
      title: 'TGE & DEX Listing',
      status: 'Upcoming',
      isCurrent: false,
      items: [
        '1:1 $HGLD token claim conversion',
        'PancakeSwap / CEX listing pool',
        'Decentralized cloud staking pool',
        'HashGrid governance DAO',
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1D2436]">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[#E6C786] text-xs font-bold uppercase tracking-widest font-mono">
          Our Future Vision
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-['Syne']">
          Strategic Execution Roadmap
        </h2>
        <p className="text-slate-400 mt-2.5 text-xs sm:text-base">
          From community tap-to-mine adoption to decentralized exchange liquidity and ecosystem staking.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {phases.map((phase) => (
          <div
            key={phase.title}
            className={`p-6 sm:p-7 rounded-2xl bg-[#121622] relative flex flex-col justify-between transition-all ${
              phase.isCurrent
                ? 'border border-[#E6C786] champagne-glow-subtle'
                : 'border border-[#1D2436] hover:border-[#1D2436]/80'
            }`}
          >
            <div>
              <div
                className={`inline-block text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4 font-mono ${
                  phase.isCurrent
                    ? 'bg-[#E6C786] text-black shadow-md'
                    : 'bg-[#181E2E] text-slate-300'
                }`}
              >
                {phase.phase}
              </div>

              <h3 className="text-lg font-bold text-white mb-4 font-['Syne']">
                {phase.title}
              </h3>

              <ul className="text-xs text-slate-300 space-y-2.5">
                {phase.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#E6C786] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1D2436]/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Milestone Status:</span>
              <span className={phase.isCurrent ? 'text-[#10B981] font-bold' : 'text-slate-500'}>
                {phase.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
