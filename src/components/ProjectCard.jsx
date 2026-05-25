import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

function ProjectCard({ project }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="group overflow-hidden border border-mist bg-sand shadow-soft transition duration-300 hover:border-sage dark:border-neutral-700 dark:bg-charcoal">
      <Link to={`/projects/${project.id}`} className="block overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist dark:bg-charcoal">
          <img
            src={optimizedImageUrl(project.hero, 900)}
            srcSet={imageSrcSet(project.hero, [480, 720, 960])}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            alt={`${project.name}, ${project.category.toLowerCase()} architecture project in ${project.location}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="space-y-4 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 text-[0.68rem] uppercase tracking-[0.24em] text-charcoal/70 dark:text-sand">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <h3 className="text-xl font-semibold text-charcoal dark:text-ivory">{project.name}</h3>
        <p className="text-xs uppercase tracking-[0.2em] text-charcoal/55 dark:text-sand/70">{project.location} / {project.year}</p>
        <p className="text-sm leading-7 text-charcoal/70 dark:text-sand">{project.excerpt}</p>
        <Link to={`/projects/${project.id}`} className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand" aria-label={`View case study for ${project.name}`}>
          View case study
        </Link>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
