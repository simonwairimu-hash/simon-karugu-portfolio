import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Terminal,
  BarChart3,
  Boxes,
  Cpu,
  Sparkles
} from 'lucide-react';

// Custom inline SVG GitHub icon to bypass package version differences
const GithubIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Contact Info Data
  const contactInfo = [
    {
      id: 'email',
      title: 'Email Address',
      value: 'wairimusimon551@gmail.com',
      href: 'mailto:wairimusimon551@gmail.com',
      icon: <Mail className="w-5 h-5 text-sky-400" />,
      color: 'border-sky-500/20 bg-sky-500/5 hover:border-sky-400/50'
    },
    {
      id: 'phone',
      title: 'Phone Number',
      value: '+254 702 415 184',
      href: 'tel:+254702415184',
      icon: <Phone className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-400/50'
    },
    {
      id: 'location',
      title: 'Location',
      value: 'Kiambu, Kenya',
      href: 'https://maps.google.com/?q=Kiambu,Kenya',
      icon: <MapPin className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/20 bg-purple-500/5 hover:border-purple-400/50'
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      value: 'github.com/simonwairimu-hash',
      href: 'https://github.com/simonwairimu-hash',
      icon: <GithubIcon className="w-5 h-5 text-pink-400" />,
      color: 'border-pink-500/20 bg-pink-500/5 hover:border-pink-400/50'
    }
  ];

  // Availability Areas
  const availabilityItems = [
    { name: 'Data Analysis Projects', icon: <BarChart3 className="w-4 h-4 text-sky-400" /> },
    { name: 'Dashboard Development', icon: <Terminal className="w-4 h-4 text-portfolio-accent" /> },
    { name: 'ICT Support Roles', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { name: 'Inventory Management Systems', icon: <Boxes className="w-4 h-4 text-purple-400" /> },
    { name: 'Freelance Consulting', icon: <Briefcase className="w-4 h-4 text-amber-400" /> }
  ];

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Simple Email Pattern Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // Simulate database write or API post
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  // Stagger Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="relative min-h-screen bg-portfolio-bg py-16 lg:py-24 overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-portfolio-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        
        {/* SECTION 1: HERO */}
        <div className="text-center lg:text-left mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-portfolio-text"
          >
            Let's <span className="bg-gradient-to-r from-portfolio-accent to-sky-400 bg-clip-text text-transparent">Work Together</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-portfolio-muted font-light max-w-2xl mt-4 text-base md:text-lg leading-relaxed mx-auto lg:mx-0"
          >
            Whether you're looking for a Data Analyst, ICT Professional, or someone to help automate business processes, I'd love to hear from you.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 64 }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-portfolio-accent mt-4 rounded-full mx-auto lg:mx-0"
          />
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDE COLUMN: Info Cards & Availability Card */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="col-span-1 lg:col-span-5 space-y-6"
          >
            {/* SECTION 2: CONTACT INFORMATION CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.id}
                  href={info.href}
                  target={info.id === 'github' || info.id === 'location' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 backdrop-blur-sm group ${info.color}`}
                >
                  <div className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl group-hover:border-portfolio-accent/30 transition-colors">
                    {info.icon}
                  </div>
                  <div className="space-y-1 font-sans">
                    <h4 className="text-xs font-semibold text-portfolio-muted tracking-wider uppercase">
                      {info.title}
                    </h4>
                    <p className="text-sm font-semibold text-portfolio-text break-all group-hover:text-portfolio-accent transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* SECTION 4: AVAILABILITY CARD */}
            <motion.div 
              variants={itemVariants}
              className="card-surface rounded-2xl p-6 shadow-xl"
            >
              <h3 className="font-display font-bold text-portfolio-text text-base mb-5 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Currently Available For
              </h3>
              <ul className="space-y-3">
                {availabilityItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-portfolio-muted font-light">
                    <div className="p-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/85 rounded-lg shrink-0">
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE COLUMN: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.2 }}
            className="col-span-1 lg:col-span-7 card-surface rounded-3xl p-8 sm:p-10 shadow-2xl relative"
          >
            <AnimatePresence mode="wait">
              {!success ? (
                // SECTION 3: FORM VIEW
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-display font-bold text-portfolio-text">
                      Send a Message
                    </h3>
                    <p className="text-xs text-portfolio-muted font-light mt-1">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">Full Name</label>
                      <input
                        type="text"
                        disabled={loading}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="block w-full px-4 py-3.5 bg-slate-100/50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 focus:border-portfolio-accent/40 rounded-xl text-sm text-portfolio-text placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">Email Address</label>
                      <input
                        type="email"
                        disabled={loading}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="johndoe@example.com"
                        className="block w-full px-4 py-3.5 bg-slate-100/50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 focus:border-portfolio-accent/40 rounded-xl text-sm text-portfolio-text placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Subject field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">Subject</label>
                      <input
                        type="text"
                        disabled={loading}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Collaboration"
                        className="block w-full px-4 py-3.5 bg-slate-100/50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 focus:border-portfolio-accent/40 rounded-xl text-sm text-portfolio-text placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">Message</label>
                      <textarea
                        rows={4}
                        disabled={loading}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your project, timeline, or query details..."
                        className="block w-full px-4 py-3.5 bg-slate-100/50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 focus:border-portfolio-accent/40 rounded-xl text-sm text-portfolio-text placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors resize-none disabled:opacity-50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-portfolio-accent text-portfolio-bg font-bold rounded-xl hover:shadow-lg hover:shadow-portfolio-accent/10 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-75 disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-portfolio-bg border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                // SUCCESS STATE VIEW
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-5"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-portfolio-text">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-portfolio-muted font-light max-w-sm leading-relaxed">
                      Thank you for getting in touch! Your message has been successfully sent. Simon will get back to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-portfolio-text text-sm font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-200 shadow-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
