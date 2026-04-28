import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Phone, MapPin, Clock, Share2, Heart, ShieldCheck, MessageSquare, PlusCircle, X, ChevronRight } from 'lucide-react';
import { mockBusinesses, categories } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export default function BusinessDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ date: '', time: '', note: '' });

  const business = mockBusinesses.find(b => b.id === id);

  if (!business) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Business Not Found</h2>
        <Link to="/services" className="text-primary font-bold">Back to services</Link>
      </div>
    );
  }

  const galleryImages = [
    business.image,
    `${business.image}&sig=1`,
    `${business.image}&sig=2`,
    `${business.image}&sig=3`,
  ];

  const category = categories.find(c => c.id === business.category);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking Appointment:', bookingData);
    alert('Appointment requested successfully!');
    setIsBookingModalOpen(false);
    setBookingData({ date: '', time: '', note: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.img
              key={galleryIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25 }}
              src={galleryImages[galleryIndex]}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            />

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            >
              <ChevronRight size={32} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === galleryIndex ? 'bg-primary w-4' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {isBookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-t-[2rem] sm:rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl mt-auto sm:mt-0"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Appointment</h3>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Date</label>
                  <input 
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Time</label>
                  <input 
                    type="time"
                    required
                    value={bookingData.time}
                    onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Brief Note</label>
                  <textarea 
                    required
                    placeholder="Short description of your inquiry..."
                    rows={3}
                    value={bookingData.note}
                    onChange={(e) => setBookingData(prev => ({ ...prev, note: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none resize-none dark:text-white"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all mt-4"
                >
                  Confirm Booking
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <Link to="/services" className="flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-primary transition-colors">
          <ChevronLeft size={24} />
          ফিরে যান
        </Link>
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-gray-100 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 rounded-full border border-gray-100 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <Heart size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setGalleryIndex(0);
              setSelectedImage(galleryImages[0]);
            }}
            className="aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-xl border border-white dark:border-slate-700 cursor-zoom-in"
          >
            <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
             {galleryImages.slice(1).map((img, i) => (
               <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setGalleryIndex(i + 1);
                  setSelectedImage(img);
                }}
                className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 border border-white dark:border-slate-700 shadow-sm cursor-zoom-in"
               >
                  <img src={img} alt="Gallery" className="w-full h-full object-cover grayscale-[0.2]" />
               </motion.div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${category?.color}`}>
               {category?.icon && <category.icon size={14} />}
               {category?.name}
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">{business.name}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 px-3 py-1 rounded-full text-xs font-bold">
                <Star size={14} fill="currentColor" />
                {business.rating} Rating
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-bold">
                <ShieldCheck size={14} />
                Verified Business
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{business.description}</p>

          <div className="grid gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-light dark:bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                   <Phone size={24} />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">Phone Number</p>
                   <p className="text-gray-900 dark:text-white font-bold">{business.phone}</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                   <MapPin size={24} />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">Address</p>
                   <p className="text-gray-900 dark:text-white font-bold">{business.address}</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                   <Clock size={24} />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">Operating Hours</p>
                   <p className="text-gray-900 dark:text-white font-bold">09:00 AM - 08:00 PM</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6">
            <motion.a 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.95 }}
               href={`tel:${business.phone}`} 
               className="flex-1 flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl transition-all text-base md:text-lg"
            >
               <Phone size={22} />
               এখনই কল দিন
            </motion.a>
            <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsBookingModalOpen(true)}
               className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all text-base md:text-lg"
            >
               <Clock size={22} />
               Book Appointment
            </motion.button>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <section className="space-y-4">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Location on Map</h3>
            {business.mapsLink && (
              <a 
                href={business.mapsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
              >
                <MapPin size={16} /> Open in Google Maps
              </a>
            )}
         </div>
         <div className="w-full h-[250px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-slate-800 border border-white dark:border-slate-700 shadow-lg">
            <iframe 
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14502.82436814088!2d90.3548!3d24.8454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37564d7800000001%3A0x7d0a0a0a0a0a0a0a!2sPhulpur%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd`} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Google Maps"
            ></iframe>
         </div>
      </section>

      {/* Reviews Section */}
      <section className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Ratings & Reviews</h3>
            <button className="text-primary text-sm font-bold flex items-center gap-1">
              <PlusCircle size={16} /> Write a Review
            </button>
         </div>
         <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-50 flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                 <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                       <h4 className="font-bold text-gray-900">Anonymous User</h4>
                       <div className="flex text-yellow-500">
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                       </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                       Excellent service! Very professional and helpful. Strongly recommended for everyone in Phulpur.
                    </p>
                    <div className="flex gap-4 pt-2">
                       <button className="text-xs text-gray-400 font-bold hover:text-primary flex items-center gap-1">
                          <MessageSquare size={12} /> Reply
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
