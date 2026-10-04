import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Lock, Wallet, Key } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does HashGrid consume my phone battery, CPU, or memory?',
      a: 'Zero battery or hardware consumption (0.0% battery impact). All mining operations run on remote cloud server infrastructure. Tapping the 24h center button submits a lightweight cryptographic proof of presence.',
    },
    {
      q: 'How do the 30-Day Fixed Mining Contracts and profit releases work?',
      a: 'All hardware nodes ($10, $25, $50, $100, $500) operate on a 30-day fixed mining contract generating 10% – 15% monthly ROI. Accrued mining yields accumulate daily in real-time and unlock into your withdrawable balance upon completing the 30-day maturity cycle.',
    },
    {
      q: 'What is the Principal Capital Protection (30% Milestone Rule)?',
      a: 'Capital deployed to purchase mining rigs is locked until the node achieves its 30% yield milestone target ($3.00 on a $10 rig, $30.00 on a $100 rig). Once the 30% work target is reached, capital release protocols unlock in accordance with platform treasury guidelines.',
    },
    {
      q: 'What are the Minimum Withdrawal limit and processing times?',
      a: 'Withdrawals are strictly restricted to a minimum of 10.00 USDT across all networks (BEP-20 and TRC-20). Requests below 10 USDT are automatically restricted by the protocol. All withdrawal requests undergo two-tier administrative review and blockchain dispatch, typically clearing within 1 to 12 hours.',
    },
    {
      q: 'How are incoming deposits processed and credited?',
      a: 'All incoming on-chain deposits sent to HashGrid\'s official locked vault addresses (BEP-20: 0x1fAcE21fc7cA33abb4B37fba82280266C12D9c09 / TRC-20: TJj7G3U8qVSzqcJaxAhQG34ADHihnR6WuD) are processed and credited automatically 24/7.',
    },
    {
      q: 'Why are Google Authenticator (TOTP 2FA) and Anti-Hijack resets mandatory?',
      a: 'High-security Google Authenticator binding is mandatory on registration. To prevent account hijacking and SIM-swap exploits, password resets strictly require active 6-digit Authenticator code verification. Unauthenticated or email-only resets are disabled.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#1D2436]">
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[#E6C786] text-xs font-bold uppercase tracking-widest font-mono">
          Got Questions?
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-['Syne']">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 mt-2.5 text-xs sm:text-sm">
          Everything you need to know about 0% battery cloud mining, 30-day contracts, capital locks, 10 USDT minimum payouts, and anti-hijack 2FA security.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-[#121622] border-[#E6C786]/40 shadow-lg shadow-[#E6C786]/5'
                  : 'bg-[#0E121A] border-[#1D2436] hover:border-[#1D2436]/90'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-white font-['Syne']">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#E6C786] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1D2436]/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
