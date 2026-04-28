import React, { useState } from 'react';
import { X, Upload, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JobApplicationModalProps {
  job: {
    id: string;
    title: string;
    company: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobApplicationModal({ job, isOpen, onClose }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          coverLetter: '',
          resume: null,
        });
      }, 2000);
    }, 1500);
  };

  if (!isOpen || !job) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          {isSuccess ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Application Sent!</h3>
              <p className="text-gray-500 dark:text-gray-400">
                আপনার আবেদন সফলভাবে {job.company}-এ পৌঁছেছে। তারা আপনার সাথে যোগাযোগ করবে।
              </p>
            </div>
          ) : (
            <>
              <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-primary/5">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Apply for {job.title}</h3>
                  <p className="text-sm text-primary font-bold">{job.company}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                      placeholder="017XXX-XXXXXX"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                    Cover Letter
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white resize-none"
                    placeholder="Tell us why you are a good fit..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
                    Resume / CV
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                    />
                    <div className="w-full px-4 py-6 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-primary/30 transition-colors">
                      <Upload size={24} className="text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {formData.resume ? formData.resume.name : 'Upload Resume (PDF/DOCX)'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-extrabold shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Application <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
