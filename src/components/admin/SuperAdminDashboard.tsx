import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldAlert,
  X,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Send,
  Zap,
  Gift,
  Coins,
  Search,
  RefreshCw,
  LogOut,
  Database,
  ExternalLink,
  Sliders,
  DollarSign,
  Activity,
  Layers,
  Copy,
  Check,
  Cpu
} from 'lucide-react';
import {
  WithdrawalDoc,
  DepositDoc,
  WalletUserDoc,
  subscribePendingWithdrawals,
  subscribePendingDeposits,
  subscribeAllUsers,
  approveWithdrawal,
  rejectWithdrawal,
  approveDeposit,
  rejectDeposit,
  injectFunds,
  dispenseReward,
  searchUserByWalletId,
  getGlobalSystemTelemetry,
  getFirebaseStatus,
  setCustomFirebaseConfig,
  getStoredFirebaseConfig,
  BalanceDestination,
  RewardType
} from '../../services/firebase';

interface SuperAdminDashboardProps {
  onClose: () => void;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'inject' | 'rewards' | 'deposits' | 'explorer'>('withdrawals');

  // Real-time Data States
  const [pendingWithdrawals, setPendingWithdrawals] = useState<WithdrawalDoc[]>([]);
  const [pendingDeposits, setPendingDeposits] = useState<DepositDoc[]>([]);
  const [allUsers, setAllUsers] = useState<WalletUserDoc[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Per-withdrawal TxID inputs & processing states
  const [txidMap, setTxidMap] = useState<Record<string, string>>({});
  const [rejectReasonMap, setRejectReasonMap] = useState<Record<string, string>>({});
  const [actionProcessing, setActionProcessing] = useState<Record<string, boolean>>({});

  // Tab 2: Inject Funds State
  const [injectWalletId, setInjectWalletId] = useState('');
  const [injectDest, setInjectDest] = useState<BalanceDestination>('usdt_balance');
  const [injectAmount, setInjectAmount] = useState<string>('50');
  const [injectLoading, setInjectLoading] = useState(false);

  // Tab 3: Rewards State
  const [rewardWalletId, setRewardWalletId] = useState('');
  const [rewardType, setRewardType] = useState<RewardType>('hashrate_boost');
  const [rewardAmount, setRewardAmount] = useState<string>('500');
  const [rewardLoading, setRewardLoading] = useState(false);

  // Tab 5: User Explorer Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<WalletUserDoc | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Firebase Config Modal State
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customConfigText, setCustomConfigText] = useState('');

  // Toast feedback state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // UTC clock ticker
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => setUtcTime(new Date().toUTCString().replace('GMT', 'UTC'));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev.slice(-3), { id, type, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Subscribe to real-time collections
  useEffect(() => {
    setIsDataLoading(true);
    let unsubWd: (() => void) | undefined;
    let unsubDep: (() => void) | undefined;
    let unsubUsers: (() => void) | undefined;

    try {
      unsubWd = subscribePendingWithdrawals(
        list => {
          setPendingWithdrawals(list);
          setIsDataLoading(false);
        },
        err => addToast('info', 'Realtime Sync Note', 'Listening to local synchronized state cache.')
      );

      unsubDep = subscribePendingDeposits(
        list => setPendingDeposits(list),
        err => console.warn('Deposit sub warning:', err)
      );

      unsubUsers = subscribeAllUsers(
        users => {
          setAllUsers(users);
          if (users.length > 0 && !selectedUser) {
            setSelectedUser(users[0]);
          }
        },
        err => console.warn('Users sub warning:', err)
      );
    } catch (e) {
      console.warn('Realtime subscription error:', e);
      setIsDataLoading(false);
    }

    return () => {
      if (unsubWd) unsubWd();
      if (unsubDep) unsubDep();
      if (unsubUsers) unsubUsers();
    };
  }, []);

  // Global Telemetry counters
  const telemetry = useMemo(() => {
    return getGlobalSystemTelemetry(allUsers, pendingWithdrawals, pendingDeposits);
  }, [allUsers, pendingWithdrawals, pendingDeposits]);

  const firebaseStatus = getFirebaseStatus();

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ----------------------------------------------------------------------
  // TAB 1 ACTIONS: WITHDRAWALS
  // ----------------------------------------------------------------------
  const handleApproveWd = async (wd: WithdrawalDoc) => {
    const txid = txidMap[wd.id] || '';
    if (!txid.trim()) {
      addToast('error', 'Missing TxID', 'Please enter the blockchain transaction hash before dispatching.');
      return;
    }

    setActionProcessing(prev => ({ ...prev, [wd.id]: true }));
    try {
      const res = await approveWithdrawal(wd.id, wd.wallet_id, txid);
      addToast('success', 'Withdrawal Dispatched', res.message);
      setTxidMap(prev => {
        const next = { ...prev };
        delete next[wd.id];
        return next;
      });
    } catch (err: any) {
      addToast('error', 'Dispatch Failed', err.message || 'Operation failed');
    } finally {
      setActionProcessing(prev => ({ ...prev, [wd.id]: false }));
    }
  };

  const handleRejectWd = async (wd: WithdrawalDoc) => {
    const reason = rejectReasonMap[wd.id] || 'Security audit flag / Destination mismatch';
    setActionProcessing(prev => ({ ...prev, [wd.id]: true }));
    try {
      const res = await rejectWithdrawal(wd.id, wd.wallet_id, wd.amount, reason);
      addToast('info', 'Withdrawal Rejected & Refunded', res.message);
      setRejectReasonMap(prev => {
        const next = { ...prev };
        delete next[wd.id];
        return next;
      });
    } catch (err: any) {
      addToast('error', 'Rejection Error', err.message || 'Failed to reject');
    } finally {
      setActionProcessing(prev => ({ ...prev, [wd.id]: false }));
    }
  };

  // ----------------------------------------------------------------------
  // TAB 2 ACTIONS: BALANCE INJECTOR
  // ----------------------------------------------------------------------
  const handleInjectFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!injectWalletId.trim()) {
      addToast('error', 'Wallet Required', 'Please select or type a target Wallet ID');
      return;
    }
    const amt = parseFloat(injectAmount);
    if (isNaN(amt) || amt <= 0) {
      addToast('error', 'Invalid Amount', 'Please enter a valid USDT amount');
      return;
    }

