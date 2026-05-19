import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
      className={`inline-flex items-center rounded-full transition hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ivory dark:focus-visible:ring-offset-charcoal ${className}`}
    >
      <span
        className={`relative h-8 w-16 rounded-full border transition duration-300 ${
          isDark
            ? 'border-neutral-700 bg-neutral-900 shadow-[inset_0_0_8px_rgba(255,255,255,0.08)]'
            : 'border-neutral-300 bg-neutral-200 shadow-[inset_0_0_4px_rgba(47,44,40,0.14)]'
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full transition duration-300 ${
            isDark
              ? 'left-9 bg-neutral-600 shadow-[0_2px_8px_rgba(0,0,0,0.35)]'
              : 'left-1 bg-white shadow-[0_2px_6px_rgba(47,44,40,0.2)]'
          }`}
        />
      </span>
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light');

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-t border-charcoal/80 border-b border-charcoal/15 bg-ivory/85 backdrop-blur-lg dark:border-t-sand/70 dark:border-b-ivory/10 dark:bg-charcoal/80">
      <div className="content-container flex h-full items-center justify-between">
        <Link to="/" className="text-sm font-semibold tracking-[0.35em] uppercase text-charcoal dark:text-ivory">
          Studio 39+
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.25em] text-charcoal dark:text-ivory">
          {navigation.map((item) => (
            <Link key={item.label} to={item.href} className="hover:text-sage">
              {item.label}
            </Link>
          ))}
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="ml-5" />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button onClick={() => setOpen(!open)} className="text-sm uppercase tracking-[0.25em] text-charcoal dark:text-ivory">
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="border-t border-mist bg-sand/95 dark:border-neutral-800 dark:bg-charcoal/95 md:hidden">
          <div className="content-container flex flex-col gap-4 py-6 text-sm uppercase tracking-[0.25em] text-charcoal dark:text-ivory">
            {navigation.map((item) => (
              <Link key={item.label} to={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;
