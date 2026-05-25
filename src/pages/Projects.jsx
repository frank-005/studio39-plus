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
      <section className="content-container space-y-10 py-14 sm:py-16 md:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Projects"
          title="A refined architecture portfolio of residences, lodges, interiors, and visual studies."
          copy="Each case study includes project overview, location, design concept, client goals, challenges, materials, renders, floor plans, and build status."
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

      <section className="content-container grid gap-6 pb-16 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
      <CTASection title="Need a case-study approach for your own site or hospitality brief?" />
    </div>
  );
}

export default Projects;
