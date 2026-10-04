import React, { useState } from 'react';
import { Zap, ShieldCheck, ExternalLink, Mail, FileText, HelpCircle, X, Server } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'terms' | 'support' | null>(null);
  const releasesUrl = "https://github.com/hashgrid-network/hashgridapptestproject/releases";

  return (
    <footer className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-[#1D2436] bg-[#070A10] text-xs text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E6C786] to-[#D4AF37] flex items-center justify-center text-black font-extrabold text-sm shadow-md">
              ⚡
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-wider font-['Syne']">
                HASH<span className="text-[#E6C786]">GRID</span>
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                © 2026 HashGrid Network. All rights reserved.
              </p>
            </div>
          </div>

          {/* Clean Links: Terms, Support, GitHub Releases */}
          <div className="flex flex-wrap items-center gap-6 font-semibold text-slate-300 text-xs">
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-[#E6C786] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={() => setModalType('support')}
              className="hover:text-[#E6C786] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Support</span>
            </button>

            <a
              href="https://hashgrid.online"
              className="hover:text-[#E6C786] text-[#E6C786] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>hashgrid.online</span>
            </a>
          </div>
        </div>

        {/* Operational & Web3 Disclosures */}
        <div className="border-t border-[#1D2436]/60 pt-6 space-y-2 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400">Zero Battery Architecture:</strong> HashGrid executes all proof-of-presence and hashrate validation routines on decentralized cloud servers. No CPU or GPU computing is performed on the user's mobile device.
          </p>
          <p>
            <strong className="text-slate-400">Disclaimer:</strong> Native $HGLD tokens are utility assets allocated during Genesis Phase 1. Tokenomics follow algorithmic halving cycles based on total active participants.
          </p>
        </div>
      </div>

      {/* Terms & Support Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#121622] border border-[#E6C786]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1D2436]">
              <h3 className="text-lg font-bold text-white font-['Syne']">
                {modalType === 'terms' ? 'Terms of Service' : 'HashGrid Support'}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1D2436] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 text-xs text-slate-300 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
              {modalType === 'terms' ? (
                <>
                  <p>1. <strong>Cloud Execution:</strong> Participation in HashGrid mining signifies interaction with remote cloud nodes. Users agree not to attempt reverse engineering or multi-account fraud.</p>
                  <p>2. <strong>Genesis Phase:</strong> $HGLD distribution is subject to protocol halving milestones and community consensus guidelines.</p>
                  <p>3. <strong>Security:</strong> Users are responsible for safeguarding their Authenticator 2FA credentials.</p>
                </>
              ) : (
                <>
                  <p>Need assistance with installation, node synchronization, or 2FA binding?</p>
                  <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#1D2436] space-y-2.5 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span>📧</span>
                      <span className="text-slate-400">Email:</span>
                      <a href="mailto:support@hashgrid.network" className="text-[#E6C786] hover:underline font-bold">support@hashgrid.network</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🏛️</span>
                      <span className="text-slate-400">Documentation / Portal:</span>
                      <span className="text-slate-200 font-semibold">Institutional Node Gateway</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱</span>
                      <span className="text-slate-400">Response Time:</span>
                      <span className="text-[#10B981] font-semibold">Within 24 hours</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setModalType(null)}
              className="w-full py-2.5 rounded-xl bg-[#1D2436] hover:bg-[#252E42] text-white text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
