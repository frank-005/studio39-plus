import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

function ProjectCard({ project }) {
  const material = project.materials?.[0] || 'material study';
  const isFeaturedLocal = ['kiserian-house', 'saika-house', 'earthen-threshold', 'ukwala-residence'].includes(project.id);

  return (
    <motion.article whileHover={{ y: -6 }} className="project-card group overflow-hidden border border-charcoal/10 bg-sand/60 transition duration-700 hover:border-charcoal/35 dark:border-ivory/12 dark:bg-charcoal">
      <Link to={`/projects/${project.id}`} className="block overflow-hidden">
        <div className="project-card-media relative overflow-hidden bg-mist dark:bg-charcoal">
          <img
            src={optimizedImageUrl(project.hero, 900)}
            srcSet={imageSrcSet(project.hero, [480, 720, 960])}
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            alt={`${project.name}, luxury ${project.category.toLowerCase()} by Studio 39+ in ${project.location}`}
            loading={isFeaturedLocal ? 'eager' : 'lazy'}
            fetchPriority={isFeaturedLocal ? 'high' : 'auto'}
            decoding="async"
            style={{ objectPosition: project.imagePosition || 'center center' }}
            className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.045]"
          />
          {isFeaturedLocal ? (
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-charcoal/76 to-transparent p-5 text-ivory sm:p-6">
              <p className="font-serif text-2xl font-medium leading-tight">{project.name}</p>
              <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory/78">{project.cardSubtitle || 'Private Residence | Kenya'}</p>
            </div>
          ) : null}
        </div>
      </Link>
      <div className="project-card-body space-y-3 p-5 sm:space-y-5 sm:p-8">
        <div className="project-card-meta flex items-center justify-between gap-4 uppercase text-charcoal/70 dark:text-sand">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="project-card-title font-semibold text-charcoal dark:text-ivory">{project.name}</h3>
        <p className="text-xs uppercase tracking-[0.2em] text-charcoal/55 dark:text-sand/70">{project.location}</p>
        <p className="project-card-copy text-sm text-charcoal/70 dark:text-sand">{project.excerpt}</p>
        <dl className="project-card-spec grid gap-3 border-t border-charcoal/10 pt-4 text-xs uppercase tracking-[0.16em] text-charcoal/58 dark:border-ivory/10 dark:text-sand/72 sm:grid-cols-2">
          <div>
            <dt>Language</dt>
            <dd>{material}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{project.status}</dd>
          </div>
        </dl>
        <Link to={`/projects/${project.id}`} className="project-card-link inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.22em] text-charcoal dark:text-sand" aria-label={`View residence study for ${project.name}`}>
          View Residence <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
