import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-portfolio-bg text-portfolio-text font-sans selection:bg-portfolio-accent/20">
      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Main Navbar */}
      <Navbar />

      {/* Content wrapper */}
      <main className="flex-grow flex flex-col justify-center">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
