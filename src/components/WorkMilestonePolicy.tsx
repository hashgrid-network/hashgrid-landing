import React, { useState } from 'react';
import { Info, ShieldCheck, CheckCircle2, Lock, Award, ShieldAlert, Key, Wallet, RefreshCw } from 'lucide-react';

export const WorkMilestonePolicy: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'both' | 'en' | 'hi'>('both');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="p-7 sm:p-10 rounded-3xl bg-[#121622] border border-[#E6C786]/40 relative shadow-2xl overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E6C786]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1D2436]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E6C786]/10 text-[#E6C786] flex items-center justify-center shrink-0 border border-[#E6C786]/30 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Syne']">
                Institutional Security & Treasury Governance
              </h3>
              <p className="text-xs text-[#E6C786] font-semibold mt-0.5">
                30-Day Maturity Cycles · Capital Lock Protocols · Anti-Hijack 2FA
              </p>
            </div>
          </div>

          {/* Language selector */}
          <div className="inline-flex p-1 bg-[#0B0F17] border border-[#1D2436] rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveLang('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeLang === 'both' ? 'bg-[#E6C786] text-black font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Both / दोनों
            </button>
            <button
              onClick={() => setActiveLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeLang === 'en' ? 'bg-[#E6C786] text-black font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveLang('hi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeLang === 'hi' ? 'bg-[#E6C786] text-black font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* 4 Core Policy Pillar Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1D2436]">
            <div className="text-[#E6C786] font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
              <RefreshCw className="w-3.5 h-3.5 text-[#E6C786]" /> 30-Day Fixed Contract
            </div>
            <div className="text-lg font-extrabold text-white font-mono">10% – 15% ROI</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Mining yields accumulate in real-time and release upon completing the 30-day maturity cycle.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1D2436]">
            <div className="text-[#E6C786] font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
              <Lock className="w-3.5 h-3.5 text-[#E6C786]" /> 30% Capital Milestone
            </div>
            <div className="text-lg font-extrabold text-white font-mono">Capital Protection</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Deployed node capital is locked until achieving the 30% yield milestone target.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1D2436]">
            <div className="text-[#E6C786] font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
              <Wallet className="w-3.5 h-3.5 text-[#E6C786]" /> 10.00 USDT Min Payout
            </div>
            <div className="text-lg font-extrabold text-white font-mono">Two-Tier Protocol</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Auto-deposits 24/7. Withdrawals reviewed & dispatched within 1 to 12 hours.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1D2436]">
            <div className="text-[#E6C786] font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
              <Key className="w-3.5 h-3.5 text-[#10B981]" /> Mandatory TOTP 2FA
            </div>
            <div className="text-lg font-extrabold text-[#10B981] font-mono">Anti-Hijack Protected</div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Password resets require active 6-digit Authenticator code. Email-only resets disabled.
            </p>
          </div>
        </div>

        {/* Full Explanatory Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {(activeLang === 'both' || activeLang === 'en') && (
            <div className="p-5 rounded-2xl bg-[#0E121A] border border-[#1D2436] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E6C786] uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4 text-[#E6C786]" /> English Platform Governance & Security Rules
              </div>
              
              <ul className="space-y-2 text-slate-300 list-disc list-inside">
                <li>
                  <strong className="text-white">30-Day Fixed Term & Monthly Profit Release:</strong> All hardware nodes ($10, $25, $50, $100, $500) operate on a 30-day fixed mining contract generating 10% – 15% monthly ROI. Daily accrued mining yields accumulate in real-time and unlock into the user's withdrawable balance upon completing the 30-day maturity cycle.
                </li>
                <li>
                  <strong className="text-white">Principal Capital Protection (30% Milestone Rule):</strong> Capital deployed to purchase mining rigs is locked until the node achieves the 30% yield milestone target. Once reached, capital release protocols unlock in accordance with platform treasury guidelines.
                </li>
                <li>
                  <strong className="text-white">Financial & Withdrawal Rules:</strong> Minimum withdrawal is strictly 10.00 USDT across BEP-20 and TRC-20 networks. Incoming deposits are credited automatically. Withdrawals undergo two-tier security review and clear within 1 to 12 hours.
                </li>
                <li>
                  <strong className="text-white">Anti-Hijack Security Protocol:</strong> High-security Google Authenticator (TOTP 2FA) binding is mandatory on registration. Account password resets strictly require active 6-digit Authenticator code verification to eliminate account takeover risks.
                </li>
              </ul>
            </div>
          )}

          {(activeLang === 'both' || activeLang === 'hi') && (
            <div className="p-5 rounded-2xl bg-[#0E121A] border border-[#1D2436] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E6C786] uppercase tracking-wider font-mono">
                <Award className="w-4 h-4 text-[#E6C786]" /> हिंदी संस्थागत नियम एवं सुरक्षा नीतियां
              </div>

              <ul className="space-y-2 text-slate-300 list-disc list-inside">
                <li>
                  <strong className="text-white">30-दिन की निश्चित अवधि और मासिक लाभ:</strong> सभी माइनिंग नोड्स ($10, $25, $50, $100, $500) 30 दिनों के फिक्स्ड कॉन्ट्रैक्ट (10% - 15% मासिक ROI) पर कार्य करते हैं। दैनिक लाभ रीयल-टाइम में जमा होता है और 30-दिन चक्र पूरा होने पर विथड्रॉवल बैलेंस में अनलॉक होता है।
                </li>
                <li>
                  <strong className="text-white">प्रिंसिपल कैपिटल प्रोटेक्शन (30% माइलस्टोन नियम):</strong> माइनिंग ग्रिड में लगाई गई कैपिटल तब तक लॉक रहती है जब तक नोड अपने 30% माइलस्टोन टारगेट को हासिल नहीं कर लेता।
                </li>
                <li>
                  <strong className="text-white">विथड्रॉवल एवं डिपॉजिट नियम:</strong> न्यूनतम विथड्रॉवल सभी नेटवर्क पर 10.00 USDT है। डिपॉजिट स्वचालित रूप से क्रेडिट होते हैं। विथड्रॉवल सुरक्षा समीक्षा के बाद 1 से 12 घंटे में प्रोसेस होते हैं।
                </li>
                <li>
                  <strong className="text-white">एंटी-हाईजैक 2FA सुरक्षा:</strong> पासवर्ड रीसेट के लिए 6-अंकों का प्रामाणिक ऑथेंटिकेटर कोड अनिवार्य है। केवल ईमेल से रीसेट को सुरक्षा कारणों से अक्षम कर दिया गया है।
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Key Guarantees bullet points */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#1D2436]">
          <div className="flex items-start gap-2.5 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span>Dedicated ASIC/GPU server allocation per user grid</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span>Strict 10.00 USDT minimum withdrawal restriction</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span>1–12 Hour Two-Tier Security Audit Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
};
