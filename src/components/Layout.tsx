import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Home, Phone, Bell, User, Search, PlusCircle, Menu, Moon, Sun, Globe, Languages } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [notificationCount, setNotificationCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simulate notification updates
  useEffect(() => {
    const timer = setInterval(() => {
      setNotificationCount(prev => (prev > 0 ? prev - 1 : 5));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'bn' : 'en');

  const navItems = [
    { to: '/', icon: Home, label: t('home') },
    { to: '/contact', icon: Phone, label: t('contact') },
    { to: '/notifications', icon: Bell, label: t('notifications'), badge: notificationCount },
    { to: '/profile', icon: User, label: t('profile') },
  ];

  const mobileLinks = [
    { to: '/services', label: t('services') },
    { to: '/categories', label: t('categories') },
    { to: '/news', label: t('news') },
    { to: '/jobs', label: t('jobs') },
    { to: '/admin', label: 'Admin Dashboard' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-background dark:bg-dark-background text-foreground transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-64 bg-white dark:bg-slate-900 shadow-2xl md:hidden p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-bold text-lg">Menu</h2>
                <button onClick={toggleMenu} className="p-2 text-gray-500 hover:text-primary">
                   <Menu size={24} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-4">
                {mobileLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={toggleMenu}
                    className={({ isActive }) => 
                      `text-lg font-semibold py-2 transition-colors ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              
              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 space-y-4">
                 <button 
                  onClick={() => {
                    toggleTheme();
                    toggleMenu();
                  }}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-sm font-bold"
                >
                  <span>{theme === 'light' ? t('darkMode') : t('lightMode')}</span>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <button 
                  onClick={() => {
                    toggleLanguage();
                    toggleMenu();
                  }}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-sm font-bold"
                >
                  <span>{t('language')} ({language.toUpperCase()})</span>
                  <Languages size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Header */}
      <header className="sticky top-0 z-50 glass bg-white/90 dark:bg-slate-900/90 border-b border-gray-100 dark:border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Globe size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none">Phulpur Hub</h1>
              <p className="text-[10px] text-primary font-medium tracking-wider uppercase">Smart City Platform</p>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder={t('search')}
              className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 transition-all outline-none"
            />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`}>{t('home')}</NavLink>
            <NavLink to="/categories" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`}>{t('categories')}</NavLink>
            <NavLink to="/services" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`}>{t('services')}</NavLink>
            <NavLink to="/news" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`}>{t('news')}</NavLink>
            <NavLink to="/jobs" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`}>{t('jobs')}</NavLink>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all text-xs font-bold"
                title="Change Language"
              >
                {language.toUpperCase()}
              </button>
              
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            <NavLink to="/contact" className={({ isActive }) => `px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all`}>{t('contact')}</NavLink>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={toggleMenu}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
               <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t('search')}
            className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 animate-in fade-in duration-500">
        <Outlet />
      </main>

      {/* Footer (Desktop) */}
      <footer className="hidden md:block bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-12 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-8">
          <div>
            <Link to="/" className="block">
              <h2 className="text-xl font-bold text-primary mb-4 hover:opacity-80 transition-opacity">Phulpur Hub</h2>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Phulpur's leading digital platform connecting citizens with essential services, news, and opportunities.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><NavLink to="/services" className="hover:text-primary">Services</NavLink></li>
              <li><NavLink to="/news" className="hover:text-primary">Latest News</NavLink></li>
              <li><NavLink to="/jobs" className="hover:text-primary">Career Board</NavLink></li>
              <li><NavLink to="/add-business" className="hover:text-primary">Add Business</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><NavLink to="/privacy" className="hover:text-primary">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="hover:text-primary">Terms of Service</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Main Road, Phulpur, Mymensingh</p>
            <div className="flex gap-4">
              <a href="#" className="text-primary hover:opacity-80"><Globe size={20} /></a>
              <a href="#" className="text-primary hover:opacity-80"><Phone size={20} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-50 dark:border-slate-800 text-center text-sm text-gray-400">
          © 2023 Phulpur Hub. All rights reserved.
        </div>
      </footer>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass bg-white/95 dark:bg-slate-900/95 border-t border-gray-100 dark:border-slate-800 md:hidden pb-safe-bottom transition-colors">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `relative flex flex-col items-center gap-1 p-2 transition-all duration-300 flex-1 ${
                isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative z-10"
                  >
                    <item.icon size={22} className={isActive ? 'drop-shadow-md' : ''} />
                    
                    <AnimatePresence>
                      {item.badge !== undefined && item.badge > 0 && (
                        <motion.div
                          key={item.badge}
                          initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm"
                        >
                          {item.badge}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <motion.span 
                    animate={isActive ? { y: 0, opacity: 1 } : { y: 0, opacity: 0.7 }}
                    className="text-[10px] font-bold z-10"
                  >
                    {item.label}
                  </motion.span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileNav"
                      className="absolute inset-0 m-1 bg-primary/10 dark:bg-primary/20 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
