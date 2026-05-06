import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Newspaper, Briefcase, CheckCircle2, XCircle, 
  Clock, Search, Filter, MoreVertical, ShieldCheck, Star,
  History, ArrowUpRight, Eye, CheckCircle, LogIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, signInWithGoogle } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

type Tab = 'businesses' | 'news' | 'jobs';

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('businesses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHistory, setSelectedHistory] = useState<any | null>(null);
  const [rejectionNote, setRejectionNote] = useState('');
  const [moderatingId, setModeratingId] = useState<string | null>(null);
  
  const [pendingBusinesses, setPendingBusinesses] = useState<any[]>([]);
  const [liveBusinesses, setLiveBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    setLoading(true);
    
    // Listen for pending businesses
    const qPending = query(collection(db, 'businesses'), where('status', '==', 'pending'));
    const unsubscribePending = onSnapshot(qPending, (snapshot) => {
      const biz = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingBusinesses(biz);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'businesses');
    });

    // Listen for approved businesses
    const qLive = query(collection(db, 'businesses'), where('status', '==', 'approved'));
    const unsubscribeLive = onSnapshot(qLive, (snapshot) => {
      const biz = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLiveBusinesses(biz);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'businesses');
    });

    return () => {
      unsubscribePending();
      unsubscribeLive();
    };
  }, [isAdmin]);

  const handleApprove = async (id: string) => {
    try {
      const bizRef = doc(db, 'businesses', id);
      await updateDoc(bizRef, {
        status: 'approved',
        updatedAt: serverTimestamp(),
        approvedBy: user?.uid,
        approvedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `businesses/${id}`);
    }
  };

  const handleReject = async (id: string) => {
    if (!rejectionNote) {
      setModeratingId(id);
      return;
    }

    try {
      const bizRef = doc(db, 'businesses', id);
      await updateDoc(bizRef, {
        status: 'rejected',
        rejectionReason: rejectionNote,
        updatedAt: serverTimestamp(),
        rejectedBy: user?.uid,
        rejectedAt: serverTimestamp(),
      });
      setModeratingId(null);
      setRejectionNote('');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `businesses/${id}`);
    }
  };

  if (authLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto h-[70vh] flex flex-col items-center justify-center text-center space-y-8 p-8">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-[2.5rem] flex items-center justify-center text-red-600 shadow-xl">
           <ShieldCheck size={48} />
        </div>
        <div className="space-y-3">
           <h2 className="text-3xl font-black text-gray-900 dark:text-white">Access Restricted</h2>
           <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">This area is reserved for Phulpur Hub administrators only. If you believe this is an error, please contact support.</p>
        </div>
        {!user && (
          <button 
            onClick={signInWithGoogle}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
          >
            <LogIn size={20} />
            Sign in as Admin
          </button>
        )}
      </div>
    );
  }

  const stats = [
    { label: 'Total Users', value: '1,248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Apps', value: pendingBusinesses.length.toString(), icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Live Services', value: liveBusinesses.length.toString(), icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="text-primary" size={32} />
            অ্যাডমিন প্যানেল
          </h2>
          <p className="text-sm font-medium text-gray-500">Phulpur Hub প্ল্যাটফর্মের সার্ভিস এবং কন্টেন্ট পরিচালনা করুন</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
            <BarChart3 size={16} />
            রিপোর্ট ডাউনলোড
          </button>
          <button className="px-5 py-2.5 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded-2xl text-xs font-bold hover:bg-primary/20 transition-all flex items-center gap-2">
            <MoreVertical size={16} className="rotate-90" />
            GitHub repositories
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group hover:border-primary/30 transition-colors"
          >
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="flex items-center gap-8 px-8 pt-6 border-b border-gray-50 dark:border-slate-800">
          {(['businesses', 'news', 'jobs'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab === 'businesses' && 'সার্ভিস ম্যানেজমেন্ট'}
              {tab === 'news' && 'খবর মডারেশন'}
              {tab === 'jobs' && 'চাকরি মডারেট'}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/30 dark:bg-slate-900/30">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="সার্চ করুন (নাম, ক্যাটাগরি)..." 
              className="w-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl py-2.5 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-gray-400 hover:text-primary transition-all shadow-sm">
              <Filter size={18} />
            </button>
            <select className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl py-2 px-4 text-xs font-bold text-gray-600 dark:text-gray-400 outline-none shadow-sm cursor-pointer">
              <option>পেন্ডিং আবেদন (Pending)</option>
              <option>লাইভ লিস্ট (Live List)</option>
              <option>রিজেক্টেড (Rejected)</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'businesses' && (
              <motion.div 
                key="biz" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Pending Section */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock size={14} className="text-orange-500" />
                      পেন্ডিং আবেদন ({pendingBusinesses.length})
                    </h4>
                  </div>
                  <div className="grid gap-4">
                    {pendingBusinesses.map((biz) => (
                      <motion.div 
                        layout
                        key={biz.id} 
                        className="bg-orange-50/20 dark:bg-orange-950/5 rounded-3xl border border-orange-100/50 dark:border-orange-900/20 p-6 hover:shadow-lg transition-all group"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex gap-4">
                            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-100/50 dark:border-orange-900/30">
                              <Briefcase size={28} />
                            </div>
                            <div>
                              <h5 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                                {biz.name}
                                <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] font-bold rounded-md uppercase tracking-tighter">{biz.category}</span>
                              </h5>
                              <p className="text-sm text-gray-500 font-medium">{biz.ownerName || biz.owner}</p>
                              <div className="flex gap-4 mt-2 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Clock size={12} /> {biz.createdAt?.toDate ? biz.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                                <span className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors" onClick={() => setSelectedHistory(biz)}>
                                  <History size={12} /> View Details
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {moderatingId === biz.id ? (
                              <div className="flex-1 flex gap-2 animate-in slide-in-from-right-4">
                                <input 
                                  autoFocus
                                  className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-red-100 dark:border-red-900/30 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500/20 dark:text-white"
                                  placeholder="Reason for rejection..."
                                  value={rejectionNote}
                                  onChange={(e) => setRejectionNote(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && handleReject(biz.id)}
                                />
                                <button onClick={() => handleReject(biz.id)} className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95">Reject</button>
                                <button onClick={() => setModeratingId(null)} className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-500 rounded-xl text-xs font-bold transition-all active:scale-95">Cancel</button>
                              </div>
                            ) : (
                              <>
                                <button onClick={() => setSelectedHistory(biz)} className="p-3 bg-white dark:bg-slate-800 text-gray-400 hover:text-blue-500 rounded-xl transition-all shadow-sm flex items-center gap-2 text-xs font-bold">
                                  <Eye size={18} /> Review
                                </button>
                                <button 
                                  onClick={() => setModeratingId(biz.id)}
                                  className="p-3 text-red-500 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all shadow-sm" title="Reject"
                                >
                                  <XCircle size={18} />
                                </button>
                                <button 
                                  onClick={() => handleApprove(biz.id)}
                                  className="p-3 text-white bg-primary hover:bg-primary-dark rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2 text-xs font-bold"
                                >
                                  <CheckCircle2 size={18} /> Approve
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {pendingBusinesses.length === 0 && (
                      <div className="text-center py-8 bg-gray-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
                        <p className="text-sm text-gray-400 font-bold">কোন পেন্ডিং আবেদন নেই</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Live Section */}
                <section className="space-y-4 pt-4">
                  <div className="flex items-center justify-between px-2">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} className="text-green-500" />
                      লাইভ সার্ভিস পরিচালনা ({liveBusinesses.length})
                    </h4>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-[10px] uppercase font-black text-gray-400 tracking-wider">
                        <tr>
                          <th className="px-6 py-4">সার্ভিসের নাম</th>
                          <th className="px-6 py-4">রেটিং ও স্ট্যাটাস</th>
                          <th className="px-6 py-4 text-right">মডারেশন ও অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-50 dark:divide-slate-800">
                        {liveBusinesses.map((biz) => (
                          <tr key={biz.id} className="group hover:bg-gray-50/30 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold text-gray-900 dark:text-white">{biz.name}</div>
                              <div className="text-[10px] text-gray-400">ID: {biz.id}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                  <Star size={12} fill="currentColor" />
                                  {biz.rating}
                                </div>
                                <div className="w-px h-3 bg-gray-200 dark:bg-slate-700" />
                                <span className="flex items-center gap-1 text-green-500 text-[10px] font-black uppercase tracking-widest">
                                  <CheckCircle size={10} /> Active
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-3">
                                <button 
                                  onClick={() => setSelectedHistory(biz as any)}
                                  className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest flex items-center gap-1 transition-colors"
                                >
                                  <History size={12} /> Audit Log
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-all border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                                  <MoreVertical size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'news' && (
              <motion.div key="news" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-12">
                <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                  <Newspaper size={32} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">কোন পেন্ডিং খবর নেই</h4>
              </motion.div>
            )}

            {activeTab === 'jobs' && (
              <motion.div key="jobs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-12">
                <div className="w-16 h-16 bg-purple-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-500">
                  <Briefcase size={32} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">চাকরির পোস্টগুলো লাইভ আছে</h4>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Moderation History Sidebar/Modal */}
      <AnimatePresence>
        {selectedHistory && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHistory(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">Moderation History</h3>
                  <p className="text-xs text-primary font-bold uppercase tracking-widest">{selectedHistory.name}</p>
                </div>
                <button onClick={() => setSelectedHistory(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-400">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 text-gray-900 dark:text-white">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Business Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Owner</p>
                      <p className="text-sm font-bold dark:text-white">{selectedHistory.ownerName || selectedHistory.owner}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Phone</p>
                      <p className="text-sm font-bold dark:text-white">{selectedHistory.phone}</p>
                    </div>
                    <div className="col-span-2 bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Address</p>
                      <p className="text-sm font-bold dark:text-white">{selectedHistory.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Timeline</h4>
                  <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 dark:before:bg-slate-800">
                    <div className="relative">
                      <div className="absolute -left-[2.15rem] w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 bg-blue-400 flex items-center justify-center">
                        <ArrowUpRight size={10} className="text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-900 dark:text-white">Submission Created</p>
                        <p className="text-[10px] text-gray-400">{selectedHistory.createdAt?.toDate ? selectedHistory.createdAt.toDate().toLocaleString() : 'N/A'}</p>
                      </div>
                    </div>
                    {selectedHistory.status !== 'pending' && (
                      <div className="relative">
                        <div className={`absolute -left-[2.15rem] w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center ${selectedHistory.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                          {selectedHistory.status === 'approved' ? <CheckCircle2 size={10} className="text-white" /> : <XCircle size={10} className="text-white" />}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-900 dark:text-white">
                            {selectedHistory.status === 'approved' ? 'Application Approved' : 'Application Rejected'}
                          </p>
                          <p className="text-[10px] text-gray-400">Processed at {selectedHistory.updatedAt?.toDate ? selectedHistory.updatedAt.toDate().toLocaleString() : 'N/A'}</p>
                          {selectedHistory.rejectionReason && (
                             <div className="mt-2 p-3 bg-red-50/50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 text-[10px] text-red-600 dark:text-red-400">
                                Reason: "{selectedHistory.rejectionReason}"
                             </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {pendingBusinesses.some(b => b.id === selectedHistory.id) && (
                  <div className="pt-8 mt-8 border-t border-gray-100 dark:border-slate-800 space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Moderator Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => {
                          handleApprove(selectedHistory.id);
                          setSelectedHistory(null);
                        }}
                        className="flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button 
                        onClick={() => setModeratingId(selectedHistory.id)}
                        className="flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                <button 
                  onClick={() => setSelectedHistory(null)}
                  className="w-full py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl font-black text-sm hover:shadow-lg transition-all"
                >
                  Close Record
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
