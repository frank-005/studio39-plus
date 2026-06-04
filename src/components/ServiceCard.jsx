import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  return (
    <article className="service-card group border-t border-charcoal/12 py-11 transition duration-500 hover:border-charcoal/45 dark:border-ivory/14 dark:hover:border-sand/80">
      <p className="eyebrow text-charcoal/48 dark:text-sand/60">{service.shortTitle}</p>
      <h3 className="mt-7 max-w-lg text-2xl font-semibold leading-tight text-charcoal dark:text-ivory sm:text-3xl">{service.title}</h3>
      <p className="mt-7 max-w-md text-sm leading-8 text-charcoal/68 dark:text-sand/86">{service.description}</p>
      <Link to={`/services/${service.id}`} className="mt-7 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition duration-300 group-hover:translate-x-1 dark:text-sand" aria-label={`Learn more about ${service.title}`}>
        Learn More <span aria-hidden="true">&rarr;</span>
      </Link>
    </article>
  );
}

export default ServiceCard;
