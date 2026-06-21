import { motion } from 'framer-motion';

const ExperienceCard = ({ experience, index }) => {
  const { role, company, duration, description, highlights, tags, icon } = experience;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 15, 
        delay: index * 0.1 
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative card-surface hover:border-portfolio-accent/30 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-portfolio-accent/5 transition-all duration-300 w-full"
    >
      {/* Glow highlight on card hover */}
      <div className="absolute inset-0 bg-portfolio-accent/[0.01] group-hover:bg-portfolio-accent/[0.03] rounded-2xl transition-colors duration-300 pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Animated icon badge */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl text-portfolio-accent shadow-md transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <div>
            <h3 className="font-display font-bold text-portfolio-text text-lg sm:text-xl group-hover:text-portfolio-accent transition-colors duration-200">
              {role}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium font-display tracking-wide">
              {company}
            </p>
          </div>
        </div>

        {/* Date Duration Badge */}
        <span className="self-start sm:self-center px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-portfolio-accent text-xs font-mono font-semibold tracking-wider whitespace-nowrap shadow-inner">
          {duration}
        </span>
      </div>

      {/* Summary Narrative */}
      <p className="text-xs sm:text-sm text-portfolio-muted leading-relaxed mb-5 font-light">
        {description}
      </p>

      {/* Accomplishments Bullets */}
      <ul className="space-y-3 mb-6">
        {highlights.map((bullet, idx) => (
          <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            <span className="w-1.5 h-1.5 rounded-full bg-portfolio-accent mt-1.5 mr-3 shrink-0 group-hover:scale-125 transition-transform duration-300" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-800/60">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="text-[10px] font-mono px-2.5 py-1 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-portfolio-muted rounded-md hover:text-portfolio-accent hover:border-portfolio-accent/30 transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
