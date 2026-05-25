import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  return (
    <article className="group border-t border-charcoal/15 py-8 transition duration-300 hover:border-sage dark:border-ivory/15">
      <h3 className="text-xl font-semibold text-charcoal group-hover:text-sage dark:text-ivory">{service.title}</h3>
      <p className="mt-5 text-sm leading-7 text-charcoal/70 dark:text-sand">{service.description}</p>
      <Link to={`/services/${service.id}`} className="mt-5 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.22em] text-charcoal dark:text-sand" aria-label={`Explore ${service.title}`}>
        Explore service
      </Link>
    </article>
  );
}

export default ServiceCard;
