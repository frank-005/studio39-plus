import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ServiceCard from '../components/ServiceCard';
import HeroSlideshow from '../components/HeroSlideshow';
import CTASection from '../components/CTASection';
import TestimonialSection from '../components/TestimonialSection';
import Reveal from '../components/Reveal';
import projects from '../data/projects';
import services from '../data/services';
import workflow from '../data/workflow';
import { site } from '../data/site';
import { architecturalFirmSchema, localBusinessSchema, professionalServiceSchema } from '../utils/schema';

function Home() {
  return (
    <div>
      <SEO
        title="Luxury Hospitality & Residential Architecture in East Africa"
        description="Studio 39+ designs refined residential, hospitality, safari lodge, and experiential environments across East Africa from Nairobi."
        schema={[architecturalFirmSchema, localBusinessSchema, professionalServiceSchema]}
      />
      <HeroSlideshow />

      <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65 }} className="mobile-section content-container space-y-12 py-20 sm:py-24 md:py-32">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Selected environments shaped through light, climate, material, and restraint."
          copy="A curated view of residential, hospitality, interior, and visual studies developed with architectural clarity and a strong sense of place."
        />
        <div className="project-gallery grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>

      <section className="services-section mobile-section border-y border-charcoal/10 bg-neutral-100/40 dark:border-ivory/10 dark:bg-black/10">
        <div className="content-container grid gap-12 py-20 sm:py-24 md:py-32 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <SectionHeading
            eyebrow="Services"
            title="Design services for projects that need atmosphere, order, and commercial intelligence."
            copy="From early site strategy to architectural design, hospitality planning, interiors, and visualization, each service is structured around decisions that matter."
          />
          <div className="grid gap-x-10 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" className="mobile-section content-container py-20 sm:py-24 md:py-32">
        <div className="grid gap-8 border-y border-charcoal/15 py-14 dark:border-ivory/15 md:grid-cols-3">
          {[
            ['Project Locations', 'Nairobi, Karen, Westlands, Maasai Mara, and selected East African sites.'],
            ['Typologies', 'Private residences, boutique hospitality, safari camps, interiors, galleries, and visualization studies.'],
            ['Client Outcomes', 'Clearer decisions, stronger spatial narrative, buildable design direction, and presentation-ready imagery.']
          ].map(([title, copy]) => (
            <article key={title}>
              <p className="eyebrow">{title}</p>
              <p className="mt-5 text-base leading-8 text-charcoal/72 dark:text-sand">{copy}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <section className="mobile-section content-container py-20 sm:py-24 md:py-32">
        <SectionHeading
          eyebrow="Process"
          title="A calm architectural workflow from first brief to delivery."
          copy="The process is structured to reduce uncertainty, improve decision quality, and keep design intent clear from concept through documentation."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workflow.map((step, index) => (
            <article key={step.title} className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
              <p className="text-xs uppercase tracking-[0.24em] text-charcoal/60 dark:text-sand/70">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-semibold text-charcoal dark:text-ivory">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-charcoal/70 dark:text-sand">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <TestimonialSection />

      <section className="content-container py-20 sm:py-24 md:py-32" aria-labelledby="studio-nairobi">
        <div className="grid gap-10 border-y border-charcoal/15 py-12 dark:border-ivory/15 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Nairobi Studio</p>
            <h2 id="studio-nairobi" className="mt-4 text-3xl font-semibold leading-tight text-charcoal dark:text-ivory sm:text-4xl">
              Architecture with local intelligence and East African hospitality sensitivity.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-charcoal/72 dark:text-sand">
            <p>
              Studio 39+ works from Nairobi for clients planning homes, boutique hospitality, safari lodges, interiors, and visual packages that need strong spatial storytelling.
            </p>
            <Link className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand" to="/about">
              Read studio philosophy
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to test an architectural idea before it becomes expensive?"
        copy={`Send a brief or book a consultation with Studio 39+. You can also reach us directly on ${site.displayPhone}.`}
      />
    </div>
  );
}

export default Home;
