import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiCheckCircle } from 'react-icons/fi';

const ResumeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    purpose: 'Just Viewing',
    message: ''
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-resume-modal', handleOpen);
    return () => window.removeEventListener('open-resume-modal', handleOpen);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network request for UI/UX (Frontend-only state)
    setTimeout(() => {
        console.log('Form data submitted: ', formData);
        setSuccess(true);
        setLoading(false);
        
        setTimeout(() => {
            // Close and reset
            setIsOpen(false);
            setSuccess(false);
            setFormData({
                name: '',
                email: '',
                company: '',
                purpose: 'Just Viewing',
                message: ''
            });
        }, 2000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md p-6 overflow-hidden rounded-2xl bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 shadow-2xl relative"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute p-2 text-white/60 transition-colors rounded-full top-4 right-4 hover:bg-white/10 hover:text-white"
            >
              <FiX size={20} />
            </button>

            {success ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <FiCheckCircle size={48} className="mb-4 text-green-400" />
                <h3 className="mb-2 text-2xl font-bold text-white">Thank You!</h3>
                <p className="text-white/70">Details submitted successfully!</p>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold leading-tight text-white">Download Resume</h2>
                  <p className="text-sm text-white/60">Please share a few details to access my resume.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-white/80">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-white/80">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-white/80">Company (Optional)</label>
                    <input 
                      type="text" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-2.5 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-white/80">Purpose</label>
                    <select 
                      name="purpose" 
                      value={formData.purpose} 
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all [&>option]:bg-slate-800"
                    >
                      <option value="Just Viewing">Just Viewing</option>
                      <option value="Hiring">Hiring / Recruiting</option>
                      <option value="Collaboration">Project Collaboration</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-white/80">Message (Optional)</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange}
                      placeholder="Hi, I'd like to get in touch..."
                      rows={3}
                      className="w-full px-4 py-2.5 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder:text-white/30 resize-none"
                    />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button 
                      type="button" 
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-3 font-semibold text-white transition-all bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 flex items-center justify-center py-3 font-semibold text-white transition-all bg-gradient-to-r from-purple-500 text-sm to-pink-500 rounded-xl hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit
                          <FiCheckCircle className="ml-2 transition-transform group-hover:scale-110" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
