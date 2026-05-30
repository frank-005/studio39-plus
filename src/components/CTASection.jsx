import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { trackWhatsAppClick } from '../utils/analytics';

function CTASection({
  eyebrow = 'Begin Your Project',
  title = 'Bring your site, brief, or early idea into a private studio conversation.',
  copy = 'Studio 39+ helps residential clients clarify the next intelligent move before design begins.'
}) {
  return (
    <section className="content-container py-16 sm:py-20 md:py-24">
      <div className="border-y border-charcoal/15 py-12 dark:border-ivory/15 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight text-charcoal dark:text-ivory sm:text-4xl">
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-charcoal/72 dark:text-sand">{copy}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link className="btn-primary" to="/contact">
              Start Your Project
            </Link>
            <a className="btn-secondary" href={site.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('cta_section')}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
