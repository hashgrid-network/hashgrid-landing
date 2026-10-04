import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, CheckCircle2, Copy, Check, Lock, ArrowUpRight } from 'lucide-react';

interface NetworkBroadcast {
  id: string;
  type: 'activation' | 'milestone' | 'maturity' | 'start';
  msg: string;
  time: string;
  tag: string;
}

export const LiveNetworkFeed: React.FC = () => {
  const [copiedBsc, setCopiedBsc] = useState(false);
  const [copiedTron, setCopiedTron] = useState(false);

  const bscAddress = '0x1fAcE21fc7cA33abb4B37fba82280266C12D9c09';
  const tronAddress = 'TJj7G3U8qVSzqcJaxAhQG34ADHihnR6WuD';

  const initialBroadcasts: NetworkBroadcast[] = [
    {
      id: '1',
      type: 'maturity',
      msg: 'Node #8942 completed 30-Day Maturity — 12.50 USDT yield released to wallet 0x7f4b...389c',
      time: '8s ago',
      tag: '30-Day Release',
    },
    {
      id: '2',
      type: 'activation',
      msg: 'Pro Cluster (150 TH/s) activated by investor 0x3d...90a — 30-Day term initiated',
      time: '24s ago',
      tag: 'Rig Activated',
    },
    {
      id: '3',
      type: 'milestone',
      msg: 'Wallet 0xfe...12b achieved 30% milestone target ($30.00) — Capital unlock protocol active',
      time: '41s ago',
      tag: '30% Milestone',
    },
    {
      id: '4',
      type: 'start',
      msg: 'Daily 24h Genesis session started by @krypton — 24.0 $HGLD tap-to-mine synchronized',
      time: '1m ago',
      tag: 'Session Active',
    },
  ];

  const [broadcasts, setBroadcasts] = useState<NetworkBroadcast[]>(initialBroadcasts);

  useEffect(() => {
    const templates = [
      {
        type: 'maturity' as const,
        generate: () => {
          const hex = Math.random().toString(16).substring(2, 6);
          const roi = (10 + Math.random() * 5).toFixed(1);
          return {
            msg: `Node #${Math.floor(1000 + Math.random() * 8900)} completed 30-day cycle (${roi}% ROI) — Yield unlocked for 0x${hex}...`,
            tag: '30-Day Release',
          };
        },
      },
      {
        type: 'activation' as const,
        generate: () => {
          const tiers = ['Starter Rig ($10)', 'Basic Rig ($25)', 'Standard Rig ($50)', 'Pro Node ($100)', 'Enterprise Cluster ($500)'];
          const tier = tiers[Math.floor(Math.random() * tiers.length)];
          const hex = Math.random().toString(16).substring(2, 6);
          return {
            msg: `${tier} deployed by 0x${hex}... — 30-Day fixed contract locked`,
            tag: 'Node Activated',
          };
        },
      },
      {
        type: 'milestone' as const,
        generate: () => {
          const target = [3, 7.5, 15, 30, 150][Math.floor(Math.random() * 5)];
          const hex = Math.random().toString(16).substring(2, 6);
          return {
            msg: `Wallet 0x${hex}... reached 30% yield milestone target ($${target}.00 USDT)`,
            tag: '30% Milestone',
          };
        },
      },
      {
        type: 'start' as const,
        generate: () => {
          const hex = Math.random().toString(16).substring(2, 6);
          return {
            msg: `24h zero-battery session initiated by user 0x${hex}... (+24.0 $HGLD)`,
            tag: 'Session Active',
          };
        },
      },
    ];

    const interval = setInterval(() => {
      const selected = templates[Math.floor(Math.random() * templates.length)];
      const data = selected.generate();
      setBroadcasts((prev) => [
        {
          id: Date.now().toString(),
          type: selected.type,
          msg: data.msg,
          time: 'Just now',
          tag: data.tag,
        },
        ...prev.slice(0, 4),
      ]);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const copyAddress = (address: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0B0F17] border-y border-[#1D2436] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Live Broadcast Feed Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-200 font-mono flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#E6C786]" />
              Live Network Telemetry & Broadcasts
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              {broadcasts.map((item) => (
                <div
                  key={item.id}
                  className="inline-flex items-center gap-2.5 shrink-0 text-xs font-mono text-slate-200 bg-[#121622] px-3.5 py-2 rounded-xl border border-[#1D2436] shadow-sm"
                >
                  <span className="text-[#E6C786]">⚡</span>
                  <span className="text-[10px] font-extrabold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
                    {item.tag}
                  </span>
                  <span className="text-slate-300 font-medium">{item.msg}</span>
                  <span className="text-slate-500 text-[10px]">({item.time})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Official Locked Deposit Addresses Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#121622] border border-[#E6C786]/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#E6C786]/10 text-[#E6C786] flex items-center justify-center font-bold border border-[#E6C786]/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-['Syne']">
                <span>Official Locked Deposit Vault Addresses</span>
                <span className="text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded border border-[#10B981]/30">
                  Instant Auto-Credited
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                On-chain deposits are automatically processed and credited to active node contracts 24/7.
              </p>
            </div>
          </div>

          {/* Deposit Address Chips */}
          <div className="grid sm:grid-cols-2 gap-3 w-full md:w-auto">
            {/* BEP-20 (BSC) */}
            <div className="p-2.5 rounded-xl bg-[#0B0F17] border border-[#1D2436] flex items-center justify-between gap-3 text-xs font-mono">
              <div className="truncate">
                <span className="text-[#E6C786] font-bold text-[10px] block">USDT BEP-20 (BSC)</span>
                <span className="text-slate-300 text-[11px] font-semibold">{bscAddress.substring(0, 10)}...{bscAddress.substring(bscAddress.length - 8)}</span>
              </div>
              <button
                onClick={() => copyAddress(bscAddress, setCopiedBsc)}
                className="p-1.5 rounded-lg bg-[#181E2E] hover:bg-[#1D2436] text-slate-300 hover:text-white transition shrink-0 cursor-pointer"
                title="Copy BEP-20 Address"
              >
                {copiedBsc ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5 text-[#E6C786]" />}
              </button>
            </div>

            {/* TRC-20 (TRON) */}
            <div className="p-2.5 rounded-xl bg-[#0B0F17] border border-[#1D2436] flex items-center justify-between gap-3 text-xs font-mono">
              <div className="truncate">
                <span className="text-[#E6C786] font-bold text-[10px] block">USDT TRC-20 (TRON)</span>
                <span className="text-slate-300 text-[11px] font-semibold">{tronAddress.substring(0, 8)}...{tronAddress.substring(tronAddress.length - 6)}</span>
              </div>
              <button
                onClick={() => copyAddress(tronAddress, setCopiedTron)}
                className="p-1.5 rounded-lg bg-[#181E2E] hover:bg-[#1D2436] text-slate-300 hover:text-white transition shrink-0 cursor-pointer"
                title="Copy TRC-20 Address"
              >
                {copiedTron ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5 text-[#E6C786]" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
