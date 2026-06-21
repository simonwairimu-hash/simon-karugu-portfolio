import { Link } from 'react-router-dom';
import { Mail, Heart } from 'lucide-react';
import { navLinks } from '../data/navigation';

// Local SVG brand icon definitions due to removal in recent lucide-react versions
const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);



const Footer = () => {
  const currentYear = new Date().getFullYear();

  const col1Links = navLinks.slice(0, 4);
  const col2Links = navLinks.slice(4);

  return (
    <footer className="bg-portfolio-bg border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display font-bold text-lg tracking-tight text-portfolio-text">
                Simon<span className="text-portfolio-accent">.Karugu()</span>
              </span>
            </Link>
            <p className="text-sm text-portfolio-muted leading-relaxed max-w-xs">
              An ICT Specialist & Data Analyst focused on database query optimization, python-based automation, and custom reporting interfaces.
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h3 className="text-sm font-semibold text-portfolio-text tracking-wider uppercase mb-4 font-display">
              Navigation
            </h3>
            <ul className="space-y-2">
              {col1Links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-portfolio-muted hover:text-portfolio-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-portfolio-text tracking-wider uppercase mb-4 font-display">
              Resources
            </h3>
            <ul className="space-y-2">
              {col2Links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-portfolio-muted hover:text-portfolio-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-sm font-semibold text-portfolio-text tracking-wider uppercase mb-4 font-display">
              Connect
            </h3>
            <div className="flex space-x-3 mb-4">
              <a
                href="https://github.com/simonwairimu-hash"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/50 hover:border-portfolio-accent/30 text-portfolio-muted hover:text-portfolio-accent rounded-lg transition-all duration-300"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:wairimusimon551@gmail.com"
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/50 hover:border-portfolio-accent/30 text-portfolio-muted hover:text-portfolio-accent rounded-lg transition-all duration-300"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-portfolio-muted">
              Available for full-time work and contracts.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-portfolio-muted">
          <p>&copy; {currentYear} Simon Karugu. All rights reserved.</p>
          <p className="flex items-center mt-2 sm:mt-0">
            Built with React & Tailwind
            <Heart className="w-3.5 h-3.5 text-portfolio-accent fill-portfolio-accent mx-1.5 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
