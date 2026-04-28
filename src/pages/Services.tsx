import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Phone, Clock, MapPin, Star, ChevronLeft } from 'lucide-react';
import { categories, mockBusinesses } from '../constants';

export default function Services() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');

  // GitHub repositories state when URL params change (e.g. clicking category icon on Home)
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const filteredBusinesses = mockBusinesses
    .filter(biz => {
      const matchesCategory = selectedCategory === 'all' || biz.category === selectedCategory;
      const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           biz.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6">
      {/* Search and Filters Container */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-500 font-bold text-sm md:hidden w-full">
             <ChevronLeft size={20} /> Dashboard-এ ফিরে যান
          </Link>
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="নাম বা ধরন দিয়ে খুঁজুন (যেমন: ডাক্তার, হোটেল)..."
              className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-12 pr-4 shadow-inner focus:ring-2 focus:ring-primary/20 transition-all outline-none dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'name')}
              className="bg-gray-50 dark:bg-slate-800 border-none rounded-xl py-2 px-4 text-xs font-bold text-gray-600 dark:text-gray-400 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="rating">সেরা রেটিং (Top Rated)</option>
              <option value="name">নাম অনুসারে (Alphabetical)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">ক্যাটাগরি ফিল্টার</p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all transform active:scale-95 ${
                selectedCategory === 'all' 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              সব (All)
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 transform active:scale-95 ${
                  selectedCategory === cat.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                <cat.icon size={14} className={selectedCategory === cat.id ? 'text-white' : ''} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {selectedCategory === 'all' ? 'All Services' : categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{filteredBusinesses.length} results found</p>
      </div>

      {/* List Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((biz) => (
          <div key={biz.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-gray-200 dark:hover:shadow-slate-950 transition-all group flex flex-col">
            <div className="relative h-48">
              <img src={biz.image} alt={biz.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-gray-900 dark:text-white shadow-lg">
                <Star size={14} className="text-yellow-500" fill="currentColor" />
                {biz.rating}
              </div>
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                {categories.find(c => c.id === biz.category)?.name}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-2">{biz.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{biz.description}</p>
              
              <div className="space-y-3 mt-auto">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <MapPin size={16} />
                  </div>
                  <span className="truncate">{biz.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <Clock size={16} />
                  </div>
                  <span>09:00 AM - 08:00 PM</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <a href={`tel:${biz.phone}`} className="flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95">
                  <Phone size={16} />
                  কল করুন
                </a>
                <Link to={`/business/${biz.id}`} className="flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white font-bold text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-all active:scale-95 border border-gray-100 dark:border-slate-700">
                  বিবরণ
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredBusinesses.length === 0 && (
          <div className="col-span-full py-12 text-center space-y-4">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <Search size={40} />
             </div>
             <div>
                <h3 className="text-lg font-bold text-gray-900">কোন সার্ভিস পাওয়া যায় নি</h3>
                <p className="text-sm text-gray-500">অন্য কোন কীওয়ার্ড বা ক্যাটাগরি ব্যবহার করুন।</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
