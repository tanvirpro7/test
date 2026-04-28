import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, mockBusinesses } from '../constants';

export default function Categories() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Categories</h2>
          <p className="text-sm text-gray-500">Find exactly what you need in Phulpur</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => {
          const businessCount = mockBusinesses.filter(b => b.category === category.id).length;
          
          return (
            <motion.div
              key={category.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                to={`/services?category=${category.id}`}
                className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all group relative overflow-hidden"
              >
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform relative z-10`}>
                  <category.icon size={32} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 relative z-10">{category.name}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10">
                  {businessCount} {businessCount === 1 ? 'Service' : 'Services'}
                </p>
                
                {/* Decorative background element */}
                <div className={`absolute -right-4 -bottom-4 w-16 h-16 ${category.color} opacity-5 rounded-full scale-150 group-hover:scale-[2] transition-transform duration-700`} />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Featured in popular categories */}
      <section className="space-y-6 pt-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Popular Services</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {mockBusinesses.slice(0, 4).map((biz) => (
            <Link 
              key={biz.id} 
              to={`/business/${biz.id}`}
              className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 flex gap-4 hover:shadow-lg transition-all group"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={biz.image} alt={biz.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors text-sm">{biz.name}</h4>
                  <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-bold bg-yellow-50 dark:bg-yellow-900/10 px-2 py-0.5 rounded-full">
                    <Star size={10} fill="currentColor" />
                    {biz.rating}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                  {categories.find(c => c.id === biz.category)?.name}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                   View Details <ArrowRight size={10} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
