import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const ResumeDownload = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    company: '',
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Submit data to backend
      await axios.post('http://localhost:5000/api/resume-download', formData);
      
      // 2. Trigger actual resume download
      const resumeUrl = 'https://drive.google.com/drive/folders/15gCxWkXFePcOB59kA3BneouQbcVhuJYf'; 
      window.open(resumeUrl, '_blank');

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-download-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      padding: '2rem'
    }}>
      <ParticleBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '3rem',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          zIndex: 10
        }}
      >
        {success ? (
          <div style={{ textAlign: 'center' }}>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ fontSize: '4rem', marginBottom: '1rem' }}
            >
              ✅
            </motion.div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Thank You!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your resume is downloading. We've also sent a copy to your email.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
              Redirecting you back...
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ 
              color: 'var(--text-primary)', 
              fontSize: '2rem', 
              marginBottom: '0.5rem',
              textAlign: 'center'
            }}>
              Download Resume
            </h2>
            <p style={{ 
              color: 'var(--text-secondary)', 
              textAlign: 'center', 
              marginBottom: '2rem' 
            }}>
              Please provide your details to proceed with the download.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="company"
                  placeholder="Company / Organization"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="form-input"
                  style={{ appearance: 'none' }}
                >
                  <option value="">Select Purpose</option>
                  <option value="hiring">Hiring / Recruitment</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="networking">Networking</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {loading ? 'Processing...' : 'Download Resume'}
              </motion.button>
              
              <button 
                type="button" 
                onClick={() => navigate('/')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-secondary)', 
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                ← Back to Portfolio
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ResumeDownload;
