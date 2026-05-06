import React, { useState } from 'react';
import { User, Settings, Bell, Shield, LogOut, ChevronRight, Bookmark, Briefcase, History, Camera, Moon, Sun, BarChart3, Github, LogIn, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle, logout } from '../lib/firebase';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 text-center border border-gray-100 dark:border-slate-800 shadow-sm">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center p-1 border-4 border-white dark:border-slate-800 shadow-xl mx-auto mb-6">
             <User size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Welcome to Phulpur Hub</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Sign in to manage your profile, save your favorite services, and access more features.</p>
          <button 
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-3 w-full max-w-sm mx-auto py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
          >
            <LogIn size={20} />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Saved', value: 12, icon: Bookmark, color: 'text-blue-500' },
    { label: 'Jobs', value: 3, icon: Briefcase, color: 'text-purple-500' },
    { label: 'Visited', value: 48, icon: History, color: 'text-orange-500' },
  ];

  const menuItems = [
    { title: 'Personal Information', icon: User, description: 'Manage your personal details' },
    { title: 'Notification Settings', icon: Bell, description: 'Configure how you stay updated', toggle: true },
    { title: 'Security & Privacy', icon: Shield, description: 'Keep your account safe' },
    { title: 'Theme Settings', icon: theme === 'light' ? Moon : Sun, description: `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, action: toggleTheme },
    { title: 'GitHub Integration', icon: Github, description: 'Connected as @tanvirpro', link: '#' },
    { title: 'Admin Dashboard', icon: BarChart3, description: 'Manage platform content (Admin Only)', link: isAdmin ? '/admin' : null },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      {/* Header / Avatar Section */}
      <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <User size={120} className="text-primary" />
        </div>
        
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center p-1 border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden">
              <img 
                src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`} 
                alt="Avatar" 
                className="w-full h-full rounded-2xl object-cover bg-primary/20"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-xl shadow-lg border-2 border-white dark:border-slate-900 transition-transform active:scale-90">
              <Camera size={16} />
            </button>
          </div>

          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{user.displayName || 'User'}</h2>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider">{isAdmin ? 'Admin' : 'Verified Profile'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-slate-800 p-4 rounded-3xl text-center space-y-1 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group"
            >
              <stat.icon size={20} className={`${stat.color} mx-auto mb-1 transform group-hover:scale-110 transition-transform`} />
              <div className="text-lg font-black text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-gray-50 dark:divide-slate-800 transition-colors">
        {menuItems.map((item, i) => (
          <div 
            key={item.title}
            onClick={() => {
              if (item.action) item.action();
              if (item.link) navigate(item.link);
            }}
            className={`flex items-center justify-between p-6 transition-all group ${item.action || item.toggle || item.link ? 'cursor-pointer' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </div>
            
            {item.toggle ? (
              <button 
                onClick={(e) => { e.stopPropagation(); setNotifications(!notifications); }}
                className={`w-12 h-6 rounded-full transition-colors relative border-2 ${notifications ? 'bg-primary border-primary' : 'bg-gray-200 dark:bg-slate-700 border-transparent'}`}
              >
                <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            ) : (
              <ChevronRight size={20} className="text-gray-300 dark:text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            )}
          </div>
        ))}

        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 p-6 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
        >
          <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
            <LogOut size={20} />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-black uppercase tracking-wider">Log Out</h4>
            <p className="text-xs opacity-70">Sign out from your account</p>
          </div>
        </button>
      </div>

      {/* GitHub Repositories Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 dark:bg-white/10 rounded-xl flex items-center justify-center text-white">
              <Github size={20} />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">GitHub Repositories</h3>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">3 Public Repos</span>
        </div>

        <div className="space-y-4">
          {[
            { name: 'phulpur-hub-web', description: 'Main web application for Phulpur local services.', stars: 12, lang: 'TypeScript' },
            { name: 'mymensingh-guide', description: 'Comprehensive guide for Mymensingh division.', stars: 5, lang: 'JavaScript' },
            { name: 'react-local-directory', description: 'Reusable local directory components.', stars: 8, lang: 'React' }
          ].map((repo, i) => (
            <motion.div 
              key={repo.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:border-primary/30 border border-transparent transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{repo.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Star size={10} fill="currentColor" className="text-yellow-500" />
                  {repo.stars}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-3">{repo.description}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{repo.lang}</span>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Modified 2 days ago</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center pb-8">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Version 2.1.0 • Phulpur Hub Inc.</p>
      </div>
    </div>
  );
}
