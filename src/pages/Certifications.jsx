import { motion } from 'framer-motion';
import { useCertifications } from '../hooks/useSupabase';
import { Award, Calendar, ExternalLink, ShieldCheck, FileBadge, Loader } from 'lucide-react';

const Certifications = () => {
  const { data: certifications, loading, error } = useCertifications();

  // Helper to determine badge color & icon styling based on issuer name
  const getIssuerStyle = (issuer = '') => {
    const name = issuer.toLowerCase();
    if (name.includes('google')) {
      return {
        bg: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
        glow: 'group-hover:border-sky-400/40',
        icon: <ShieldCheck className="w-6 h-6 text-sky-400" />
      };
    }
    if (name.includes('microsoft')) {
      return {
        bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
        glow: 'group-hover:border-indigo-400/40',
        icon: <Award className="w-6 h-6 text-indigo-400" />
      };
    }
    if (name.includes('cisco')) {
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        glow: 'group-hover:border-emerald-400/40',
        icon: <FileBadge className="w-6 h-6 text-emerald-400" />
      };
    }
    return {
      bg: 'bg-portfolio-accent/10 border-portfolio-accent/20 text-portfolio-accent',
      glow: 'group-hover:border-portfolio-accent/40',
      icon: <Award className="w-6 h-6 text-portfolio-accent" />
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-76px)] bg-portfolio-bg py-16 lg:py-24 overflow-hidden">
      {/* Restrained Ambient Radial Glow */}
      <div className="absolute top-40 left-[-10%] w-[500px] h-[500px] rounded-full bg-portfolio-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        {/* Page Header */}
        <div className="text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-portfolio-text"
          >
            Licenses & <span className="bg-gradient-to-r from-portfolio-accent to-sky-400 bg-clip-text text-transparent">Certifications</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-portfolio-muted leading-relaxed font-light mt-3 max-w-2xl"
          >
            A collection of professional credentials, course achievements, and technology certifications verifying my capabilities and skills.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 64 }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-portfolio-accent mt-4 rounded-full"
          />
        </div>

        {/* Dynamic content rendering */}
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <Loader className="w-8 h-8 text-portfolio-accent animate-spin" />
            <p className="text-xs text-portfolio-muted font-mono">Loading credentials...</p>
          </div>
        ) : error ? (
          <div className="card-surface p-8 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
            <h3 className="font-display font-bold text-rose-400 text-lg">Failed to load certifications</h3>
            <p className="text-xs text-portfolio-muted leading-relaxed font-light">
              We encountered a network error while retrieving database credentials from Supabase.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {certifications.map((cert) => {
              const style = getIssuerStyle(cert.issuer);
              return (
                <motion.div
                  key={cert.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`group relative card-surface rounded-2xl p-6 shadow-xl hover:shadow-portfolio-accent/5 hover:border-portfolio-accent/30 transition-all duration-300`}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon Badge */}
                    <div className={`p-3.5 rounded-xl shrink-0 ${style.bg} transition-all duration-300 border border-transparent ${style.glow}`}>
                      {style.icon}
                    </div>

                    {/* Details content */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-display font-bold text-portfolio-text text-base md:text-lg leading-snug group-hover:text-portfolio-accent transition-colors duration-200">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-portfolio-muted font-mono mt-1 flex items-center gap-1.5 font-medium">
                          <span>{cert.issuer}</span>
                        </p>
                      </div>

                      {/* Meta information row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-portfolio-muted border-t border-slate-200/50 dark:border-slate-800/60 pt-3">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-portfolio-accent" />
                          Issued: {cert.issue_date}
                        </span>
                        {cert.credential_id && (
                          <span className="font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded text-[10px]">
                            ID: {cert.credential_id}
                          </span>
                        )}
                      </div>

                      {/* Verify external link button */}
                      {cert.credential_url && cert.credential_url !== '#' && (
                        <div className="pt-2">
                          <a
                            href={cert.credential_url.startsWith('#http') ? cert.credential_url.substring(1) : cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold font-mono text-portfolio-accent hover:text-sky-400 hover:underline transition-all"
                          >
                            Verify Credential
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {certifications.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-12 text-portfolio-muted font-light text-sm">
                No certifications currently loaded.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
