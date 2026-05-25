import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ServiceCard from '../components/ServiceCard';
import HeroSlideshow from '../components/HeroSlideshow';
import CTASection from '../components/CTASection';
import TestimonialSection from '../components/TestimonialSection';
import projects from '../data/projects';
import services from '../data/services';
import workflow from '../data/workflow';
import { site } from '../data/site';
import { architecturalFirmSchema, localBusinessSchema, professionalServiceSchema } from '../utils/schema';

function Home() {
  return (
    <div className="pt-20">
      <SEO
        title="Architects in Nairobi for Luxury Homes, Lodges and Visualization"
        description="Studio 39+ is a Nairobi architecture studio for luxury residences, safari lodge design, hospitality interiors, and architectural visualization across Kenya and East Africa."
        schema={[architecturalFirmSchema, localBusinessSchema, professionalServiceSchema]}
      />
      <HeroSlideshow />

      <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65 }} className="content-container space-y-10 py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Architecture case studies shaped by light, climate, and quiet luxury."
          copy="Explore selected residential architects Nairobi work, safari lodge concepts, hospitality architecture, and visualization studies from Studio 39+."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>

      <section className="content-container py-16 sm:py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Services"
            title="Architectural services for homes, lodges, interiors, and visual decisions."
            copy="Built for clients looking for luxury architects Kenya, hospitality architects East Africa, safari lodge architects, and architectural visualization Kenya."
          />
          <div className="grid gap-x-8 md:grid-cols-2">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-container py-16 sm:py-20 md:py-24">
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

      <section className="content-container py-16 sm:py-20 md:py-24" aria-labelledby="studio-nairobi">
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
