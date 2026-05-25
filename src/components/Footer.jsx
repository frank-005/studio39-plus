import { Link } from 'react-router-dom';
import { site } from '../data/site';

function Footer() {
  return (
    <footer className="bg-charcoal text-sand">
      <div className="content-container border-t border-mist pt-10 pb-20 sm:pt-12 sm:pb-24">
        <div className="grid gap-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sand/80">Studio 39+</p>
            <p className="mt-4 max-w-lg text-sm leading-8 text-sand/80">
              Architects in Nairobi for crafted residences, boutique hospitality, safari lodge concepts, interiors, and architectural visualization across Kenya.
            </p>
          </div>
          <nav className="flex flex-col gap-3 text-sm text-sand/80" aria-label="Footer navigation">
            <Link to="/projects" className="hover:text-ivory">Architecture Portfolio</Link>
            <Link to="/services" className="hover:text-ivory">Services</Link>
            <Link to="/about" className="hover:text-ivory">About</Link>
            <Link to="/contact" className="hover:text-ivory">Contact</Link>
          </nav>
          <address className="not-italic text-sm leading-8 text-sand/80">
            Imaara Mall<br />
            Nairobi, Kenya<br />
            <a href={`mailto:${site.email}`} className="hover:text-ivory">{site.email}</a><br />
            <a href={`tel:${site.phone}`} className="hover:text-ivory">{site.displayPhone}</a>
          </address>
        </div>
        <p className="mt-12 text-xs text-sand/60">© 2026 Studio 39+. Designed with intention for architecture, visualization, and editorial experiences.</p>
      </div>
    </footer>
  );
}

export default Footer;
