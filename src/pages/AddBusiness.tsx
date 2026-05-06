import React, { useState } from 'react';
import { ChevronLeft, UploadCloud, Info, CheckCircle2, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../constants';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, signInWithGoogle } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function AddBusiness() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    address: '',
    description: '',
    openingTime: '',
    closingTime: '',
    website: '',
    facebook: '',
    instagram: '',
    twitter: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'ব্যবসায়ের নাম আবশ্যক';
    } else if (formData.name.length < 3) {
      newErrors.name = 'নাম অন্তত ৩ অক্ষরের হতে হবে';
    }

    if (!formData.category) {
      newErrors.category = 'ক্যাটাগরি সিলেক্ট করুন';
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!formData.phone) {
      newErrors.phone = 'মোবাইল নম্বর আবশ্যক';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'সঠিক মোবাইল নম্বর দিন (যেমন: 01700000000)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'ঠিকানা আবশ্যক';
    } else if (formData.address.length < 5) {
      newErrors.address = 'ঠিকানা অত্যন্ত ৫ অক্ষরের হতে হবে';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'বিবরণ আবশ্যক';
    } else if (formData.description.length < 20) {
      newErrors.description = 'বিবরণ অন্তত ২০ অক্ষরের হতে হবে';
    }

    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'সঠিক ওয়েবসাইট ইউআরএল দিন (http:// বা https:// দিয়ে শুরু)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      signInWithGoogle();
      return;
    }
    
    if (validate()) {
      setIsSubmitting(true);
      try {
        const submissionData = {
          ...formData,
          ownerId: user.uid,
          ownerName: user.displayName,
          ownerEmail: user.email,
          status: 'pending',
          rating: 0,
          reviewCount: 0,
          image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400', // Default placeholder
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        
        await addDoc(collection(db, 'businesses'), submissionData);
        setSubmitted(true);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'businesses');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center animate-bounce">
           <CheckCircle2 size={64} />
        </div>
        <div className="space-y-2">
           <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">আবেদন সফল হয়েছে!</h2>
           <p className="text-gray-500 dark:text-gray-400 font-medium">আপনার ব্যবসায়ের তথ্যটি রিভিউ করার পর অ্যাডমিন দ্বারা পাবলিশ করা হবে। ধন্যবাদ।</p>
        </div>
        <Link to="/" className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
           হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto h-[70vh] flex flex-col items-center justify-center text-center space-y-8 p-8">
        <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary shadow-xl">
           <UploadCloud size={48} />
        </div>
        <div className="space-y-3">
           <h2 className="text-3xl font-black text-gray-900 dark:text-white">Sign in to add your business</h2>
           <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">You need to be signed in to submit and manage your business listings in Phulpur Hub.</p>
        </div>
        <button 
          onClick={signInWithGoogle}
          className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
        >
          <LogIn size={20} />
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Your Business</h2>
          <p className="text-sm text-gray-500">Reach thousands of customers in Phulpur area.</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 items-start">
        <Info className="text-blue-500 flex-shrink-0" size={20} />
        <p className="text-xs text-blue-700 font-medium leading-relaxed">
          আপনার ব্যবসার তথ্য সঠিক এবং পূর্ণাঙ্গ ভাবে প্রদান করুন। অসম্পূর্ণ তথ্য থাকলে আবেদনটি বাতিল হতে পারে। পরবর্তী ৪৮ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করা হতে পারে।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Business Name (ব্যবসায়ের নাম)</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Phulpur Pharmacy"
              className={`w-full bg-gray-50 dark:bg-slate-800 border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100 dark:border-slate-700'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white`}
            />
            {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Category (ধরন)</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full bg-gray-50 dark:bg-slate-800 border ${errors.category ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100 dark:border-slate-700'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none dark:text-white`}
            >
              <option value="">ক্যাটাগরি সিলেক্ট করুন</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500 font-bold">{errors.category}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Mobile Number (মোবাইল নম্বর)</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="01xxxxxxxxx"
              className={`w-full bg-gray-50 dark:bg-slate-800 border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100 dark:border-slate-700'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white`}
            />
            {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Address (ঠিকানা)</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Phulpur Bazar, Mymensingh"
              className={`w-full bg-gray-50 dark:bg-slate-800 border ${errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100 dark:border-slate-700'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white`}
            />
            {errors.address && <p className="text-xs text-red-500 font-bold">{errors.address}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Opening Time (খোলার সময়)</label>
            <input
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              type="time"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Closing Time (বন্ধ হওয়ার সময়)</label>
            <input
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              type="time"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Website URL (ওয়েবসাইট লিংক - অপশনাল)</label>
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            type="url"
            placeholder="https://example.com"
            className={`w-full bg-gray-50 dark:bg-slate-800 border ${errors.website ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100 dark:border-slate-700'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white`}
          />
          {errors.website && <p className="text-xs text-red-500 font-bold">{errors.website}</p>}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-3xl space-y-4 border border-gray-100 dark:border-slate-700">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Social Media Links (সোশ্যাল মিডিয়া)</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Facebook</label>
              <input
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                type="text"
                placeholder="Username/Link"
                className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Instagram</label>
              <input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Twitter</label>
              <input
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Description (বিবরণ)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="আপনার ব্যবসার সেবা সম্পর্কে বিস্তারিত লিখুন..."
            className={`w-full bg-gray-50 dark:bg-slate-800 border ${errors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100 dark:border-slate-700'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none dark:text-white`}
          />
          {errors.description && <p className="text-xs text-red-500 font-bold">{errors.description}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Upload Image (ছবি আপলোড করুন)</label>
          <div className="border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-[2rem] p-8 text-center bg-gray-50 dark:bg-slate-800/50 group hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
             <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-gray-400 group-hover:text-primary shadow-sm mb-4 transition-colors">
                <UploadCloud size={32} />
             </div>
             <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Click to upload or drag & drop</p>
             <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG or JPEG (Max 5MB)</p>
             <input type="file" className="hidden" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-4 bg-primary text-white rounded-2xl font-extrabold text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all transform active:scale-95 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              প্রক্রিয়া করা হচ্ছে...
            </>
          ) : 'আবেদন জমা দিন'}
        </button>

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
           ADMIN APPROVAL REQUIRED
        </p>
      </form>
    </div>
  );
}
