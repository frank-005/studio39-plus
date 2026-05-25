import { Link } from 'react-router-dom';
import { site } from '../data/site';
import services from '../data/services';
import projects from '../data/projects';

function Footer() {
  return (
    <footer className="bg-charcoal text-sand">
      <div className="content-container border-t border-mist/40 pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.75fr_.75fr_.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-ivory">Studio 39+</p>
            <p className="mt-5 max-w-lg text-sm leading-8 text-sand/82">
              Architects in Nairobi for crafted residences, boutique hospitality, safari camp concepts, interiors, and architectural visualization across Kenya and East Africa.
            </p>
            <p className="mt-7 max-w-md text-base leading-8 text-ivory">
              Currently accepting selected hospitality and residential projects across East Africa.
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-sm text-sand/82" aria-label="Footer services">
            <p className="eyebrow text-sand">Services</p>
            {services.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`} className="hover:text-ivory">
                {service.shortTitle}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3 text-sm text-sand/82" aria-label="Footer projects">
            <p className="eyebrow text-sand">Projects</p>
            {projects.slice(0, 4).map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="hover:text-ivory">
                {project.name}
              </Link>
            ))}
          </nav>

          <div className="space-y-8">
            <address className="not-italic text-sm leading-8 text-sand/82">
              <p className="eyebrow mb-3 text-sand">Contact</p>
              Nairobi, Kenya<br />
              <a href={`mailto:${site.email}`} className="hover:text-ivory">{site.email}</a><br />
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="hover:text-ivory">WhatsApp / {site.displayPhone}</a>
            </address>
            <nav className="flex flex-col gap-3 text-sm text-sand/82" aria-label="Footer sitemap">
              <p className="eyebrow text-sand">Sitemap</p>
              <Link to="/" className="hover:text-ivory">Home</Link>
              <Link to="/about" className="hover:text-ivory">About</Link>
              <Link to="/projects" className="hover:text-ivory">Portfolio</Link>
              <Link to="/services" className="hover:text-ivory">Services</Link>
              <Link to="/contact" className="hover:text-ivory">Contact</Link>
            </nav>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em] text-sand/72">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-ivory">Instagram</a>
              <a href="https://www.behance.net/" target="_blank" rel="noreferrer" className="hover:text-ivory">Behance</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-ivory">LinkedIn</a>
            </div>
          </div>
        </div>
        <p className="mt-14 border-t border-ivory/10 pt-8 text-xs text-sand/60">© 2026 Studio 39+. Architecture, visualization, and editorial spatial experiences.</p>
      </div>
    </footer>
  );
}

export default Footer;
