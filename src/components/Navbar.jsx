import { motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import navigation from '../data/navigation';
import { site } from '../data/site';
import { trackEmailClick, trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

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
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

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

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableSelector = 'a[href], button:not([disabled])';
    const focusable = menuRef.current?.querySelectorAll(focusableSelector);
    focusable?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key !== 'Tab' || !menuRef.current) return;

      const items = Array.from(menuRef.current.querySelectorAll(focusableSelector));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:uppercase focus:tracking-[0.2em] focus:text-ivory">
        Skip to content
      </a>
      <div className="content-container site-nav-inner flex items-center justify-between">
        <Link to="/" className="site-nav-brand" aria-label="Studio 39+ home">
          Studio 39+
        </Link>

        <nav className="hidden lg:flex items-center gap-10" aria-label="Primary navigation">
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

        <div className={`site-nav-mobile-controls flex items-center lg:hidden ${open ? 'hidden' : ''}`}>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(!open)}
            className="site-nav-menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span aria-hidden="true" className="menu-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          ref={menuRef}
          id="mobile-navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="site-nav-mobile lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="content-container relative flex min-h-[100svh] flex-col">
            <div className="site-nav-mobile-header relative flex items-center justify-center py-8 px-4">
              <div className="site-nav-mobile-brand-group flex flex-col items-center gap-2">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="site-nav-mobile-brand"
                  aria-label="Studio 39+ home"
                >
                  Studio 39+
                </Link>
                <span className="site-nav-mobile-tagline">Architecture Studio</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="site-nav-mobile-close"
                aria-label="Close navigation menu"
              >
                <span aria-hidden="true" className={`menu-icon ${open ? 'is-open' : ''}`}>
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>

            <div className="site-nav-mobile-links flex flex-1 flex-col items-center justify-center gap-10 text-center px-6">
              {navigation.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) => `site-nav-mobile-link ${isActive ? 'is-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="site-nav-mobile-footer grid gap-3 border-t border-charcoal/10 py-7 text-center text-xs uppercase tracking-[0.22em] text-charcoal/68 dark:border-ivory/10 dark:text-sand">
              <Link to="/contact" onClick={() => setOpen(false)} className="site-nav-mobile-book">
                Start a Project
              </Link>
              <div className="flex items-center justify-center gap-5 pt-2">
                <a href={site.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('mobile_nav')}>WhatsApp</a>
                <a href={`tel:${site.phone}`} onClick={() => trackPhoneClick('mobile_nav')}>Call</a>
                <a href={`mailto:${site.email}`} onClick={() => trackEmailClick('mobile_nav')}>Email</a>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  );
}

export default Navbar;
