import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  return (
    <article className="service-card group border-t border-charcoal/15 py-9 transition duration-500 hover:border-charcoal/55 dark:border-ivory/15 dark:hover:border-sand">
      <div className="flex items-center justify-between gap-6">
        <p className="eyebrow text-charcoal/48 dark:text-sand/60">{service.shortTitle}</p>
        <span className="service-icon inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/14 font-serif text-sm text-charcoal/58 transition duration-500 group-hover:border-charcoal/40 group-hover:text-charcoal dark:border-ivory/14 dark:text-sand/70 dark:group-hover:border-sand">
          {service.icon || '39'}
        </span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold leading-tight text-charcoal group-hover:text-charcoal dark:text-ivory sm:text-3xl">{service.title}</h3>
      <p className="mt-6 max-w-md text-sm leading-8 text-charcoal/70 dark:text-sand">{service.description}</p>
      <Link to={`/services/${service.id}`} className="mt-5 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.22em] text-charcoal dark:text-sand" aria-label={`Explore ${service.title}`}>
        Explore service
      </Link>
    </article>
  );
}

export default ServiceCard;
