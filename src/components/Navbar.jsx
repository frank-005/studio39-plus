import { motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import navigation from '../data/navigation';

function ThemeToggle({ theme, onToggle, className = '' }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      className={`theme-toggle inline-flex items-center ${isDark ? 'is-dark' : ''} ${className}`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:uppercase focus:tracking-[0.2em] focus:text-ivory">
        Skip to content
      </a>
      <div className="content-container flex min-h-20 items-center justify-between">
        <Link to="/" className="site-nav-brand" aria-label="Studio 39+ home">
          Studio 39+
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink key={item.label} to={item.href} className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="site-nav-book" aria-label="Book an architecture consultation">
            Book
          </Link>
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="ml-3" />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="site-nav-menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          id="mobile-navigation"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="site-nav-mobile md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="content-container flex flex-col gap-2 py-5">
            {navigation.map((item) => (
              <NavLink key={item.label} to={item.href} className={({ isActive }) => `site-nav-mobile-link ${isActive ? 'is-active' : ''}`} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="site-nav-mobile-book">
              Book Consultation
            </Link>
          </div>
        </motion.nav>
      )}
    </header>
  );
}

export default Navbar;
