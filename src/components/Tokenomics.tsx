import React from 'react';
import { Database, TrendingDown, Users, PieChart, ShieldCheck } from 'lucide-react';

export const Tokenomics: React.FC = () => {
  const halvingStages = [
    { users: 'Genesis (Now)', rate: '1.0 $HGLD/hr', daily: '24.0 $HGLD', active: true },
    { users: '1,000 Miners', rate: '0.5 $HGLD/hr', daily: '12.0 $HGLD', active: false },
    { users: '10,000 Miners', rate: '0.25 $HGLD/hr', daily: '6.0 $HGLD', active: false },
    { users: '100,000 Miners', rate: '0.125 $HGLD/hr', daily: '3.0 $HGLD', active: false },
    { users: 'Phase 4 (100M Cap)', rate: '0.00 $HGLD/hr', daily: 'Mint Closes', active: false },
  ];

  const distribution = [
    { label: 'Community Tap-To-Mine', pct: '60%', amount: '60,000,000 $HGLD', color: 'bg-[#E6C786]' },
    { label: 'DEX/CEX Liquidity Pools', pct: '20%', amount: '20,000,000 $HGLD', color: 'bg-[#D4AF37]' },
    { label: 'Cloud Infrastructure & Rigs', pct: '15%', amount: '15,000,000 $HGLD', color: 'bg-amber-600' },
    { label: 'Security Audits & Reserve', pct: '5%', amount: '5,000,000 $HGLD', color: 'bg-slate-500' },
  ];

  return (
    <section id="tokenomics" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1D2436]">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[#E6C786] text-xs font-bold uppercase tracking-widest font-mono">
          Genesis Economics
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-['Syne']">
          $HGLD Tokenomics & Scarcity
        </h2>
        <p className="text-slate-400 mt-2.5 text-xs sm:text-base">
          A mathematically capped supply designed to reward early adopters before mainstream decentralized exchange listing.
        </p>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-7 rounded-2xl bg-[#121622] border border-[#1D2436] flex flex-col justify-between shadow-lg">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold font-mono">Total Hard Cap</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#E6C786] mt-2 font-mono tabular-nums">
              100,000,000
            </div>
            <p className="text-slate-400 text-xs sm:text-[13px] mt-3 leading-relaxed">
              Strictly hard-capped supply. No minting function exists beyond the 100M threshold. All unmined genesis reserves lock at Phase 4 conclusion.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#1D2436]/60 text-[11px] text-slate-400 font-mono">
            Circulating in Genesis: &lt; 5%
          </div>
        </div>

        <div className="p-7 rounded-2xl bg-[#121622] border border-[#1D2436] flex flex-col justify-between shadow-lg">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold font-mono">Epoch 1 Base Rate</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-mono tabular-nums">
              1.0 <span className="text-base sm:text-lg text-[#E6C786] font-bold font-sans">$HGLD/hr</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-[13px] mt-3 leading-relaxed">
              Early adopters claim 24.0 $HGLD tokens daily. Halving triggers automatically at 1,000 active miners (0.5 $HGLD/hr) and 10,000 miners (0.25 $HGLD/hr).
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#1D2436]/60 text-[11px] text-[#10B981] font-mono">
            Epoch 1 Active Status: 100%
          </div>
        </div>

        <div className="p-7 rounded-2xl bg-[#121622] border border-[#1D2436] flex flex-col justify-between shadow-lg">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold font-mono">Syndicate Multiplier</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-mono tabular-nums">
              +10% <span className="text-base sm:text-lg text-[#E6C786] font-bold font-sans">per Teammate</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-[13px] mt-3 leading-relaxed">
              Boost your hourly tap speed dynamically whenever invited teammates are actively running their synchronized 24h mining sessions.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#1D2436]/60 text-[11px] text-slate-400 font-mono">
            Anti-Sybil Verification Active
          </div>
        </div>
      </div>

      {/* Halving Epochs visual progress */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-[#1D2436] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white font-['Syne']">
              Bitcoin-Style Halving Timeline
            </h3>
            <p className="text-xs text-slate-400">
              Mining difficulty increases and rewards halve as user milestones are reached
            </p>
          </div>
          <span className="text-xs font-mono text-[#E6C786] bg-[#E6C786]/10 px-3 py-1 rounded-lg border border-[#E6C786]/30 self-start sm:self-auto">
            Current Stage: Phase 1 Genesis
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {halvingStages.map((stage) => (
            <div
              key={stage.users}
              className={`p-4 rounded-xl border text-center transition ${
                stage.active
                  ? 'bg-[#E6C786]/10 border-[#E6C786]'
                  : 'bg-[#0B0F17] border-[#1D2436] opacity-75'
              }`}
            >
              <div className="text-[10px] text-slate-400 uppercase font-semibold font-mono">
                {stage.users}
              </div>
              <div className="text-base font-extrabold text-white font-mono mt-1">
                {stage.rate}
              </div>
              <div className="text-xs text-[#E6C786] font-medium mt-1 font-mono">
                {stage.daily}
              </div>
              {stage.active && (
                <div className="mt-2 text-[10px] text-[#10B981] font-bold uppercase tracking-wider">
                  ● Active Now
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Token allocation distribution */}
        <div className="mt-8 pt-6 border-t border-[#1D2436]">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 font-mono">
            Token Allocation Architecture
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {distribution.map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-[#0B0F17] border border-[#1D2436]">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs font-semibold text-slate-300">{item.pct}</span>
                </div>
                <div className="text-xs font-bold text-white mt-1">{item.label}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
