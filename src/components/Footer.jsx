import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-charcoal text-sand">
      <div className="content-container border-t border-mist pt-10 pb-20 sm:pt-12 sm:pb-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-sand/80">Studio 39+</p>
            <p className="mt-4 max-w-lg text-sm leading-8 text-sand/80">A modern architecture studio focused on crafted spaces, material clarity, and thoughtful atmospheres.</p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-sand/80">
            <Link to="/contact" className="hover:text-ivory">Contact</Link>
            <a href="mailto:studio39ke@gmail.com" className="hover:text-ivory">studio39ke@gmail.com</a>
            <a href="tel:+254703906562" className="hover:text-ivory">+254 703 906 562</a>
          </div>
        </div>
        <p className="mt-12 text-xs text-sand/60">© 2026 Studio 39+. Designed with intention for architecture, visualization, and editorial experiences.</p>
      </div>
    </footer>
  );
}

export default Footer;
