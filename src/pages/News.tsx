import React, { useState } from 'react';
import { ArrowLeft, Search, Calendar, Tag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockNews } from '../constants';

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const newsCategories = ['All', 'Politics', 'Education', 'Events', 'Health'];

  const filteredNews = selectedCategory === 'All' ? mockNews : mockNews.filter(n => n.category === selectedCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Community News</h2>
          <p className="text-sm text-gray-500 font-medium dark:text-gray-400">Stay updated with latest happenings in Phulpur.</p>
        </div>
        <div className="flex bg-gray-50 dark:bg-slate-800 p-1.5 rounded-full border border-gray-100 dark:border-slate-700 overflow-x-auto scrollbar-hide">
           {newsCategories.map(cat => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((news) => (
          <article key={news.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-gray-200 dark:hover:shadow-slate-950 transition-all group cursor-pointer flex flex-col">
            <div className="h-56 relative overflow-hidden">
               <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-primary uppercase">
                  {news.category}
               </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
               <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-3">
                  <Calendar size={12} />
                  {news.date}
               </div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-3">
                  {news.title}
               </h3>
               <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6 flex-1">
                  {news.preview}
               </p>
               <button className="flex items-center gap-2 text-sm font-extrabold text-primary group-hover:gap-4 transition-all uppercase tracking-wider">
                  Read More
                  <ChevronRight size={18} />
               </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
