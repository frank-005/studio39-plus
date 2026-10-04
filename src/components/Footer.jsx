import { Link } from 'react-router-dom';
import { site } from '../data/site';
import services from '../data/services';
import projects from '../data/projects';
import { trackEmailClick, trackPhoneClick } from '../utils/analytics';
import ContentLink from './ContentLink';

function Footer() {
  return (
    <footer className="bg-charcoal text-sand">
      <div className="content-container border-t border-mist/40 pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.75fr_.75fr_.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-ivory">{site.name}</p>
            <p className="mt-5 max-w-lg text-sm leading-8 text-sand/82">
             Kenyan-based architects for bespoke residences, Interior Design, renovations, and site-led design.
            </p>
            <p className="mt-7 max-w-md text-base leading-8 text-ivory">
              Currently accepting selected residential commissions.
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
              {site.address.streetAddress}<br />
              {site.location}<br />
              <a href={`mailto:${site.email}`} className="hover:text-ivory" onClick={() => trackEmailClick('footer')}>{site.email}</a><br />
              <a href={`tel:${site.phone}`} className="hover:text-ivory" onClick={() => trackPhoneClick('footer')}>{site.displayPhone}</a>
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
              {[
                ['Instagram', site.socialLinks.instagram],
                ['Behance', site.socialLinks.behance],
                ['LinkedIn', site.socialLinks.linkedin]
              ].filter(([, href]) => href).map(([label, href]) => (
                <ContentLink key={label} href={href} target="_blank" rel="noreferrer" className="hover:text-ivory">{label}</ContentLink>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-14 border-t border-ivory/10 pt-8 text-xs text-sand/60">{site.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
