import React, { useRef, useEffect, useState } from 'react';

const socials = [
  { icon: '🐙', label: 'GitHub', href: 'https://github.com/goel-nandini' },
  { icon: '💼', label: 'LinkedIn', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
  { icon: '📧', label: 'Email', href: 'mailto:nandini@email.com' },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="section" id="contact" ref={sectionRef}
      style={{ background: 'rgba(108,99,255,0.03)' }}
    >
      <div className="fade-in-up">
        <p className="section-tag">— Get In Touch</p>
        <h2 className="section-title">Contact Me</h2>
        <div className="section-divider" />
      </div>

      <div className="contact-wrap">
        {/* Left */}
        <div className="contact-info fade-in-up">
          <h3>Let's work together!</h3>
          <p>
            Whether you have a project in mind, an opportunity to discuss, or just want to say hi — my inbox is always open. I'll do my best to respond!
          </p>

          {/* Socials */}
          <div className="social-links">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                className="social-link"
                id={`social-${s.label.toLowerCase()}`}
                target={s.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Contact info pills */}
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { icon: '📧', text: 'nandini@email.com' },
              { icon: '📍', text: 'India' },
              { icon: '⏰', text: 'Available for freelance & internships' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', fontFamily: 'var(--font-secondary)' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="glass-card fade-in-up" style={{ padding: '2.5rem' }}>
          {sent && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,212,255,0.1))',
              border: '1px solid var(--grad-start)',
              borderRadius: 12, padding: '1rem',
              marginBottom: '1.5rem',
              color: 'var(--grad-end)',
              fontFamily: 'var(--font-secondary)',
              fontSize: 'var(--fs-small)',
              fontWeight: 600,
              textAlign: 'center'
            }}>
              ✅ Message sent! I'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder=" "
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              <label htmlFor="contact-name">Your Name</label>
            </div>

            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="contact-email">Email Address</label>
            </div>

            {/* Message */}
            <div className="form-group">
              <textarea
                id="contact-message"
                name="message"
                placeholder=" "
                value={form.message}
                onChange={handleChange}
                required
              />
              <label htmlFor="contact-message">Your Message</label>
            </div>

            <button
              type="submit"
              id="contact-send-btn"
              className="btn btn-primary"
              style={{ width: '100%', fontSize: 'var(--fs-body)' }}
            >
              Send Message ✦
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
