import React, { useState } from 'react';
import { Download, Menu, X, Zap, Cpu, Gift, ExternalLink } from 'lucide-react';
import { copyReferralToClipboard } from '../utils/referral.ts';

interface NavbarProps {
  onOpenDownload: () => void;
  onOpenDemo: () => void;
  referralCode?: string;
  onDownloadAction?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDownload,
  onOpenDemo,
  referralCode = 'HG-808080',
  onDownloadAction,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const directApkUrl = "#";

  const handleDownloadClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    copyReferralToClipboard(referralCode);
    if (onDownloadAction) {
      onDownloadAction();
    }
  };

  const navLinks = [
    { name: 'Highlights', href: '#features' },
    { name: 'How to Install', href: '#download' },
    { name: 'Live Sandbox', href: '#demo' },
    { name: 'Rigs', href: '#plans' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0F17]/90 border-b border-[#1D2436] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Wordmark */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#E6C786] to-[#D4AF37] flex items-center justify-center text-black font-extrabold shadow-md shadow-[#E6C786]/20 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 fill-black stroke-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white font-['Syne'] leading-none">
                HASH<span className="text-[#E6C786]">GRID</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mt-1 font-mono">
                Cloud Mining Network
              </span>
            </div>
          </a>

          {/* Clean Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#E6C786] transition-colors duration-150 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Primary Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#121622] border border-[#1D2436] text-[11px] font-mono text-slate-300">
              <Gift className="w-3.5 h-3.5 text-[#E6C786]" />
              <span className="text-slate-400">Ref:</span>
              <span className="font-bold text-[#E6C786]">{referralCode}</span>
            </div>

            <button
              onClick={onOpenDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#121622] hover:bg-[#181E2E] border border-[#1D2436] rounded-xl transition duration-150 whitespace-nowrap"
            >
              <Cpu className="w-3.5 h-3.5 text-[#E6C786]" />
              <span>Sandbox</span>
            </button>

            <a
              href="#"
              onClick={handleDownloadClick}
              className="bg-gradient-to-r from-[#E6C786] via-[#F3DAA2] to-[#D4AF37] hover:brightness-110 active:scale-95 text-black font-extrabold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition duration-150 flex items-center gap-2 shadow-lg shadow-[#E6C786]/20 whitespace-nowrap font-['Syne'] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download App</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#121622]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#1D2436] bg-[#0E121A] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#1D2436]/60">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-[#E6C786] hover:bg-[#181E2E] rounded-lg transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#121622] border border-[#1D2436] text-xs font-bold text-slate-200 flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-[#E6C786]" />
              <span>Test Interactive Tap Miner</span>
            </button>

            <a
              href="#"
              onClick={(e) => {
                handleDownloadClick(e);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E6C786] to-[#D4AF37] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-md font-['Syne'] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>⚡ GET STARTED</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
