import React, { useState, useMemo } from 'react';
import { Calculator, Zap, Clock, ShieldCheck, ArrowRight, Copy, Check } from 'lucide-react';

interface ProfitCalculatorProps {
  downloadUrl?: string;
  onDeploy?: () => void;
}

export interface TierPreset {
  id: string;
  name: string;
  amount: number;
  hashrate: number;
  monthlyRoi: number; // 15% fixed
  dailyYield: number;
  totalRoi: number; // 200 days profit
  bonusGrid: number;
  badge: string;
}

export const GRID_TOKEN_PRICE = 0.01; // 1 GRID = $0.01 USDT
export const DAILY_FREE_GRID = 302.4; // 302.4 GRID / 24h (~0.0007 GRID/sec)
export const DAILY_FREE_USDT_VALUE = DAILY_FREE_GRID * GRID_TOKEN_PRICE; // $3.024 USDT/day

export const TIER_PRESETS: TierPreset[] = [
  { id: 'micro', name: 'Micro Miner', amount: 10, hashrate: 4, monthlyRoi: 15, dailyYield: 0.05, totalRoi: 10, bonusGrid: 1000, badge: 'Starter' },
  { id: 'starter', name: 'Starter Node', amount: 25, hashrate: 10, monthlyRoi: 15, dailyYield: 0.125, totalRoi: 25, bonusGrid: 2500, badge: 'Popular' },
  { id: 'pro', name: 'Pro Rig', amount: 100, hashrate: 40, monthlyRoi: 15, dailyYield: 0.50, totalRoi: 100, bonusGrid: 10000, badge: 'Standard' },
  { id: 'master', name: 'Master Node', amount: 500, hashrate: 200, monthlyRoi: 15, dailyYield: 2.50, totalRoi: 500, bonusGrid: 50000, badge: 'High Yield' },
  { id: 'elite', name: 'Elite Hardware Cluster', amount: 1000, hashrate: 400, monthlyRoi: 15, dailyYield: 5.00, totalRoi: 1000, bonusGrid: 100000, badge: 'Enterprise' },
];

