import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import projects from '../data/projects';

const categories = ['All', 'Residential', 'Hospitality', 'Conceptual', 'Interior Design'];

function Projects() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    return active === 'All' ? projects : projects.filter((project) => project.category === active);
  }, [active]);

  return (
    <div className="pt-32 pb-28 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
      <section className="content-container space-y-16 py-24 md:py-28">
        <SectionHeading eyebrow="Projects" title="A refined gallery of architectural work with clear categories and material presence." copy="Explore the current studio portfolio through a minimal presentation that highlights atmosphere and polish." />
        <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.4em] text-charcoal/70 dark:text-sand">
          {categories.map((category) => (
            <button key={category} onClick={() => setActive(category)} className={`rounded-full border px-6 py-4 transition ${active === category ? 'border-charcoal bg-charcoal text-ivory dark:border-sand dark:bg-sand dark:text-charcoal' : 'border-mist bg-sand text-charcoal hover:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:hover:border-sand'}`}>
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="content-container grid gap-10 pb-28 md:grid-cols-2 xl:grid-cols-4 xl:gap-12">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default Projects;
