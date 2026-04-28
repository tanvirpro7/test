import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, DollarSign, Clock, ArrowRight, Bookmark } from 'lucide-react';
import { mockJobs } from '../constants';
import JobApplicationModal from '../components/JobApplicationModal';

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState<{ id: string; title: string; company: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Career Board</h2>
          <p className="text-sm text-gray-500 font-medium dark:text-gray-400">Find local job opportunities in Phulpur area.</p>
        </div>
        <div className="flex gap-3">
           <div className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-extrabold">
              {mockJobs.length} Positions Available
           </div>
        </div>
      </div>

      <div className="grid gap-6">
        {mockJobs.map((job) => (
          <div key={job.id} alt={`Job Card for ${job.title}`} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all hover:border-primary/20 group">
            <div className="flex gap-5 items-center">
               <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                  <Briefcase size={28} />
               </div>
               <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                     <div className="flex items-center gap-1.5 font-medium">
                        <Building2 size={14} className="text-gray-400 dark:text-gray-500" />
                        {job.company}
                     </div>
                     <div className="flex items-center gap-1.5 font-medium text-primary">
                        <DollarSign size={14} />
                        {job.salary}
                     </div>
                     <div className="flex items-center gap-1.5 font-medium">
                        <Clock size={14} className="text-gray-400 dark:text-gray-500" />
                        {job.type}
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-3">
               <button className="p-3 rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 transition-colors">
                  <Bookmark size={20} />
               </button>
               <button 
                onClick={() => handleApply(job)}
                className="flex-1 md:flex-initial px-8 py-3 bg-primary text-white rounded-2xl font-extrabold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform active:scale-95"
               >
                  Apply Now
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-[2.5rem] p-8 md:p-12 text-center space-y-6 transition-colors">
         <h3 className="text-2xl font-extrabold text-orange-900 dark:text-orange-400">Are you an Employer?</h3>
         <p className="max-w-xl mx-auto text-orange-700/80 dark:text-orange-300/80 font-medium">
            Phulpur-এর ব্যবসায়ীরা ফ্রিতে চাকরির বিজ্ঞাপন পোস্ট করতে পারেন। দক্ষ কর্মী খুঁজে নিন আপনার ব্যবসার জন্য।
         </p>
         <button className="px-10 py-4 bg-orange-500 text-white rounded-full font-extrabold shadow-xl shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95 flex items-center gap-2 mx-auto">
            চাকরির বিজ্ঞাপন দিন <ArrowRight size={20} />
         </button>
      </div>

      <JobApplicationModal 
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
