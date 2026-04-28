import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">Get in Touch</h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto">
          Phulpur Hub provides 24/7 support for citizens and business owners. Contact us for any help or feedback.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-primary-light dark:bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone size={28} />
               </div>
               <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white font-sans">কল করুন</p>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">+880 1700-000000</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail size={28} />
               </div>
               <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">ইমেইল করুন</p>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">support@phulpurhub.com</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 text-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={28} />
               </div>
               <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">অফিস ঠিকানা</p>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Main Road, Phulpur, Mymensingh</p>
               </div>
            </div>
          </div>

          <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 flex items-center justify-between group cursor-pointer overflow-hidden relative transition-all">
             <div className="space-y-1 relative z-10">
                <h3 className="text-xl font-bold">Chat with Admin</h3>
                <p className="opacity-80 text-sm font-medium">Click to open WhatsApp</p>
             </div>
             <MessageSquare size={48} className="opacity-20 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform" />
             <div className="relative z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white transition-all group-hover:text-primary">
                <Send size={20} />
             </div>
          </div>
        </div>

        <form className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
           <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send us a Message</h3>
           <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium dark:text-white" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium dark:text-white" />
           </div>
           <input type="email" placeholder="Email Address" className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium dark:text-white" />
           <textarea rows={4} placeholder="Your Message" className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium dark:text-white" />
           <button type="button" className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform active:scale-95">
              বার্তা পাঠান
           </button>
        </form>
      </div>
    </div>
  );
}
