import React from 'react';
import { Bell, Check, Info, AlertTriangle, ChevronRight, Clock } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'news', title: 'বিজয়পুর নতুন রাস্তা উদ্বোধন', time: '১০ মিনিট আগে', unread: true, icon: Info, color: 'bg-blue-50 text-blue-600' },
  { id: 2, type: 'alert', title: 'বিদ্যুৎ বিভ্রাট সংকেত (ফুলপুর দক্ষিণ)', time: '১ ঘণ্টা আগে', unread: true, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
  { id: 3, type: 'job', title: 'নতুন চাকরির খবর: উপ-সহকারী ম্যানেজার', time: '৩ ঘণ্টা আগে', unread: false, icon: Bell, color: 'bg-emerald-50 text-emerald-600' },
  { id: 4, type: 'service', title: 'আপনার ব্যবসার প্রোফাইল যাচাই করা হয়েছে', time: 'গতকাল', unread: false, icon: Check, color: 'bg-primary/10 text-primary' },
];

export default function Notifications() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">নোটিফিকেশন</h2>
          <p className="text-sm font-medium text-gray-500">আপনার প্রয়োজনীয় সব আপডেট এখানে পাবেন</p>
        </div>
        <button className="text-xs font-bold text-primary hover:underline px-4 py-2 bg-primary/5 rounded-full">
          সব পঠিত করুন (Read All)
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-gray-50 dark:divide-slate-800 transition-colors">
        {mockNotifications.map((notif) => (
          <div 
            key={notif.id}
            className={`p-6 flex gap-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer group ${notif.unread ? 'bg-blue-50/30 dark:bg-primary/5' : ''}`}
          >
            <div className={`w-12 h-12 ${notif.color} rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
              <notif.icon size={24} />
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className={`text-sm ${notif.unread ? 'font-black text-gray-900 dark:text-white' : 'font-bold text-gray-600 dark:text-gray-400'}`}>
                  {notif.title}
                </h4>
                {notif.unread && <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.8)]" />}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                <Clock size={12} />
                {notif.time}
              </div>
            </div>
            
            <div className="self-center">
               <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 text-center">
        <p className="text-sm text-primary font-bold">পুরানো নোটিফিকেশনগুলো আর দেখা সম্ভব নয়।</p>
      </div>
    </div>
  );
}
