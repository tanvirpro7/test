import React from 'react';
import { motion } from 'motion/react';
import { Search, PlusCircle, ArrowRight, MessageSquare, MapPin, Star, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, mockBusinesses, mockNews } from '../constants';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-[520px] md:h-[650px] rounded-[3rem] overflow-hidden bg-gray-900 group shadow-2xl">
        <img
          src="https://drive.google.com/uc?export=view&id=1Nxp7V0CNWmYEZ-JsUcr4R0yNBk03qup_"
          alt="Phulpur Digital Hub"
          className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-20">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 px-5 py-2.5 rounded-2xl text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-8 shadow-xl">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Digital Phulpur • স্মার্ট ফুলপুর
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
              The Heart of <br />
              <span className="text-primary italic drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]">Smart Phulpur</span>
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-xl font-medium leading-relaxed opacity-90">
              আপনার প্রয়োজন, আমাদের আয়োজন। ফুলপুরের প্রথম স্বয়ংসম্পূর্ণ ডিজিটাল ডিরেক্টরি এবং নাগরিক সেবা কেন্দ্র।
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/services" className="group relative px-10 py-5 bg-primary text-white rounded-[2.5rem] font-black shadow-[0_20px_50px_rgba(15,157,88,0.3)] hover:shadow-[0_20px_50px_rgba(15,157,88,0.5)] flex items-center gap-4 transition-all hover:-translate-y-2 active:scale-95 text-xl">
                <Search size={24} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
                সেবা খুঁজুন
              </Link>
              <Link to="/add-business" className="group px-10 py-5 bg-white/10 text-white backdrop-blur-3xl border border-white/30 rounded-[2.5rem] font-black hover:bg-white/20 flex items-center gap-4 transition-all hover:-translate-y-2 active:scale-95 text-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <PlusCircle size={24} strokeWidth={3} />
                ব্যবসা যুক্ত করুন
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h3>
          <Link to="/categories" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            See All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {categories.slice(0, 10).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/services?category=${category.id}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all group-hover:-translate-y-1`}>
                  <category.icon size={24} />
                </div>
                <span className="text-[11px] md:text-xs font-bold text-gray-700 dark:text-gray-400 text-center">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Featured Listings</h3>
          <Link to="/services" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            Explore <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {mockBusinesses.map((biz) => (
            <div key={biz.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 flex gap-4 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-slate-900 transition-all group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={biz.image} alt={biz.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{biz.name}</h4>
                  <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <Star size={10} fill="currentColor" />
                    {biz.rating}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-1">{biz.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500">
                    <MapPin size={10} />
                    {biz.address}
                  </div>
                  <Link to={`/business/${biz.id}`} className="text-[10px] font-bold bg-primary-light dark:bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Latest News */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Latest News</h3>
            <Link to="/news" className="text-primary text-sm font-bold">Read All</Link>
          </div>
          <div className="space-y-4">
            {mockNews.map((news) => (
              <div key={news.id} className="group cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 flex-shrink-0">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{news.category}</span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">{news.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{news.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notice Board */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Notice Board</h3>
            <Link to="/jobs" className="text-primary text-sm font-bold">Govt Jobs</Link>
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-6 border border-primary/10 dark:border-primary/20 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">New job openings at Phulpur Upazila Complex</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Deadline: Nov 15, 2023</p>
                <button className="text-xs font-bold text-primary mt-2 flex items-center gap-1">Details <ArrowRight size={12} /></button>
              </div>
            </div>
            <div className="h-px bg-primary/10 dark:bg-primary/20 w-full" />
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Upcoming Vaccination Camp at Model School</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Date: Oct 30, 2023</p>
                <button className="text-xs font-bold text-primary mt-2 flex items-center gap-1">Pre-register <ArrowRight size={12} /></button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Map Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Locate Phulpur</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Find government offices and emergency services on map.</p>
        </div>
        <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14502.82436814088!2d90.3548!3d24.8454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37564d7800000001%3A0x7d0a0a0a0a0a0a0a!2sPhulpur%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </section>
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/8801700000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 md:bottom-12 md:right-12 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
      >
        <MessageSquare size={24} />
      </a>
    </div>
  );
}
