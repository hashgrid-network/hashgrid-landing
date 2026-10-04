import React from 'react';
import { Bolt, Calendar, LockOpen, Check, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface MiningPlansProps {
  onOpenDownload: () => void;
}

export const MiningPlans: React.FC<MiningPlansProps> = ({ onOpenDownload }) => {
  const plans = [
    {
      tier: 'Tier 1',
      title: 'Starter Rig',
      price: '$10',
      unit: 'USDT',
      desc: 'Zero barrier entry for every cloud miner.',
      power: '10 TH/s',
      roi: '10% – 15% Monthly ROI',
      lifecycle: '30-Day Fixed Mining Contract',
      milestone: '$3.00 (30%) Capital Lock Target',
      release: '30-Day Maturity Yield Release',
      isPopular: true,
      badge: 'Best For Beginners',
    },
    {
      tier: 'Tier 2',
      title: 'Basic Rig',
      price: '$25',
      unit: 'USDT',
      desc: 'Enhanced daily hashrate allocation.',
      power: '28 TH/s',
      roi: '10% – 15% Monthly ROI',
      lifecycle: '30-Day Fixed Mining Contract',
      milestone: '$7.50 (30%) Capital Lock Target',
      release: '30-Day Maturity Yield Release',
      isPopular: false,
    },
    {
      tier: 'Tier 3',
      title: 'Standard Rig',
      price: '$50',
      unit: 'USDT',
      desc: 'High-frequency cloud mining node.',
      power: '65 TH/s',
      roi: '10% – 15% Monthly ROI',
      lifecycle: '30-Day Fixed Mining Contract',
      milestone: '$15.00 (30%) Capital Lock Target',
      release: '30-Day Maturity Yield Release',
      isPopular: false,
    },
    {
      tier: 'Tier 4',
      title: 'Pro Node',
      price: '$100',
      unit: 'USDT',
      desc: 'Maximum throughput cloud server.',
      power: '150 TH/s',
      roi: '10% – 15% Monthly ROI',
      lifecycle: '30-Day Fixed Mining Contract',
      milestone: '$30.00 (30%) Capital Lock Target',
      release: '30-Day Maturity Yield Release',
      isPopular: false,
    },
    {
      tier: 'Tier 5',
      title: 'Enterprise Cluster',
      price: '$500',
      unit: 'USDT',
      desc: 'Institutional multi-rack cluster.',
      power: '800 TH/s',
      roi: '10% – 15% Monthly ROI',
      lifecycle: '30-Day Fixed Mining Contract',
      milestone: '$150.00 (30%) Capital Lock Target',
      release: '30-Day Maturity Yield Release',
      isPopular: false,
      badge: 'Institutional Grade',
    },
  ];

  return (
    <section id="plans" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1D2436]">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[#E6C786] text-xs font-bold uppercase tracking-widest font-mono">
          Scalable Hashrate Tiers
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-['Syne']">
          Dedicated Cloud Mining Rigs
        </h2>
        <p className="text-slate-400 mt-2.5 text-xs sm:text-base">
          All hardware nodes operate on 30-day fixed contracts generating 10% – 15% monthly ROI. Daily yields accumulate in real-time and unlock upon completing the 30-day maturity cycle.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`p-5 sm:p-6 rounded-2xl bg-[#121622] relative flex flex-col justify-between transition-all duration-200 ${
              plan.isPopular
                ? 'border-2 border-[#E6C786] champagne-glow-subtle'
                : 'border border-[#1D2436] hover:border-[#E6C786]/40'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 right-3 bg-gradient-to-r from-[#E6C786] to-[#D4AF37] text-black text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                {plan.badge}
              </div>
            )}

            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide font-mono">
                {plan.tier}
              </div>
              <div className="text-lg font-bold text-white mt-0.5 font-['Syne']">
                {plan.title}
              </div>

              <div className="text-3xl font-extrabold text-white mt-2 font-mono tabular-nums">
                {plan.price}{' '}
                <span className="text-xs text-slate-400 font-sans font-normal">
                  {plan.unit}
                </span>
              </div>
              <div className="text-[11px] font-bold text-[#10B981] font-mono mt-1">
                {plan.roi}
              </div>
              <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">{plan.desc}</p>

              <ul className="my-5 space-y-2.5 text-[11px] text-slate-300 border-t border-[#1D2436] pt-4">
                <li className="flex items-center gap-2">
                  <Bolt className="w-3.5 h-3.5 text-[#E6C786] shrink-0" />
                  <span>
                    <strong className="text-white">{plan.power}</strong> Hashrate
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#E6C786] shrink-0" />
                  <span>{plan.lifecycle}</span>
                </li>
                <li className="flex items-center gap-2">
                  <LockOpen className="w-3.5 h-3.5 text-[#E6C786] shrink-0" />
                  <span>
                    <strong className="text-white">{plan.milestone}</strong>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  <span>{plan.release}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenDownload}
              className={`w-full py-2.5 rounded-xl font-extrabold text-[11px] tracking-wide uppercase transition-all duration-150 flex items-center justify-center gap-1.5 mt-2 cursor-pointer ${
                plan.isPopular
                  ? "bg-gradient-to-r from-[#E6C786] to-[#D4AF37] text-black hover:brightness-110 shadow-md font-['Syne']"
                  : 'border border-[#1D2436] text-white hover:border-[#E6C786] hover:bg-[#181E2E]'
              }`}
            >
              <span>Deploy Rig</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
