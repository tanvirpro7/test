import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    categories: 'Categories',
    services: 'Services',
    news: 'News',
    jobs: 'Jobs',
    profile: 'Profile',
    contact: 'Contact',
    search: 'Search services...',
    welcome: 'Welcome to Phulpur',
    tagline: 'Your digital guide to everything local',
    login: 'Login',
    logout: 'Logout',
    notifications: 'Notifications',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
  },
  bn: {
    home: 'হোম',
    categories: 'ক্যাটাগরি',
    services: 'সার্ভিস',
    news: 'নিউজ',
    jobs: 'জব',
    profile: 'প্রোফাইল',
    contact: 'যোগাযোগ',
    search: 'সার্ভিস খুঁজুন...',
    welcome: 'ফুলপুরে স্বাগতম',
    tagline: 'আপনার স্থানীয় ডিজিটাল গাইড',
    login: 'লগইন',
    logout: 'লগআউট',
    notifications: 'নোটিফিকেশন',
    darkMode: 'ডার্ক মোড',
    lightMode: 'লাইট মোড',
    language: 'ভাষা',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