    setInjectLoading(true);
    try {
      const res = await injectFunds(injectWalletId, injectDest, amt);
      addToast('success', 'USDT Injected Atomically', res.message);
      setInjectAmount('50');
    } catch (err: any) {
      addToast('error', 'Injection Failed', err.message);
    } finally {
      setInjectLoading(false);
    }
  };

  // ----------------------------------------------------------------------
  // TAB 3 ACTIONS: REWARDS DISPENSER
  // ----------------------------------------------------------------------
  const handleDispenseReward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardWalletId.trim()) {
      addToast('error', 'Wallet Required', 'Please enter a target Wallet ID');
      return;
    }
    const amt = parseFloat(rewardAmount);
    if (isNaN(amt) || amt <= 0) {
      addToast('error', 'Invalid Amount', 'Please enter a valid numerical quantity');
      return;
    }

    setRewardLoading(true);
    try {
      const res = await dispenseReward(rewardWalletId, rewardType, amt);
      addToast('success', 'Reward Dispatched', res.message);
    } catch (err: any) {
      addToast('error', 'Reward Failed', err.message);
    } finally {
      setRewardLoading(false);
    }
  };

  // ----------------------------------------------------------------------
  // TAB 4 ACTIONS: DEPOSITS
  // ----------------------------------------------------------------------
  const handleApproveDeposit = async (dep: DepositDoc) => {
    setActionProcessing(prev => ({ ...prev, [dep.id]: true }));
    try {
      const res = await approveDeposit(dep.id, dep.wallet_id, dep.amount);
      addToast('success', 'Deposit Credited', res.message);
    } catch (err: any) {
      addToast('error', 'Approval Error', err.message);
    } finally {
      setActionProcessing(prev => ({ ...prev, [dep.id]: false }));
    }
  };

  const handleRejectDeposit = async (dep: DepositDoc) => {
    setActionProcessing(prev => ({ ...prev, [dep.id]: true }));
    try {
      const res = await rejectDeposit(dep.id, 'Invalid On-Chain TxID / Unconfirmed');
      addToast('info', 'Deposit Rejected', res.message);
    } catch (err: any) {
      addToast('error', 'Rejection Error', err.message);
    } finally {
      setActionProcessing(prev => ({ ...prev, [dep.id]: false }));
    }
  };

  // ----------------------------------------------------------------------
  // TAB 5 ACTIONS: USER EXPLORER
  // ----------------------------------------------------------------------
  const handleSearchUser = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      const res = await searchUserByWalletId(searchQuery.trim());
      if (res) {
        setSelectedUser(res);
        addToast('success', 'User Located', `Ledger record for ${res.wallet_id} active.`);
      } else {
        addToast('error', 'Not Found', `No user found with wallet ID ${searchQuery}`);
      }
    } catch (err: any) {
      addToast('error', 'Search Error', err.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hg_super_admin_auth');
    sessionStorage.removeItem('hg_admin_user');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07090E] text-slate-200 overflow-y-auto flex flex-col font-sans selection:bg-[#00F5A0] selection:text-black">
      
      {/* Toast Overlay */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 flex items-start gap-3 ${
              t.type === 'success'
                ? 'bg-[#0B1A14]/95 border-[#00F5A0]/60 text-emerald-300'
                : t.type === 'error'
                ? 'bg-[#1C0D11]/95 border-red-500/60 text-red-300'
                : 'bg-[#0F141F]/95 border-[#00D2FF]/60 text-cyan-300'
            }`}
          >
            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-current animate-ping" />
            <div className="flex-1">
              <div className="font-bold text-xs uppercase tracking-wider font-mono">{t.title}</div>
              <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{t.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* TOP COMMAND HEADER */}
      <header className="sticky top-0 z-40 bg-[#090D16]/95 backdrop-blur-xl border-b border-[#1C2436] px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5A0] to-[#00D2FF] flex items-center justify-center text-black font-black text-xl shadow-lg shadow-[#00F5A0]/30 shrink-0">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-white font-['Syne'] tracking-wide">
                  HASH<span className="text-[#00F5A0]">GRID</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 font-mono text-[10px] font-extrabold uppercase tracking-wider">
                  GOD-MODE DESK
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                <span className="text-[#00F5A0] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] animate-ping" />
                  REAL-TIME SNAPSHOT SYNC
                </span>
                <span>•</span>
                <span className="text-slate-300">{utcTime || 'UTC CLOCK'}</span>
              </div>
            </div>
          </div>

          {/* Center Connection Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#05080E] border border-[#1C2436] text-xs font-mono">
            <Database className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span className="text-slate-400">Ledger:</span>
            <span className="text-[#00F5A0] font-bold">
              {firebaseStatus.isLiveCloud ? `Live Cloud (${firebaseStatus.projectId})` : 'Reactive Firestore Bus (Active)'}
            </span>
            <button
              onClick={() => setShowConfigModal(true)}
              className="ml-1 text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
            >
              Config
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsDataLoading(true);
                setTimeout(() => setIsDataLoading(false), 500);
                addToast('info', 'Ledger Refreshed', 'Real-time snapshot streams re-synchronized.');
              }}
              className="px-3 py-2 rounded-xl bg-[#0F141F] border border-[#1C2436] hover:border-[#00F5A0]/40 text-slate-300 hover:text-[#00F5A0] text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
              title="Force re-sync snapshot"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDataLoading ? 'animate-spin text-[#00F5A0]' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Desk</span>
            </button>
          </div>

        </div>
      </header>

      {/* QUICK TELEMETRY STRIP */}
      <section className="bg-[#05080E] border-b border-[#1C2436] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#0A0E17] border border-[#1C2436]">
            <span className="text-[10px] text-slate-400 uppercase">Pending Withdrawals</span>
            <div className="text-base sm:text-lg font-black text-white mt-0.5 flex items-center gap-2">
              <span className="text-[#00D2FF]">{pendingWithdrawals.length}</span>
              <span className="text-[10px] text-slate-500 font-normal">(${(pendingWithdrawals.reduce((a, b) => a + b.amount, 0)).toFixed(2)} USDT)</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0A0E17] border border-[#1C2436]">
            <span className="text-[10px] text-slate-400 uppercase">Pending Deposits</span>
            <div className="text-base sm:text-lg font-black text-white mt-0.5 flex items-center gap-2">
              <span className="text-[#00F5A0]">{pendingDeposits.length}</span>
              <span className="text-[10px] text-slate-500 font-normal">(${(pendingDeposits.reduce((a, b) => a + b.amount, 0)).toFixed(2)} USDT)</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0A0E17] border border-[#1C2436]">
            <span className="text-[10px] text-slate-400 uppercase">Live Global Hashrate</span>
            <div className="text-base sm:text-lg font-black text-white mt-0.5">
              {telemetry.totalLiveHashrate.toFixed(1)} <span className="text-xs text-[#00F5A0]">GH/s</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#0A0E17] border border-[#1C2436]">
            <span className="text-[10px] text-slate-400 uppercase">Total Settled Payouts</span>
            <div className="text-base sm:text-lg font-black text-[#00F5A0] mt-0.5">
              ${telemetry.totalPayoutsDispatched.toLocaleString()} <span className="text-[10px] text-slate-400">USDT</span>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS */}
      <section className="bg-[#090D16] border-b border-[#1C2436] px-4 sm:px-6 lg:px-8 sticky top-[69px] z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
          
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'withdrawals'
                ? 'bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black shadow-lg shadow-[#00F5A0]/20'
                : 'bg-[#0F141F] text-slate-300 hover:text-white border border-[#1C2436] hover:border-[#00F5A0]/40'
            }`}
          >
            <span>💸 Tab 1: Dispatch Desk</span>
            {pendingWithdrawals.length > 0 && (
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === 'withdrawals' ? 'bg-black text-[#00F5A0]' : 'bg-[#00D2FF]/20 text-[#00D2FF]'
              }`}>
                {pendingWithdrawals.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inject')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'inject'
                ? 'bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black shadow-lg shadow-[#00F5A0]/20'
                : 'bg-[#0F141F] text-slate-300 hover:text-white border border-[#1C2436] hover:border-[#00F5A0]/40'
            }`}
          >
            <span>⚡ Tab 2: Balance Injector</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'rewards'
                ? 'bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black shadow-lg shadow-[#00F5A0]/20'
                : 'bg-[#0F141F] text-slate-300 hover:text-white border border-[#1C2436] hover:border-[#00F5A0]/40'
            }`}
          >
            <span>🎁 Tab 3: Reward Dispenser</span>
          </button>

          <button
            onClick={() => setActiveTab('deposits')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'deposits'
                ? 'bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black shadow-lg shadow-[#00F5A0]/20'
                : 'bg-[#0F141F] text-slate-300 hover:text-white border border-[#1C2436] hover:border-[#00F5A0]/40'
            }`}
          >
            <span>📥 Tab 4: Deposit Console</span>
            {pendingDeposits.length > 0 && (
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === 'deposits' ? 'bg-black text-[#00F5A0]' : 'bg-[#00F5A0]/20 text-[#00F5A0]'
              }`}>
                {pendingDeposits.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'explorer'
                ? 'bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black shadow-lg shadow-[#00F5A0]/20'
                : 'bg-[#0F141F] text-slate-300 hover:text-white border border-[#1C2436] hover:border-[#00F5A0]/40'
            }`}
          >
            <span>🌐 Tab 5: User Explorer</span>
          </button>

        </div>
      </section>

      {/* MAIN TAB CONTENT WORKSPACE */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        
        {/* ============================================================== */}
        {/* TAB 1: LIVE WITHDRAWAL AUDIT & DISPATCH DESK (CRITICAL)       */}
        {/* ============================================================== */}
        {activeTab === 'withdrawals' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Syne'] flex items-center gap-2">
                  <span>Live Withdrawal Audit & Dispatch Desk</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] animate-ping" />
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Real-time pending cashout pipeline. Entering TxID and approving updates on-chain status atomically.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Queue:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0F141F] border border-[#1C2436] text-[#00F5A0] font-bold">
                  {pendingWithdrawals.length} Pending Requests
                </span>
              </div>
            </div>

            {pendingWithdrawals.length === 0 ? (
              <div className="rounded-3xl bg-[#090D16] border border-[#1C2436] p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-[#00F5A0] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Syne']">Withdrawal Queue Clear</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto font-mono">
                  All user withdrawal submissions have been processed and dispatched. New mobile requests will stream here via real-time Firestore listeners.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingWithdrawals.map(wd => {
                  const isProcessing = actionProcessing[wd.id];
                  const currentTxid = txidMap[wd.id] || '';
                  const currentReason = rejectReasonMap[wd.id] || '';

                  return (
                    <div
                      key={wd.id}
                      className="rounded-2xl bg-[#090D16] border border-[#1C2436] hover:border-[#00D2FF]/40 p-5 shadow-xl transition space-y-4"
                    >
                      {/* Top Info Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-[#1C2436] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded bg-[#00D2FF]/15 text-[#00D2FF] font-bold border border-[#00D2FF]/30">
                            {wd.network}
                          </span>
                          <span className="text-white font-bold text-sm">
                            {wd.wallet_id}
                          </span>
                          <span className="text-slate-500">ID: {wd.id}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">Created:</span>
                          <span className="text-slate-200">
                            {typeof wd.created_at === 'string'
                              ? new Date(wd.created_at).toLocaleTimeString()
                              : 'Live UTC'}
                          </span>
                        </div>
                      </div>

                      {/* Details & Destination */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 rounded-xl bg-[#05080E] border border-[#1C2436]">
                          <span className="text-[10px] text-slate-400 uppercase font-mono">Amount Requested</span>
                          <div className="text-2xl font-black text-white font-mono mt-0.5">
                            ${wd.amount.toFixed(2)} <span className="text-xs text-[#00F5A0] font-bold">USDT</span>
                          </div>
                        </div>

                        <div className="md:col-span-2 p-3 rounded-xl bg-[#05080E] border border-[#1C2436] flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 uppercase font-mono">Destination Address ({wd.network})</span>
                            <button
                              onClick={() => handleCopy(wd.destination_address, wd.id)}
                              className="text-[10px] font-mono text-[#00D2FF] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              {copiedKey === wd.id ? <Check className="w-3 h-3 text-[#00F5A0]" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedKey === wd.id ? 'Copied!' : 'Copy Address'}</span>
                            </button>
                          </div>
                          <div className="text-xs font-mono text-emerald-300 break-all select-all mt-1">
                            {wd.destination_address}
                          </div>
                        </div>
                      </div>

                      {/* Action Inputs Bar */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-2">
                        {/* TxID Input Box */}
                        <div className="lg:col-span-6">
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                            Blockchain Transaction Hash (TxID)
                          </label>
                          <input
                            type="text"
                            value={currentTxid}
                            onChange={e => setTxidMap({ ...txidMap, [wd.id]: e.target.value })}
                            placeholder="Enter 64-char blockchain TxID..."
                            className="w-full bg-[#05080E] border border-[#1C2436] focus:border-[#00F5A0] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                          />
                        </div>

                        {/* Rejection Reason Input */}
                        <div className="lg:col-span-3">
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                            Rejection Note (if rejecting)
                          </label>
                          <input
                            type="text"
                            value={currentReason}
                            onChange={e => setRejectReasonMap({ ...rejectReasonMap, [wd.id]: e.target.value })}
                            placeholder="e.g. Invalid address"
                            className="w-full bg-[#05080E] border border-[#1C2436] focus:border-red-500 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                          />
                        </div>

                        {/* Approve and Reject Buttons */}
                        <div className="lg:col-span-3 flex items-end gap-2">
                          <button
                            onClick={() => handleApproveWd(wd)}
                            disabled={isProcessing}
                            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black font-extrabold text-xs uppercase tracking-wider font-['Syne'] shadow-md hover:brightness-110 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            {isProcessing ? (
                              <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleRejectWd(wd)}
                            disabled={isProcessing}
                            className="py-2.5 px-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 hover:bg-red-500/25 text-xs uppercase tracking-wider font-mono font-bold transition cursor-pointer"
                          >
                            Reject & Refund
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: ARBITRARY BALANCE INJECTOR (GOD-MODE USDT)              */}
        {/* ============================================================== */}
        {activeTab === 'inject' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Syne'] flex items-center gap-2">
                <span>Arbitrary Balance Injector (God-Mode USDT)</span>
                <span className="text-[#00F5A0]">⚡</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Direct balance override using Firestore FieldValue.increment. Adds full audit trail to the user ledger.
              </p>
            </div>

            <div className="rounded-3xl bg-[#090D16] border border-[#1C2436] p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleInjectFunds} className="space-y-5">
                
                {/* User Wallet ID Selector with Auto-Suggest */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1.5 uppercase">
                    Target User Wallet ID
                  </label>
                  <input
                    type="text"
                    value={injectWalletId}
                    onChange={e => setInjectWalletId(e.target.value.toUpperCase())}
                    placeholder="e.g. HG-9F2B96262B4D"
                    required
                    className="w-full bg-[#05080E] border border-[#1C2436] focus:border-[#00F5A0] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none font-mono"
                  />
                  {/* Quick-pick wallet pills */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] font-mono text-slate-500">Registered:</span>
                    {allUsers.slice(0, 4).map(u => (
                      <button
                        key={u.wallet_id}
                        type="button"
                        onClick={() => setInjectWalletId(u.wallet_id)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0F141F] border border-[#1C2436] hover:border-[#00F5A0] text-slate-300 cursor-pointer"
                      >
                        {u.wallet_id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination Selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1.5 uppercase">
                    Balance Destination Selector
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setInjectDest('usdt_balance')}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        injectDest === 'usdt_balance'
                          ? 'bg-[#0F192B] border-[#00F5A0] text-[#00F5A0] shadow-md shadow-[#00F5A0]/10'
                          : 'bg-[#05080E] border-[#1C2436] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">usdt_balance</span>
                      <span className="text-[10px] text-slate-400 mt-1">Main Operating Balance</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInjectDest('withdrawable_balance')}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        injectDest === 'withdrawable_balance'
                          ? 'bg-[#0F192B] border-[#00D2FF] text-[#00D2FF] shadow-md shadow-[#00D2FF]/10'
                          : 'bg-[#05080E] border-[#1C2436] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">withdrawable_balance</span>
                      <span className="text-[10px] text-slate-400 mt-1">Direct Cashout Wallet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInjectDest('mined_balance')}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        injectDest === 'mined_balance'
                          ? 'bg-[#0F192B] border-emerald-400 text-emerald-300 shadow-md'
                          : 'bg-[#05080E] border-[#1C2436] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">mined_balance</span>
                      <span className="text-[10px] text-slate-400 mt-1">Cloud Mining Pool Yield</span>
                    </button>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1.5 uppercase">
                    Injection Amount ($ USDT)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-slate-500 font-mono">$</span>
                    <input
                      type="number"
                      step="any"
                      min="0.1"
                      value={injectAmount}
                      onChange={e => setInjectAmount(e.target.value)}
                      required
                      placeholder="100.00"
                      className="w-full bg-[#05080E] border border-[#1C2436] focus:border-[#00F5A0] rounded-xl pl-8 pr-4 py-3 text-lg font-bold text-white placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>

                  {/* Preset amounts */}
                  <div className="flex items-center gap-2 mt-2">
                    {[10, 50, 100, 500, 1000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInjectAmount(val.toString())}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-[#05080E] border border-[#1C2436] hover:border-[#00F5A0] text-slate-300 cursor-pointer"
                      >
                        +${val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={injectLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black font-black text-sm uppercase tracking-wider font-['Syne'] shadow-lg shadow-[#00F5A0]/25 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    {injectLoading ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>⚡ Inject Funds Immediately</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CUSTOM REWARD & SPEED DISPENSER                         */}
        {/* ============================================================== */}
        {activeTab === 'rewards' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Syne'] flex items-center gap-2">
                <span>Custom Reward & Speed Dispenser</span>
                <span className="text-[#00D2FF]">🎁</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Grant mining boost power, grid points, or promotional cash prizes directly to any node operator.
              </p>
            </div>

            <div className="rounded-3xl bg-[#090D16] border border-[#1C2436] p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleDispenseReward} className="space-y-5">
                
                {/* Target User */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1.5 uppercase">
                    Target User Wallet ID
                  </label>
                  <input
                    type="text"
                    value={rewardWalletId}
                    onChange={e => setRewardWalletId(e.target.value.toUpperCase())}
                    placeholder="e.g. HG-7A419F02C18E"
                    required
                    className="w-full bg-[#05080E] border border-[#1C2436] focus:border-[#00D2FF] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none font-mono"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] font-mono text-slate-500">Quick-Pick:</span>
                    {allUsers.slice(0, 4).map(u => (
                      <button
                        key={u.wallet_id}
                        type="button"
                        onClick={() => setRewardWalletId(u.wallet_id)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0F141F] border border-[#1C2436] hover:border-[#00D2FF] text-slate-300 cursor-pointer"
                      >
                        {u.wallet_id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reward Type Selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1.5 uppercase">
                    Reward Incentive Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => { setRewardType('hashrate_boost'); setRewardAmount('500'); }}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        rewardType === 'hashrate_boost'
                          ? 'bg-[#0F192B] border-[#00F5A0] text-[#00F5A0] shadow-md'
                          : 'bg-[#05080E] border-[#1C2436] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Cpu className="w-4 h-4 mb-2" />
                      <span className="text-xs font-mono font-bold">Mining Hashrate Boost</span>
                      <span className="text-[10px] text-slate-400 mt-1">+GH/s Hash Power</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setRewardType('grid_coin'); setRewardAmount('1000'); }}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        rewardType === 'grid_coin'
                          ? 'bg-[#0F192B] border-[#00D2FF] text-[#00D2FF] shadow-md'
                          : 'bg-[#05080E] border-[#1C2436] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Coins className="w-4 h-4 mb-2" />
                      <span className="text-xs font-mono font-bold">Grid Coin (GRID)</span>
                      <span className="text-[10px] text-slate-400 mt-1">Ecosystem Points</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setRewardType('cash_bounty'); setRewardAmount('25'); }}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        rewardType === 'cash_bounty'
                          ? 'bg-[#0F192B] border-emerald-400 text-emerald-300 shadow-md'
                          : 'bg-[#05080E] border-[#1C2436] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Gift className="w-4 h-4 mb-2" />
                      <span className="text-xs font-mono font-bold">Cash Bonus Bounty</span>
                      <span className="text-[10px] text-slate-400 mt-1">USDT Cash Incentive</span>
                    </button>
                  </div>
                </div>

                {/* Amount / Boost units */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1.5 uppercase">
                    {rewardType === 'hashrate_boost'
                      ? 'Hashrate Boost (GH/s Power)'
                      : rewardType === 'grid_coin'
                      ? 'Grid Points Quantity'
                      : 'Cash Bounty ($ USDT)'}
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="1"
                    value={rewardAmount}
                    onChange={e => setRewardAmount(e.target.value)}
                    required
                    className="w-full bg-[#05080E] border border-[#1C2436] focus:border-[#00D2FF] rounded-xl px-4 py-3 text-lg font-bold text-white placeholder-slate-600 focus:outline-none font-mono"
                  />

                  {/* Preset helpers */}
                  <div className="flex items-center gap-2 mt-2">
                    {rewardType === 'hashrate_boost' ? (
                      [100, 300, 500, 1000, 2500].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setRewardAmount(val.toString())}
                          className="text-xs font-mono px-3 py-1 rounded-lg bg-[#05080E] border border-[#1C2436] hover:border-[#00F5A0] text-slate-300 cursor-pointer"
                        >
                          +{val} GH/s
                        </button>
                      ))
                    ) : (
                      [50, 100, 500, 1000].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setRewardAmount(val.toString())}
                          className="text-xs font-mono px-3 py-1 rounded-lg bg-[#05080E] border border-[#1C2436] hover:border-[#00D2FF] text-slate-300 cursor-pointer"
                        >
                          +{val}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={rewardLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#00F5A0] text-black font-black text-sm uppercase tracking-wider font-['Syne'] shadow-lg shadow-[#00D2FF]/25 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    {rewardLoading ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Gift className="w-4 h-4" />
                        <span>🎁 Dispatch Reward</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: DEPOSIT APPROVAL CONSOLE                                */}
        {/* ============================================================== */}
        {activeTab === 'deposits' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Syne'] flex items-center gap-2">
                  <span>Deposit Approval Console</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] animate-ping" />
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Live user recharge claims. One-click approval credits the claimed USDT amount directly to user usdt_balance.
                </p>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-[#0F141F] border border-[#1C2436] text-[#00F5A0] font-mono text-xs font-bold">
                {pendingDeposits.length} Unconfirmed Submissions
              </span>
            </div>

            {pendingDeposits.length === 0 ? (
              <div className="rounded-3xl bg-[#090D16] border border-[#1C2436] p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-[#00F5A0] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Syne']">No Pending Deposits</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto font-mono">
                  All recharge submissions have been reviewed and credited. Incoming transfers will register in real-time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingDeposits.map(dep => {
                  const isProcessing = actionProcessing[dep.id];

                  return (
                    <div
                      key={dep.id}
                      className="rounded-2xl bg-[#090D16] border border-[#1C2436] hover:border-[#00F5A0]/40 p-5 shadow-xl transition space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-[#1C2436] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-[#00F5A0] font-bold border border-emerald-500/30">
                            {dep.network}
                          </span>
                          <span className="text-white font-bold text-sm">
                            {dep.wallet_id}
                          </span>
                          <span className="text-slate-500">Claim ID: {dep.id}</span>
                        </div>

                        <div className="text-slate-400">
                          {typeof dep.created_at === 'string' ? new Date(dep.created_at).toLocaleTimeString() : 'Live'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 rounded-xl bg-[#05080E] border border-[#1C2436]">
                          <span className="text-[10px] text-slate-400 uppercase font-mono">Claimed Amount</span>
                          <div className="text-2xl font-black text-white font-mono mt-0.5">
                            ${dep.amount.toFixed(2)} <span className="text-xs text-[#00F5A0] font-bold">USDT</span>
                          </div>
                        </div>

                        <div className="md:col-span-2 p-3 rounded-xl bg-[#05080E] border border-[#1C2436] flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 uppercase font-mono">Reported User TxID</span>
                            <button
                              onClick={() => handleCopy(dep.user_txid, dep.id)}
                              className="text-[10px] font-mono text-[#00F5A0] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              {copiedKey === dep.id ? <Check className="w-3 h-3 text-[#00F5A0]" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedKey === dep.id ? 'Copied' : 'Copy TxID'}</span>
                            </button>
                          </div>
                          <div className="text-xs font-mono text-cyan-300 break-all select-all mt-1">
                            {dep.user_txid}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          onClick={() => handleRejectDeposit(dep)}
                          disabled={isProcessing}
                          className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 text-xs font-mono font-bold transition cursor-pointer"
                        >
                          Reject Submission
                        </button>

                        <button
                          onClick={() => handleApproveDeposit(dep)}
                          disabled={isProcessing}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black font-black text-xs uppercase tracking-wider font-['Syne'] shadow-md hover:brightness-110 disabled:opacity-50 transition cursor-pointer flex items-center gap-2"
                        >
                          {isProcessing ? (
                            <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Approve & Credit Balance</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: LIVE USER EXPLORER & GLOBAL TELEMETRY                   */}
        {/* ============================================================== */}
        {activeTab === 'explorer' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Syne'] flex items-center gap-2">
                <span>Live User Explorer & Telemetry</span>
                <span className="text-[#00F5A0]">🌐</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Inspect registered user documents in real-time, view balances, hashrates, and referral syndicates.
              </p>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchUser} className="flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value.toUpperCase())}
                  placeholder="Search Wallet ID (e.g. HG-9F2B96262B4D)..."
                  className="w-full bg-[#090D16] border border-[#1C2436] focus:border-[#00F5A0] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none font-mono"
                />
              </div>
              <button
                type="submit"
                disabled={searchLoading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black font-extrabold text-xs uppercase tracking-wider font-['Syne'] hover:brightness-110 transition cursor-pointer shrink-0"
              >
                {searchLoading ? 'Locating...' : 'Inspect User'}
              </button>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Registered Users Quick-List */}
              <div className="lg:col-span-4 rounded-3xl bg-[#090D16] border border-[#1C2436] p-4 space-y-2 max-h-[600px] overflow-y-auto">
                <div className="text-xs font-mono font-bold text-slate-400 px-2 py-1 uppercase">
                  Synchronized Ledgers ({allUsers.length})
                </div>
                {allUsers.map(u => (
                  <button
                    key={u.wallet_id}
                    onClick={() => setSelectedUser(u)}
                    className={`w-full text-left p-3 rounded-2xl border transition cursor-pointer flex flex-col gap-1 ${
                      selectedUser?.wallet_id === u.wallet_id
                        ? 'bg-[#0F192B] border-[#00F5A0] text-white shadow-md'
                        : 'bg-[#05080E] border-[#1C2436] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-[#00F5A0]">{u.wallet_id}</span>
                      <span className="text-white">${u.usdt_balance.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Hashrate: {u.hash_rate + (u.bonus_hashrate || 0)} GH/s</span>
                      <span>Team: {u.teamCount}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Column: Selected User Deep Telemetry Card */}
              <div className="lg:col-span-8">
                {selectedUser ? (
                  <div className="rounded-3xl bg-[#090D16] border border-[#1C2436] p-6 sm:p-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1C2436] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl sm:text-2xl font-black text-white font-mono">
                            {selectedUser.wallet_id}
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-[#00F5A0] text-[10px] font-mono font-bold border border-emerald-500/30">
                            ACTIVE NODE
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {selectedUser.email || 'Web3 Verified Keyholder'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setInjectWalletId(selectedUser.wallet_id);
                            setActiveTab('inject');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0F141F] border border-[#00F5A0]/40 text-[#00F5A0] text-xs font-mono font-bold hover:bg-[#00F5A0] hover:text-black transition cursor-pointer"
                        >
                          + Inject Funds
                        </button>
                        <button
                          onClick={() => {
                            setRewardWalletId(selectedUser.wallet_id);
                            setActiveTab('rewards');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0F141F] border border-[#00D2FF]/40 text-[#00D2FF] text-xs font-mono font-bold hover:bg-[#00D2FF] hover:text-black transition cursor-pointer"
                        >
                          + Grant Reward
                        </button>
                      </div>
                    </div>

                    {/* Balances Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-[#05080E] border border-[#1C2436]">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">usdt_balance</span>
                        <div className="text-xl font-black text-white font-mono mt-1">
                          ${selectedUser.usdt_balance.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-1">Main Staking Balance</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#05080E] border border-[#1C2436]">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">withdrawable_balance</span>
                        <div className="text-xl font-black text-[#00F5A0] font-mono mt-1">
                          ${selectedUser.withdrawable_balance.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-1">Ready for 24h Cashout</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#05080E] border border-[#1C2436]">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">mined_balance</span>
                        <div className="text-xl font-black text-[#00D2FF] font-mono mt-1">
                          ${selectedUser.mined_balance.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-1">Real-Time Rig Returns</div>
                      </div>
                    </div>

                    {/* Hashrate & Syndicate Network */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-[#05080E] border border-[#1C2436] space-y-3 font-mono text-xs">
                        <div className="text-[10px] text-slate-400 uppercase font-bold border-b border-[#1C2436] pb-2">
                          Hash Power Metrics
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Base Hardware:</span>
                          <strong className="text-white">{selectedUser.hash_rate} GH/s</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Bonus Hashrate:</span>
                          <strong className="text-[#00F5A0]">+{selectedUser.bonus_hashrate} GH/s</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Grid Token Balance:</span>
                          <strong className="text-[#00D2FF]">{selectedUser.grid_balance.toLocaleString()} GRID</strong>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#05080E] border border-[#1C2436] space-y-3 font-mono text-xs">
                        <div className="text-[10px] text-slate-400 uppercase font-bold border-b border-[#1C2436] pb-2">
                          Syndicate & Lineage
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Sponsor ID:</span>
                          <strong className="text-[#00D2FF]">{selectedUser.referredBy || 'Genesis Node'}</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Active Syndicate Team:</span>
                          <strong className="text-white">{selectedUser.teamCount} Miners</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Referral Commission:</span>
                          <strong className="text-[#00F5A0]">7% Instant Cash</strong>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="rounded-3xl bg-[#090D16] border border-[#1C2436] p-12 text-center text-xs text-slate-400 font-mono">
                    Select a user from the list or search by Wallet ID.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FIREBASE CONFIG OVERLAY MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#090D16] border border-[#1C2436] rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C2436] pb-3">
              <h4 className="text-lg font-bold text-white font-['Syne'] flex items-center gap-2">
                <Database className="w-5 h-5 text-[#00F5A0]" />
                <span>Cloud Firestore Direct Binding</span>
              </h4>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              HashGrid automatically runs on real-time synchronized cloud state. If you wish to bind to an external production Firebase project, paste your client <code className="text-[#00F5A0]">firebaseConfig</code> JSON below:
            </p>

            <textarea
              rows={6}
              value={customConfigText}
              onChange={e => setCustomConfigText(e.target.value)}
              placeholder={`{\n  "apiKey": "AIzaSy...",\n  "projectId": "hashgrid-prod",\n  "storageBucket": "hashgrid-prod.appspot.com"\n}`}
              className="w-full bg-[#05080E] border border-[#1C2436] focus:border-[#00F5A0] rounded-xl p-3 text-xs text-white placeholder-slate-600 font-mono focus:outline-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (customConfigText.trim()) {
                    const ok = setCustomFirebaseConfig(customConfigText.trim());
                    if (ok) {
                      addToast('success', 'Firebase Config Applied', 'Attempting connection to remote Firestore.');
                      setShowConfigModal(false);
                    } else {
                      addToast('error', 'Invalid Config', 'Could not parse JSON. Must contain a valid projectId.');
                    }
                  }
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00F5A0] to-[#00D2FF] text-black font-bold text-xs uppercase tracking-wider font-mono hover:brightness-110"
              >
                Save & Connect
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
