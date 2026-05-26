import { useMemo, useState } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import projects from '../data/projects';

const categories = ['All', 'Residential', 'Hospitality', 'Conceptual', 'Interior Design'];

function Projects() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    return active === 'All' ? projects : projects.filter((project) => project.category === active);
  }, [active]);

  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        title="Architecture Portfolio | Studio 39+ Case Studies"
        description="Browse Studio 39+ architecture case studies across Nairobi residences, safari lodge architecture, hospitality design, interior architecture, and visualization."
      />
      <section className="content-container space-y-12 py-16 sm:py-20 md:py-28">
        <SectionHeading
          as="h1"
          eyebrow="Projects"
          title="A curated project archive of residences, lodges, interiors, and spatial studies."
          copy="Each case study moves beyond imagery into design intent, site response, material language, scope, process, and spatial narrative."
        />
        <div className="flex gap-3 overflow-x-auto pb-3 text-xs uppercase tracking-[0.2em] text-charcoal/70 dark:text-sand" role="list" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`min-h-11 shrink-0 rounded-full border px-5 transition ${
                active === category
                  ? 'border-charcoal bg-charcoal text-ivory dark:border-sand dark:bg-sand dark:text-charcoal'
                  : 'border-mist bg-sand text-charcoal hover:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:hover:border-sand'
              }`}
              aria-pressed={active === category}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="project-gallery content-container grid gap-7 pb-20 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
      <CTASection title="Need a case-study approach for your own site or hospitality brief?" />
    </div>
  );
}

export default Projects;
