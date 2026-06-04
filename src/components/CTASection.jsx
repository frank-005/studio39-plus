import { Link } from 'react-router-dom';

function CTASection({
  eyebrow = 'Start a Project',
  title = 'Bring the site, brief, or first idea into a focused studio conversation.',
  copy = 'Studio 39+ helps clients define the right next step before design begins.'
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
              Discuss Your Project
            </Link>
            <Link className="btn-secondary" to="/projects">
              Explore our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
