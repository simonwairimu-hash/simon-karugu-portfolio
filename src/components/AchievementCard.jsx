import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Boxes, 
  BarChart3, 
  TrendingUp, 
  Cpu, 
  Terminal, 
  Award 
} from 'lucide-react';

const iconMap = {
  Boxes,
  BarChart3,
  TrendingUp,
  Cpu,
  Terminal,
  Award
};

// Sub-component to handle numbers count-up animation when in view
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse the numeric part (e.g. 1500, 3, 50, 20)
    const numericPart = parseInt(value, 10);
    if (isNaN(numericPart)) {
      // Non-numeric value (like "Multiple", "Ongoing")
      setCount(value);
      return;
    }

    // Get any non-numeric suffix (like "+", "%+", etc.)
    const suffix = value.replace(String(numericPart), '');

    let start = 0;
    const duration = 1500; // 1.5 seconds count duration
    const frameRate = 1000 / 60; // ~60fps
    const totalFrames = Math.round(duration / frameRate);
    const increment = numericPart / totalFrames;

    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      if (currentFrame >= totalFrames) {
        setCount(numericPart + suffix);
        clearInterval(timer);
      } else {
        const nextVal = Math.floor(increment * currentFrame);
        setCount(nextVal + suffix);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
};

const AchievementCard = ({ achievement, index }) => {
  const IconComponent = iconMap[achievement.iconName] || Award;

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
        delay: index * 0.1 // Stagger by index
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative card-surface p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-portfolio-accent/5 hover:border-portfolio-accent/30 overflow-hidden"
    >
      {/* Light glow pattern inside cards */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-portfolio-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-portfolio-accent/15 transition-all duration-500" />
      
      <div className="flex flex-col h-full justify-between relative z-10">
        <div>
          {/* Icon Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:border-portfolio-accent/20">
              <IconComponent className={`w-6 h-6 ${achievement.iconColor}`} />
            </div>
            
            {/* Title Category */}
            <span className="text-[10px] font-mono font-semibold tracking-wider text-portfolio-muted uppercase">
              Simon.Impact()
            </span>
          </div>

          {/* Value / Numeric Counter */}
          <h3 className="text-3xl font-display font-extrabold text-portfolio-text mb-2 select-none">
            <AnimatedCounter value={achievement.value} />
          </h3>

          {/* Achievement Title */}
          <h4 className="font-display font-bold text-sm text-portfolio-text group-hover:text-portfolio-accent transition-colors duration-200 mb-2">
            {achievement.title}
          </h4>
        </div>

        {/* Description */}
        <p className="text-xs text-portfolio-muted leading-relaxed font-light mt-2">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