export const DURATION_PRESETS = [
  { label: '30 Days', days: 30 },
  { label: '60 Days', days: 60 },
  { label: '100 Days', days: 100 },
  { label: '200 Days (Max Cycle)', days: 200 },
];

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ downloadUrl, onDeploy }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(100);
  const [durationDays, setDurationDays] = useState<number>(200);
  const [includeFreeMining, setIncludeFreeMining] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Exact Formula: (Investment USDT * 15% / 30) per day = 0.5% daily yield
  const calculation = useMemo(() => {
    const dailyNodeYield = investmentAmount * 0.005; // 15% / 30 days = 0.5% per day
    const totalNodeMiningYield = dailyNodeYield * durationDays;

    // Free Cloud Mining: 302.4 GRID per 24h
    const freeDailyGrid = includeFreeMining ? DAILY_FREE_GRID : 0;
    const freeDailyUsdt = includeFreeMining ? DAILY_FREE_USDT_VALUE : 0;
    const totalFreeGrid = freeDailyGrid * durationDays;
    const totalFreeUsdt = freeDailyUsdt * durationDays;

    // Combined Daily Metrics
    const totalDailyUsdt = dailyNodeYield + freeDailyUsdt;
    const totalDailyGrid = (dailyNodeYield / GRID_TOKEN_PRICE) + freeDailyGrid;

    // Monthly Metrics (30 Days)
    const monthlyNodeUsdt = dailyNodeYield * 30;
    const monthlyFreeGrid = freeDailyGrid * 30;
    const monthlyTotalUsdt = totalDailyUsdt * 30;

    // Total Lifecycle Returns
    const totalNetProfitUsdt = totalNodeMiningYield + totalFreeUsdt;
    const totalGrossReturnUsdt = investmentAmount + totalNetProfitUsdt;
    const totalNetProfitGrid = totalNetProfitUsdt / GRID_TOKEN_PRICE;
    const totalGrossReturnGrid = totalGrossReturnUsdt / GRID_TOKEN_PRICE;

    // ROI %
    const totalRoiPercentage = investmentAmount > 0 ? ((totalNetProfitUsdt / investmentAmount) * 100) : 0;

    // Assigned Hashrate (0.4 GH/s per USDT => $10=4 GH/s, $25=10 GH/s, $100=40 GH/s, $500=200 GH/s, $1000=400 GH/s)
    const assignedHashrate = Number((investmentAmount * 0.4).toFixed(1));

    // Bonus GRID token allocation (@ $0.01)
    const bonusGridTokens = investmentAmount / GRID_TOKEN_PRICE;

    // Break-even horizon (days to recover principal via node yield)
    const breakEvenDays = dailyNodeYield > 0 ? Math.ceil(investmentAmount / (dailyNodeYield + freeDailyUsdt)) : 200;

    return {
      dailyNodeYield,
      freeDailyGrid,
      freeDailyUsdt,
      totalDailyUsdt,
      totalDailyGrid,
      monthlyNodeUsdt,
      monthlyFreeGrid,
      monthlyTotalUsdt,
      totalNodeMiningYield,
      totalFreeGrid,
      totalFreeUsdt,
      totalGrossReturnUsdt,
      totalNetProfitUsdt,
      totalGrossReturnGrid,
      totalNetProfitGrid,
      totalRoiPercentage,
      assignedHashrate,
      bonusGridTokens,
      breakEvenDays,
    };
  }, [investmentAmount, durationDays, includeFreeMining]);

  const handlePresetSelect = (amount: number) => {
    setInvestmentAmount(amount);
  };

  const handleCopyProjection = () => {
    const text = `⚡ HashGrid Pro (v1.0.0) Official Yield Forecast ⚡\n` +
      `Node Stake: $${investmentAmount.toLocaleString()} USDT (${calculation.assignedHashrate} GH/s Power)\n` +
      `Bonus Allocation: ${calculation.bonusGridTokens.toLocaleString()} GRID tokens (@ $${GRID_TOKEN_PRICE.toFixed(2)})\n` +
      `Deployment Lifecycle: ${durationDays} Days (Max Cycle 200 Days)\n` +
      `Fixed Node Yield Rate: 15% Monthly (0.5% Daily)\n` +
      `Daily USDT Node Yield: +$${calculation.dailyNodeYield.toFixed(3)} USDT / day\n` +
      `Daily Free Cloud Mining: +${calculation.freeDailyGrid.toFixed(1)} GRID / day (~$${calculation.freeDailyUsdt.toFixed(2)} USDT)\n` +
      `Total Daily Dual Value: +$${calculation.totalDailyUsdt.toFixed(2)} USDT / day\n` +
      `30-Day Monthly Output: $${calculation.monthlyTotalUsdt.toFixed(2)} USDT\n` +
      `200-Day Net Profit: +$${calculation.totalNetProfitUsdt.toFixed(2)} USDT (+${calculation.totalNetProfitGrid.toLocaleString()} GRID | ${calculation.totalRoiPercentage.toFixed(1)}% ROI)\n` +
      `Total Gross Return: $${calculation.totalGrossReturnUsdt.toFixed(2)} USDT (~${calculation.totalGrossReturnGrid.toLocaleString()} GRID)\n` +
      `Official Download: https://hashgrid.online`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1C2436] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00F5A0]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00F5A0]/30 bg-[#0F141F] text-[#00F5A0] text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Calculator className="w-3.5 h-3.5 text-[#00F5A0]" />
          <span>5 Production Tiers • 15% Monthly Yield</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Syne'] tracking-tight">
          Cloud Mining <span className="text-[#00F5A0]">Profit Calculator</span>
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
          Simulate official HashGrid Pro v1.0.0 hardware rig yields across the 5 production tiers ($10 to $1,000 USDT) with fixed 15% Monthly USDT returns (0.5% daily) + daily 302.4 GRID free mining.
        </p>
      </div>

      {/* Calculator Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Inputs & Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0F141F]/90 border border-[#1C2436] rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
          
          {/* Hardware Tier Quick Selectors (5 Exact Tiers) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#00F5A0]" />
                <span>1. Select Hardware Node Rig Preset</span>
              </label>
              <span className="text-xs text-[#00D2FF] font-mono font-semibold">
                Fixed 15% Monthly Yield
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
              {TIER_PRESETS.map((preset) => {
                const isSelected = investmentAmount === preset.amount;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePresetSelect(preset.amount)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#00F5A0] bg-[#00F5A0]/15 shadow-[0_0_20px_rgba(0,245,160,0.25)]'
                        : 'border-[#1C2436] bg-[#07090E]/60 hover:border-[#00F5A0]/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold truncate">{preset.name}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse shrink-0"></span>}
                    </div>
                    <div className="text-base sm:text-lg font-black text-white font-mono mt-1">
                      ${preset.amount} <span className="text-[9px] text-slate-400 font-sans font-normal">USDT</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#00D2FF] mt-0.5">
                      {preset.hashrate} GH/s
                    </div>
                    <div className="text-[9px] font-mono text-[#00F5A0] mt-0.5 font-bold">
                      200d: +${preset.totalRoi}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Investment Amount Slider & Number Box (Min 10 - Max 1000) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase">
                Custom Node Allocation (USDT)
              </span>
              <div className="flex items-center gap-1 bg-[#07090E] border border-[#1C2436] px-3.5 py-1.5 rounded-xl font-mono shadow-inner">
                <span className="text-[#00F5A0] font-bold text-sm">$</span>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  step="5"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Math.max(10, Math.min(1000, Number(e.target.value) || 0)))}
                  className="w-20 bg-transparent text-right font-black text-white text-base focus:outline-none"
                />
                <span className="text-xs text-slate-400 font-semibold ml-1">USDT</span>
              </div>
            </div>

            {/* Slider (Range: 10 to 1000 USDT) */}
            <input
              type="range"
              min="10"
              max="1000"
              step="5"
              value={investmentAmount > 1000 ? 1000 : investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full h-2 bg-[#1C2436] rounded-lg appearance-none cursor-pointer accent-[#00F5A0]"
            />

            {/* Quick amount chips: [10, 25, 100, 500, 1000] */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[10, 25, 100, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setInvestmentAmount(amt)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                    investmentAmount === amt
                      ? 'bg-[#00F5A0] text-black shadow-sm'
                      : 'bg-[#07090E] text-slate-400 hover:text-white border border-[#1C2436]'
                  }`}
                >
                  ${amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector (30d, 60d, 100d, 200d Max Cycle) */}
          <div className="space-y-3 border-t border-[#1C2436] pt-6">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>2. Hardware Deployment Lifecycle</span>
              </label>
              <span className="text-xs text-[#00F5A0] font-mono font-bold bg-[#07090E] px-3 py-1 rounded-xl border border-[#00F5A0]/40">
                {durationDays} Days ({durationDays * 24} Hours)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DURATION_PRESETS.map((preset) => {
                const isSelected = durationDays === preset.days;
                return (
                  <button
                    key={preset.days}
                    type="button"
                    onClick={() => setDurationDays(preset.days)}
                    className={`py-3 px-2 text-center rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#00D2FF] bg-[#00D2FF]/15 text-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.25)]'
                        : 'border-[#1C2436] bg-[#07090E]/60 text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Free Cloud Mining Toggle (302.4 GRID / Day) */}
          <div className="border-t border-[#1C2436] pt-6 bg-[#07090E]/60 p-4 rounded-2xl border border-[#1C2436]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00F5A0]/15 text-[#00F5A0] flex items-center justify-center font-bold text-lg border border-[#00F5A0]/30">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
                    <span>Include Daily Free Cloud Mining</span>
                    <span className="text-[10px] bg-[#00F5A0]/20 text-[#00F5A0] px-2 py-0.5 rounded-full font-bold">
                      +302.4 GRID / 24h
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    1-tap 24h cycle accrual (~0.0007 GRID/sec) = +$3.024 USDT/day value
                  </div>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFreeMining}
                  onChange={(e) => setIncludeFreeMining(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00F5A0]"></div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Live Projection Terminal & Yield Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-gradient-to-b from-[#0F141F] to-[#07090E] border-2 border-[#00F5A0]/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1C2436]">
              <div>
                <span className="text-[10px] font-bold text-[#00F5A0] uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-ping"></span>
                  <span>Verified Dual Payout Forecast</span>
                </span>
                <h3 className="text-xl font-extrabold text-white font-['Syne'] mt-0.5">
                  Production Forecast
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#00D2FF] font-mono bg-[#00D2FF]/10 px-2.5 py-1 rounded-lg border border-[#00D2FF]/30 block">
                  {calculation.assignedHashrate} GH/s
                </span>
                <span className="text-[10px] text-[#00F5A0] font-mono mt-1 block">
                  1 GRID = $0.01 USDT
                </span>
              </div>
            </div>

            {/* Giant Total Gross Return Display */}
            <div className="bg-[#07090E]/80 border border-[#1C2436] rounded-2xl p-5 mb-6 text-center relative shadow-inner">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">
                Total Projected Value ({durationDays} Days)
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1 tracking-tight text-[#00F5A0] shadow-[0_0_15px_rgba(0,245,160,0.3)]">
                ${calculation.totalGrossReturnUsdt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                <span className="text-sm font-normal text-slate-300">USDT</span>
              </div>
              <div className="text-sm font-bold text-[#00D2FF] font-mono mt-1">
                ≈ {calculation.totalGrossReturnGrid.toLocaleString('en-US', { maximumFractionDigits: 0 })} GRID tokens
              </div>
              
              <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-[#1C2436]/60 text-xs font-mono">
                <span className="text-slate-400">
                  Net Profit:{' '}
                  <strong className="text-white font-bold">
                    +${calculation.totalNetProfitUsdt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </strong>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-[#00D2FF] font-bold">
                  +{calculation.totalRoiPercentage.toFixed(1)}% ROI
                </span>
              </div>
            </div>

            {/* Yield Intervals Breakdown (USDT + GRID) */}
            <div className="space-y-3 font-mono text-xs">
              
              {/* Daily USDT Node Yield */}
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#07090E]/80 border border-[#1C2436]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]"></span>
                  Daily USDT Node Yield (0.5%/d):
                </span>
                <div className="text-right">
                  <span className="text-[#00F5A0] font-bold text-sm block">
                    +${calculation.dailyNodeYield.toFixed(3)} USDT / day
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    15.0% Monthly Fixed
                  </span>
                </div>
              </div>

              {/* Free Mining Yield */}
              {includeFreeMining && (
                <div className="flex justify-between items-center p-3 rounded-xl bg-[#07090E]/80 border border-[#00D2FF]/30">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]"></span>
                    Daily Free Cloud Mining:
                  </span>
                  <div className="text-right">
                    <span className="text-[#00D2FF] font-bold text-sm block">
                      +302.4 GRID / day
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      ≈ +$3.024 USDT value
                    </span>
                  </div>
                </div>
              )}

              {/* Combined Daily Dual Output */}
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#00F5A0]/10 border border-[#00F5A0]/40">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span>💎</span>
                  Total Combined Daily Output:
                </span>
                <div className="text-right">
                  <span className="text-[#00F5A0] font-black text-sm block">
                    +${calculation.totalDailyUsdt.toFixed(2)} USDT / day
                  </span>
                  <span className="text-[11px] text-[#00D2FF] font-semibold">
                    +{calculation.totalDailyGrid.toFixed(1)} GRID equiv.
                  </span>
                </div>
              </div>

              {/* 30-Day Monthly Output */}
              <div className="flex justify-between items-center p-3 rounded-xl bg-[#07090E]/80 border border-[#1C2436]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]"></span>
                  Monthly Output (30 Days):
                </span>
                <div className="text-right">
                  <span className="text-white font-bold text-sm block">
                    +${calculation.monthlyTotalUsdt.toFixed(2)} USDT
                  </span>
                  <span className="text-[11px] text-[#00F5A0] font-semibold">
                    Node: +${calculation.monthlyNodeUsdt.toFixed(2)} + Free: 9,072 GRID
                  </span>
                </div>
              </div>

            </div>

            {/* 200 Days Max Cycle Note */}
            <div className="mt-6 pt-5 border-t border-[#1C2436] space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">200-Day Full Cycle Net Return:</span>
                <span className="font-bold text-[#00F5A0]">
                  +${(investmentAmount * 0.15 * (200/30)).toFixed(2)} USDT Node ROI (100%)
                </span>
              </div>
              <div className="w-full bg-[#07090E] h-2 rounded-full overflow-hidden border border-[#1C2436]">
                <div
                  className="bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(15, (durationDays / 200) * 100))}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Start: Day 0</span>
                <span className="text-[#00D2FF]">30d (~15%)</span>
                <span className="text-[#00F5A0]">200d Max Cycle (100% Net ROI)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <a
                href={downloadUrl || "https://github.com/hashgrid-network/hashgrid-proapp/releases/download/v1.0.0/HashGrid-Pro-v1.0.0.apk"}
                download="HashGrid-Pro-v1.0.0.apk"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (onDeploy) {
                    onDeploy();
                  }
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] hover:brightness-110 text-black font-extrabold text-sm uppercase tracking-wider font-['Syne'] flex items-center justify-center gap-2.5 shadow-lg shadow-[#00F5A0]/25 transition cursor-pointer"
              >
                <span>Download App & Deploy Node</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyProjection}
                className="w-full py-2.5 rounded-xl border border-[#1C2436] bg-[#07090E] hover:border-slate-500 text-slate-300 hover:text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00F5A0]" />
                    <span className="text-[#00F5A0]">Projection Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Forecast Breakdown</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Security & Settlement Assurance Note */}
          <div className="p-4 rounded-2xl bg-[#0F141F]/60 border border-[#1C2436] text-xs font-mono text-slate-400 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00F5A0] shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-bold block mb-0.5">Automated Dual-Network Settlement</span>
              <span>
                All calculated earnings settle automatically in USDT via Tron (TRC-20) and BNB Smart Chain (BEP-20) with instant withdrawal processing.
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
