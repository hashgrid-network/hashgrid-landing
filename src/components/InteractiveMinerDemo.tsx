import React, { useState, useEffect } from 'react';
import { Zap, Sparkles, Trophy, Users, Calculator, RefreshCw, CheckCircle2, Lock, ArrowUpRight, ShieldCheck, Wallet } from 'lucide-react';

interface InteractiveMinerDemoProps {
  onOpenDownload: () => void;
}

export const InteractiveMinerDemo: React.FC<InteractiveMinerDemoProps> = ({ onOpenDownload }) => {
  const [activeTab, setActiveTab] = useState<'tap-miner' | 'calculator'>('tap-miner');

  // Tap-to-mine state
  const [isMining, setIsMining] = useState(false);
  const [minedBalance, setMinedBalance] = useState(24.0);
  const [secondsRemaining, setSecondsRemaining] = useState(24 * 3600);
  const [teamBoostCount, setTeamBoostCount] = useState(3);
  const [tapEffect, setTapEffect] = useState(false);

  // Wheel mini-game state
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);

  // Calculator state
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(10);

  // Mining interval loop
  useEffect(() => {
    let interval: any = null;
    if (isMining) {
      interval = setInterval(() => {
        const multiplier = 1 + teamBoostCount * 0.1;
        const ratePerSec = (1.0 / 3600) * multiplier;
        setMinedBalance((prev) => Number((prev + ratePerSec).toFixed(4)));
        setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 24 * 3600));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMining, teamBoostCount]);

  const handleStartMining = () => {
    setTapEffect(true);
    setTimeout(() => setTapEffect(false), 300);
    if (!isMining) {
      setIsMining(true);
    }
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Lucky wheel spin
  const handleSpinWheel = () => {
    if (wheelSpinning) return;
    setWheelSpinning(true);
    setWonPrize(null);
    const randomRot = 1440 + Math.floor(Math.random() * 360);
    setWheelRotation((prev) => prev + randomRot);

    setTimeout(() => {
      setWheelSpinning(false);
      const prizes = ['+10 $HGLD', '+50 $HGLD', '+25% Boost', '200 $HGLD JACKPOT!', '+15 $HGLD'];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setWonPrize(prize);
      if (prize.includes('$HGLD')) {
        const num = parseInt(prize.replace(/\D/g, ''), 10) || 10;
        setMinedBalance((prev) => Number((prev + num).toFixed(2)));
      }
    }, 3200);
  };

  // Calculator calculations (10% - 15% Monthly ROI on 30-day fixed term)
  const calculateRigStats = (cost: number) => {
    const monthlyRoiRate = 0.125;
    const total30DayProfit = cost * monthlyRoiRate; // Yield profit
    const dailyUsdtYield = total30DayProfit / 30; // Daily accumulation
    const milestoneTarget = cost * 0.3; // 30% yield milestone target
    const daysToMilestone = Number((milestoneTarget / dailyUsdtYield).toFixed(0));

    return { dailyUsdtYield, total30DayProfit, milestoneTarget, daysToMilestone };
  };

  const rigStats = calculateRigStats(selectedPlanPrice);

  return (
    <section id="demo" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1D2436]">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <span className="text-[#E6C786] text-xs font-bold uppercase tracking-widest font-mono">
          Interactive Web Simulator
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 font-['Syne']">
          Test The HashGrid Engine Live
        </h2>
        <p className="text-slate-400 mt-2.5 text-xs sm:text-base">
          Experience zero-battery 24h tap-to-mine for native $HGLD, or simulate 30-day fixed cloud mining node returns.
        </p>

        {/* Tab switch */}
        <div className="inline-flex p-1 bg-[#121622] border border-[#1D2436] rounded-2xl mt-6 sm:mt-8">
          <button
            onClick={() => setActiveTab('tap-miner')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition duration-150 flex items-center gap-2 cursor-pointer ${
              activeTab === 'tap-miner'
                ? 'bg-gradient-to-r from-[#E6C786] to-[#D4AF37] text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>24h Tap-To-Mine Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition duration-150 flex items-center gap-2 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-[#E6C786] to-[#D4AF37] text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>30-Day Rig Yield Calculator</span>
          </button>
        </div>
      </div>

      {activeTab === 'tap-miner' ? (
        <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Virtual Mobile Screen Simulator */}
          <div className="md:col-span-7 bg-[#121622] border border-[#1D2436] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#1D2436]">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-mono font-semibold text-slate-300">
                  {isMining ? 'CLOUD NODE SYNCHRONIZED' : 'TAP BELOW TO INITIALIZE'}
                </span>
              </div>
              <span className="text-xs font-mono text-[#E6C786]">Genesis Protocol</span>
            </div>

            {/* Mined Balance Display */}
            <div className="text-center my-6">
              <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider font-mono">
                Current $HGLD Balance
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono mt-2 tabular-nums flex items-center justify-center gap-2">
                <span className="text-[#E6C786]">⚡</span>
                <span>{minedBalance.toFixed(4)}</span>
                <span className="text-sm text-[#E6C786] font-sans font-bold">$HGLD</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-2">
                <span>Base Rate: <strong className="text-white">1.0 $HGLD/hr</strong></span>
                <span>·</span>
                <span>Active Boost: <strong className="text-[#10B981]">+{(teamBoostCount * 10)}%</strong></span>
              </div>
            </div>

            {/* Center Elevated Tap Button */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative">
                <div
                  className={`absolute -inset-4 rounded-full bg-gradient-to-r from-[#E6C786] to-[#D4AF37] opacity-25 blur-xl transition-all duration-500 ${
                    isMining ? 'animate-pulse opacity-50' : 'opacity-20'
                  }`}
                />

                <button
                  onClick={handleStartMining}
                  className={`relative w-44 h-44 rounded-full border-4 border-[#E6C786] flex flex-col items-center justify-center text-center p-4 transition-all duration-300 cursor-pointer ${
                    isMining
                      ? 'bg-gradient-to-b from-[#181E2E] to-[#121622] shadow-inner'
                      : 'bg-gradient-to-b from-[#E6C786] via-[#F3DAA2] to-[#D4AF37] text-black shadow-2xl hover:scale-105 active:scale-95'
                  } ${tapEffect ? 'scale-90' : ''}`}
                >
                  <Zap
                    className={`w-12 h-12 mb-1 transition-transform ${
                      isMining ? 'text-[#E6C786] animate-bounce' : 'text-black'
                    }`}
                  />
                  <span className={`text-sm font-extrabold uppercase tracking-wider font-['Syne'] ${isMining ? 'text-white' : 'text-black'}`}>
                    {isMining ? 'Mining Active' : 'Tap to Mine'}
                  </span>
                  <span className={`text-[10px] font-mono mt-1 ${isMining ? 'text-[#E6C786]' : 'text-black/80'}`}>
                    {isMining ? formatTime(secondsRemaining) : '24h Cloud Node'}
                  </span>
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-6 text-center max-w-xs">
                {isMining
                  ? 'Server-side cloud timer running. 0% battery or CPU drain.'
                  : 'Tap once every 24 hours to claim 24.0 free $HGLD utility tokens.'}
              </p>
            </div>

            {/* Team Booster Slider */}
            <div className="pt-4 border-t border-[#1D2436] bg-[#0B0F17]/70 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#E6C786]" /> Team Syndicate Multiplier:
                </span>
                <span className="font-bold text-[#E6C786] font-mono tabular-nums">
                  {teamBoostCount} Friends (+{teamBoostCount * 10}%)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={teamBoostCount}
                onChange={(e) => setTeamBoostCount(Number(e.target.value))}
                className="w-full accent-[#E6C786] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>Solo (0%)</span>
                <span>5 Teammates (+50%)</span>
                <span>10 Teammates (+100%)</span>
              </div>
            </div>
          </div>

          {/* Lucky Spin Wheel Mini-Game Faucet */}
          <div className="md:col-span-5 bg-[#121622] border border-[#1D2436] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#E6C786] uppercase tracking-wider mb-1 font-mono">
                <Trophy className="w-4 h-4" /> Core Reactor & Faucet
              </div>
              <h3 className="text-xl font-extrabold text-white font-['Syne']">
                24-Hour Lucky Spin Wheel
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Spin daily on the HashGrid APK to win bonus $HGLD tokens, instant speed multipliers, and USDT drops.
              </p>
            </div>

            {/* Wheel graphic */}
            <div className="my-6 flex flex-col items-center justify-center relative">
              <div className="z-10 -mb-3 text-[#E6C786] filter drop-shadow">
                ▼
              </div>

              <div
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: wheelSpinning ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
                }}
                className="w-48 h-48 rounded-full border-4 border-[#E6C786] bg-gradient-to-tr from-[#181E2E] via-[#0B0F17] to-[#1D2436] relative overflow-hidden flex items-center justify-center shadow-xl"
              >
                <div className="absolute inset-0 border-t-2 border-[#E6C786]/30" />
                <div className="absolute inset-0 border-r-2 border-[#E6C786]/30" />
                <div className="w-14 h-14 rounded-full bg-[#E6C786] text-black font-extrabold flex items-center justify-center text-xs shadow-lg font-mono">
                  $HGLD
                </div>
              </div>

              {wonPrize && (
                <div className="mt-4 p-2.5 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl text-center text-xs font-bold text-[#10B981] animate-fadeIn">
                  🎉 Congratulations! You won <span className="text-white underline">{wonPrize}</span>!
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleSpinWheel}
                disabled={wheelSpinning}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E6C786] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition disabled:opacity-50 shadow-md font-['Syne'] cursor-pointer"
              >
                {wheelSpinning ? 'Spinning Quantum Reactor...' : 'Test Free Daily Spin'}
              </button>

              <button
                onClick={onOpenDownload}
                className="w-full mt-3 py-2.5 rounded-xl border border-[#1D2436] hover:border-[#E6C786]/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Download App to Claim on Phone</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E6C786]" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Cloud Rig Yield & Capital Milestone Calculator */
        <div className="bg-[#121622] border border-[#1D2436] rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-extrabold text-white font-['Syne']">
              30-Day Term Yield & Capital Milestone Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              All hardware nodes ($10 to $500) operate on 30-day fixed contracts generating 10% – 15% monthly ROI. Daily accrued yields accumulate in real-time and unlock upon completing the 30-day maturity cycle.
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            {[
              { label: 'Starter Rig', cost: 10, power: '10 TH/s' },
              { label: 'Basic Rig', cost: 25, power: '28 TH/s' },
              { label: 'Standard Rig', cost: 50, power: '65 TH/s' },
              { label: 'Pro Node', cost: 100, power: '150 TH/s' },
              { label: 'Enterprise', cost: 500, power: '800 TH/s' },
            ].map((plan) => (
              <button
                key={plan.cost}
                onClick={() => setSelectedPlanPrice(plan.cost)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedPlanPrice === plan.cost
                    ? 'border-[#E6C786] bg-[#E6C786]/10 shadow-lg shadow-[#E6C786]/10'
                    : 'border-[#1D2436] bg-[#0B0F17] hover:border-[#E6C786]/40'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-semibold">{plan.label}</div>
                <div className="text-xl font-extrabold text-white mt-0.5 tabular-nums">${plan.cost}</div>
                <div className="text-[10px] text-[#E6C786] font-mono mt-0.5 font-semibold">{plan.power}</div>
              </button>
            ))}
          </div>

          {/* Slider for custom amount */}
          <div className="p-5 rounded-2xl bg-[#0B0F17] border border-[#1D2436] mb-8">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-semibold text-slate-300">Custom Cloud Capacity Deployment:</span>
              <span className="text-base font-extrabold text-[#E6C786] font-mono tabular-nums">
                ${selectedPlanPrice} USDT
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={selectedPlanPrice}
              onChange={(e) => setSelectedPlanPrice(Number(e.target.value))}
              className="w-full accent-[#E6C786] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>$10 Min</span>
              <span>$100 Pro</span>
              <span>$250 Cluster</span>
              <span>$500 Max Enterprise</span>
            </div>
          </div>

          {/* Real-time Calculation Breakdown Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-[#181E2E]/90 border border-[#1D2436]">
              <div className="text-[11px] text-slate-400 uppercase font-semibold font-mono">Accrued Daily Yield</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tabular-nums font-mono">
                ${rigStats.dailyUsdtYield.toFixed(2)} <span className="text-xs text-slate-400 font-sans">/day</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Accumulates daily in real-time over the 30-day term.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#181E2E]/90 border border-[#E6C786]/50 relative">
              <div className="absolute top-3 right-3 text-[9px] bg-[#E6C786] text-black font-extrabold px-2 py-0.5 rounded-full uppercase">
                30% Target Lock
              </div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold font-mono">Capital Target</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E6C786] mt-1 tabular-nums font-mono">
                ${rigStats.milestoneTarget.toFixed(2)} <span className="text-xs text-slate-400 font-sans">USDT</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-2">
                Capital releases once 30% yield target is achieved.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#181E2E]/90 border border-[#1D2436]">
              <div className="text-[11px] text-slate-400 uppercase font-semibold font-mono">30-Day Maturity Yield</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981] mt-1 tabular-nums font-mono">
                ${rigStats.total30DayProfit.toFixed(2)} <span className="text-xs text-slate-400 font-sans">USDT</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Unlocks upon completing 30-day cycle (10%–15% ROI).
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onOpenDownload}
              className="bg-gradient-to-r from-[#E6C786] to-[#D4AF37] text-black font-extrabold px-8 py-3.5 rounded-xl text-xs sm:text-sm hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#E6C786]/20 font-['Syne'] cursor-pointer"
            >
              Deploy ${selectedPlanPrice} USDT Rig on Official APK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
