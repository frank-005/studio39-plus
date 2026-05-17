import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import navigation from '../data/navigation';

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-mist bg-ivory/85 backdrop-blur-lg dark:border-neutral-800 dark:bg-charcoal/80">
      <div className="content-container flex items-center justify-between py-4">
        <Link to="/" className="text-sm font-semibold tracking-[0.35em] uppercase text-charcoal dark:text-ivory">
          Studio 39+
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.25em] text-charcoal dark:text-ivory">
          {navigation.map((item) => (
            <Link key={item.label} to={item.href} className="hover:text-sage">
              {item.label}
            </Link>
          ))}
          <button onClick={toggleTheme} className="rounded-full border border-mist bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ivory transition hover:bg-[#3a372f] dark:border-mist dark:bg-sand dark:text-charcoal dark:hover:bg-[#d5cabc]">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="rounded-full border border-mist bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ivory transition hover:bg-[#3a372f] dark:border-mist dark:bg-sand dark:text-charcoal dark:hover:bg-[#d5cabc]">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
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
