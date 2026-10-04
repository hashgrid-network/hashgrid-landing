import React from 'react';
import { BatteryCharging, Disc, Users, ShieldCheck, Key, Wallet, Sparkles, Cpu } from 'lucide-react';

export const Features: React.FC = () => {
  const highlights = [
    {
      badge: '100% Cloud Execution',
      title: '🔋 Zero Hardware Load',
      desc: '100% cloud computation leaves your phone cool and saves battery. No background heating, zero CPU strain, and maximum mining uptime.',
      icon: BatteryCharging,
      accent: '#10B981',
    },
    {
      badge: 'Daily Rewards & Telemetry',
      title: '🎡 Daily Lucky Spin & Core Reactor',
      desc: 'Daily spin rewards, USDT drops, and 3D quantum mining telemetry. Claim bonus tokens, speed boosters, and instant daily faucets.',
      icon: Disc,
      accent: '#E6C786',
    },
    {
      badge: 'Active Network Boost',
      title: '👥 Team Syndicate Multiplier',
      desc: 'Invite friends and earn accelerated hashrate boosts on your earnings. Get dynamic +10% speed boosts for every active mining teammate.',
      icon: Users,
      accent: '#D4AF37',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1D2436]">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[#E6C786] text-xs font-bold uppercase tracking-widest font-mono">
          Engineered For Mobile Web3
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-['Syne']">
          Why Mine With HashGrid?
        </h2>
        <p className="text-slate-400 mt-2.5 text-xs sm:text-base">
          Next-generation decentralized cloud infrastructure tailored for effortless smartphone mining.
        </p>
      </div>

      {/* 3 Core Highlight Cards */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {highlights.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-[#1D2436] hover:border-[#E6C786]/50 transition-all duration-300 group flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#E6C786]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E6C786]/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6C786]/10 text-[#E6C786] flex items-center justify-center text-xl group-hover:scale-105 group-hover:bg-[#E6C786]/20 transition-all border border-[#E6C786]/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono bg-[#0B0F17] px-2.5 py-1 rounded-full border border-[#1D2436]">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Syne']">
                  {card.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1D2436] flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Verified Architecture</span>
                <span className="text-[#10B981] font-bold">Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
