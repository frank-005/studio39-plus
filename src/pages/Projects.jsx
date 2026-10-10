import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import CinematicProjectShowcase from '../components/CinematicProjectShowcase';
import CTASection from '../components/CTASection';
import projects from '../data/projects';

function Projects() {
  const [active, setActive] = useState('All');
  const categories = ['All', ...new Set(projects.map((project) => project.category))];

  const filtered = useMemo(() => {
    return active === 'All' ? projects : projects.filter((project) => project.category === active);
  }, [active]);

  return (
    <div>
      <SEO
        page="projects"
        title="Featured Residences | Luxury Homes and Villas in Kenya"
        description="Browse Studio 39+ residential architecture studies across private homes, villas, and compact residential commissions in Kenya."
      />

      {/* Cinematic showcase - full width hero */}
      <h1 className="sr-only">Featured residences</h1>
      <CinematicProjectShowcase projects={filtered} />

      {/* Category filter section - minimal and restrained */}
      <section className="bg-neutral-100 dark:bg-charcoal">
        <div className="content-container flex flex-col items-center gap-8 py-12 sm:py-16 md:py-20">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-charcoal/50 dark:text-ivory/50">Filter by category</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3" role="list" aria-label="Filter projects by category">
            {categories.map((category) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                whileHover={{ backgroundColor: active === category ? undefined : 'rgba(47, 44, 40, 0.08)' }}
                className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-xs font-light uppercase tracking-[0.2em] transition ${
                  active === category
                    ? 'border-charcoal bg-charcoal text-ivory dark:border-ivory dark:bg-ivory dark:text-charcoal'
                    : 'border-charcoal/20 text-charcoal/70 hover:border-charcoal/40 dark:border-ivory/20 dark:text-ivory/70 dark:hover:border-ivory/40'
                }`}
                aria-pressed={active === category}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-100 dark:bg-charcoal">
      <CTASection title="Have a project to discuss?" />
      </section>
    </div>
  );
}

export default Projects;
