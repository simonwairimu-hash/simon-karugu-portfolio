import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';
import { useTestimonials } from '../hooks/useSupabase';

const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getGradient = (name) => {
  const gradients = [
    "from-sky-500 to-indigo-500",
    "from-emerald-500 to-teal-500",
    "from-purple-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500"
  ];
  if (!name) return gradients[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

const Testimonials = () => {
  const { data: dbTestimonials } = useTestimonials();
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (dbTestimonials && dbTestimonials.length > 0) {
      const processed = dbTestimonials.map(t => ({
        ...t,
        initials: getInitials(t.name),
        gradient: getGradient(t.name)
      }));
      setTestimonials(processed);
    }
  }, [dbTestimonials]);

  useEffect(() => {
    setIndex(0);
  }, [testimonials]);

  // Navigators with infinite loop logic
  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  // Touch swipe helper for Framer Motion drag gestures
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Autoplay 5-second timer
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, index, testimonials]); // Re-run effect when index, hover, or testimonials change

  const current = testimonials[index] || testimonialsData[0];

  // Slide transitions variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 120, damping: 18 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 120, damping: 18 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <div className="relative w-full py-16 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/30 dark:bg-slate-950/20 overflow-hidden">
      {/* Decorative radial blur blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-portfolio-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        {/* Title header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-portfolio-text">
            Client <span className="bg-gradient-to-r from-portfolio-accent to-sky-400 bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <p className="text-xs text-portfolio-muted font-light mt-2">
            Feedback and reviews from operations leaders, supervisors, and project clients.
          </p>
          <div className="h-1 w-14 bg-portfolio-accent mt-3 rounded-full mx-auto" />
        </div>

        {/* Carousel slide container */}
        <div 
          className="relative min-h-[380px] sm:min-h-[300px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="w-full cursor-grab active:cursor-grabbing"
            >
              {/* Glassmorphism Card design */}
              <div className="card-surface p-8 sm:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Quote background icon decor */}
                <Quote className="absolute top-6 right-8 w-24 h-24 text-slate-300 dark:text-slate-800 opacity-15 pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Left: Client Initial Avatar placeholder */}
                  <div className="shrink-0">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${current.gradient} flex items-center justify-center text-portfolio-bg font-display font-bold text-xl shadow-lg border border-white/10`}>
                      {current.initials}
                    </div>
                  </div>

                  {/* Right: Info and Text */}
                  <div className="flex-1 space-y-4 text-center sm:text-left">
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-display font-bold text-portfolio-text text-lg">
                            {current.name}
                          </h3>
                          <p className="text-xs text-portfolio-muted font-mono">
                            {current.position} @ <span className="text-slate-700 dark:text-slate-300 font-semibold">{current.company}</span>
                          </p>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center justify-center sm:justify-start gap-1">
                          {[...Array(current.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-sm text-portfolio-muted leading-relaxed font-light italic">
                      "{current.text}"
                    </p>
                  </div>
                </div>

                {/* Footer details inside card */}
                <div className="mt-8 pt-5 border-t border-theme flex items-center justify-between text-xs font-mono text-portfolio-muted">
                  <span>Swipe to navigate</span>
                  {/* Current index info badge */}
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-full font-bold text-portfolio-accent">
                    {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Controllers */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={handlePrev}
            className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-portfolio-accent/30 text-portfolio-muted hover:text-portfolio-accent rounded-full shadow-lg transition-all duration-300 transform active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-portfolio-accent' : 'w-2 bg-slate-300 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-portfolio-accent/30 text-portfolio-muted hover:text-portfolio-accent rounded-full shadow-lg transition-all duration-300 transform active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
