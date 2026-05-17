import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProjectCard({ project }) {
  return (
    <motion.article whileHover={{ y: -8 }} className="group overflow-hidden rounded-[26px] border border-mist bg-sand shadow-soft transition duration-300 hover:border-sage dark:border-neutral-700 dark:bg-charcoal">
      <Link to={`/projects/${project.id}`} className="block overflow-hidden">
        <div className="relative h-72 overflow-hidden bg-mist dark:bg-charcoal">
          <img src={project.hero} alt={project.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
      </Link>
      <div className="space-y-4 p-10">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="text-xl font-semibold text-charcoal dark:text-ivory">{project.name}</h3>
        <p className="text-sm leading-7 text-charcoal/70 dark:text-sand">{project.excerpt}</p>
        <Link to={`/projects/${project.id}`} className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.3em] text-charcoal dark:text-sand">
          View project
        </Link>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
