import { motion } from 'framer-motion';
import { ExternalLink, Code2, AlertTriangle, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

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
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ProjectCard = ({ project, index, isFeatured = false }) => {
  const { title, description, technologies, githubUrl, demoUrl, type, story } = project;

  // Stagger entry animations
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 80, 
        damping: 15, 
        delay: isFeatured ? 0.1 : index * 0.05 
      }
    }
  };

  if (isFeatured) {
    // Featured flagship project layout (Full-width, Asymmetrical storytelling)
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative card-surface rounded-3xl p-8 sm:p-10 shadow-2xl hover:border-portfolio-accent/20 overflow-hidden"
      >
        {/* Hand-crafted decorative header */}
        <div className="absolute top-0 left-0 h-[3px] w-32 bg-portfolio-accent" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-portfolio-accent bg-portfolio-accent/10 px-3 py-1 rounded-full">
                  {type}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                  ★ Highlighted Project
                </span>
              </div>

              <h3 className="font-display font-black text-portfolio-text text-2xl sm:text-3xl leading-tight mb-4 select-none">
                {title}
              </h3>

              <p className="text-sm text-portfolio-muted leading-relaxed font-light">
                {description}
              </p>
            </div>

            <div>
              {/* Tech list */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-[9px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-portfolio-text bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 rounded-xl transition-all duration-200"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub Repository
                </a>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-portfolio-bg bg-portfolio-accent rounded-xl hover:shadow-lg hover:shadow-portfolio-accent/10 transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Prototype
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story blocks (Human storytelling) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* The Problem block */}
            <div className="p-5 bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-rose-500 dark:text-rose-400 font-mono text-[10px] uppercase font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>The Problem</span>
              </div>
              <p className="text-xs text-portfolio-muted leading-relaxed font-light">
                {story.problem}
              </p>
            </div>
 
            {/* The Solution block */}
            <div className="p-5 bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-mono text-[10px] uppercase font-bold">
                <Code2 className="w-4 h-4 shrink-0" />
                <span>What I Did</span>
              </div>
              <p className="text-xs text-portfolio-muted leading-relaxed font-light">
                {story.whatIDid}
              </p>
            </div>
 
            {/* The Challenge block */}
            <div className="p-5 bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 rounded-2xl space-y-2 sm:col-span-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-[10px] uppercase font-bold">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>The Hard Part (Challenges & Pitfalls)</span>
              </div>
              <p className="text-xs text-portfolio-muted leading-relaxed font-light">
                {story.challenge}
              </p>
            </div>
 
            {/* The Outcome block */}
            <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2 sm:col-span-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase font-bold">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>The Outcome</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                {story.outcome}
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    );
  }

  // Standard non-featured cards (Asymmetric size, clean flat surface design)
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6 }}
      className="group relative card-surface hover:border-portfolio-accent/20 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
    >
      <div>
        {/* Header tags */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block text-[9px] font-mono uppercase font-bold tracking-widest text-portfolio-accent bg-portfolio-accent/10 px-2.5 py-0.5 rounded-full">
            {type}
          </span>
          <span className="text-[9px] font-mono text-portfolio-muted uppercase">
            Story #{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-portfolio-text text-lg group-hover:text-portfolio-accent transition-colors duration-200 mb-4">
          {title}
        </h3>

        {/* Brief Narrative segments */}
        <div className="space-y-4 mb-6">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold text-rose-500 uppercase tracking-wider block">🚨 The Bottleneck</span>
            <p className="text-xs text-portfolio-muted leading-relaxed font-light">
              {story.problem}
            </p>
          </div>
          
          <div className="space-y-1 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider block">📈 The Improvement</span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
              {story.outcome}
            </p>
          </div>
        </div>
      </div>

      <div>
        {/* Technologies list */}
        <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-200 dark:border-slate-800">
          {technologies.map((tech) => (
            <span 
              key={tech} 
              className="text-[9px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action button triggers */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-semibold text-portfolio-text bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 rounded-lg transition-all duration-200"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-semibold text-portfolio-bg bg-portfolio-accent rounded-lg hover:shadow-md transition-all duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
