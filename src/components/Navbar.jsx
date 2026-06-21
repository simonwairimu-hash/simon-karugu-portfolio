import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-portfolio-bg/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-lg shadow-black/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/50 group-hover:border-portfolio-accent/50 transition-colors duration-300">
              <Terminal className="w-5 h-5 text-portfolio-accent transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-portfolio-text group-hover:text-portfolio-accent transition-colors duration-300">
              Simon<span className="text-portfolio-accent">.Karugu()</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-portfolio-accent font-semibold' : 'text-portfolio-muted hover:text-portfolio-text'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-portfolio-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Contact Button / CTA (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/contact"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-br from-portfolio-accent to-[#0ea5e9] text-portfolio-text hover:text-portfolio-bg focus:ring-2 focus:outline-none focus:ring-portfolio-accent/30 transition-all duration-300"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-portfolio-bg rounded-full group-hover:bg-opacity-0 text-xs font-semibold">
                Get in Touch
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-portfolio-muted hover:text-portfolio-text bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 transition-all duration-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-5 w-5" aria-hidden="true" /> : <Menu className="block h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-portfolio-bg/95 backdrop-blur-lg overflow-hidden"
            id="mobile-menu"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full text-center"
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-3 py-3 text-base font-semibold border-b border-slate-200/50 dark:border-slate-800/40 transition-colors duration-200 ${
                        isActive ? 'text-portfolio-accent bg-slate-200/50 dark:bg-slate-800/40 rounded-xl' : 'text-portfolio-muted hover:text-portfolio-text hover:bg-slate-200/20 dark:hover:bg-slate-800/20 rounded-xl'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="w-full pt-4 px-3"
              >
                <Link
                  to="/contact"
                  className="block w-full text-center py-3 bg-gradient-to-r from-portfolio-accent to-[#0ea5e9] text-portfolio-bg font-semibold rounded-xl hover:shadow-lg hover:shadow-portfolio-accent/20 transition-all duration-300 text-sm"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
