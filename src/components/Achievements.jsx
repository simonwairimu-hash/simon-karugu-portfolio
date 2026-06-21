import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AchievementCard from './AchievementCard';
import { achievementsData } from '../data/achievements';

const Achievements = () => {
  return (
    <section className="relative w-full py-16 lg:py-24 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/30 dark:bg-slate-950/10 overflow-hidden">
      {/* Background Grid Pattern Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
      
      {/* Decorative ambient radial gradients */}
      <div className="absolute top-10 right-[-10%] w-[350px] h-[350px] rounded-full bg-portfolio-accent/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[350px] h-[350px] rounded-full bg-violet-600/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Highlights</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-extrabold text-portfolio-text"
          >
            Professional <span className="bg-gradient-to-r from-portfolio-accent to-sky-400 bg-clip-text text-transparent">Highlights</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-portfolio-muted font-light max-w-2xl mt-4 text-sm md:text-base leading-relaxed mx-auto"
          >
            Key achievements, technical expertise, and business impact delivered through data, technology, and operational excellence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 64 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-1 bg-portfolio-accent mt-4 rounded-full mx-auto"
          />
        </div>

        {/* Responsive Staggered Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievementsData.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
