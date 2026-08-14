import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import HeroSlideshow from '../components/HeroSlideshow';
import CTASection from '../components/CTASection';
import TestimonialSection from '../components/TestimonialSection';
import Reveal from '../components/Reveal';
import CinematicProjectShowcase from '../components/CinematicProjectShowcase';
import projects from '../data/projects';
import services from '../data/services';
import { site } from '../data/site';
import { architecturalFirmSchema, localBusinessSchema, professionalServiceSchema } from '../utils/schema';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

const philosophy = [
  ['Light & Climate', 'How sunlight, shade, and air shape the way your home feels throughout the day. Good architecture makes you feel the seasons change.'],
  ['Material & Time', 'Natural materials that age beautifully and improve with use. Your home should become more comfortable and more beautiful as time passes.'],
  ['Living & Connection', 'Spaces designed around how you actually live — family gatherings, quiet mornings, everyday rituals. The architecture serves your life, not the other way around.']
];

const process = [
  ['01', 'Discovery & Brief', 'We begin by understanding the site, lifestyle, goals, budget, and aspirations that will shape the project.'],
  ['02', 'Site & Context Analysis', 'Climate, topography, views, access, landscape, and local conditions inform the design direction.'],
  ['03', 'Concept Design', 'Plans, spatial organization, massing, and early design ideas are developed into a clear architectural concept.'],
  ['04', 'Design Development', 'Architecture, interiors, materials, landscape integration, and technical requirements are refined into a coordinated design.'],
  ['05', 'Construction Documentation', 'Detailed drawings and project information are prepared for approvals, pricing, and construction.'],
  ['06', 'Construction Support', 'We remain involved during construction to clarify drawings, review progress, and support the realization of the design.']
];

const materialPrinciples = [
  ['Light', 'Materials selected for how they receive and shape daylight.'],
  ['Locality', 'Regional materials that connect a home to its landscape.'],
  ['Texture', 'Natural surfaces that add depth without excess ornament.'],
  ['Longevity', 'Finishes chosen to age gracefully over time.'],
  ['Craft', 'Carefully detailed materials shaped through skilled making.'],
  ['Permanence', 'A restrained palette designed to remain relevant for decades.']
];
const materialAtmosphereImage = '/projects/ukwala/material-closeup.jpg';

function Home() {
  return (
    <div>
      <SEO
        title="Residential Architect Kenya | Private Homes and Villas"
        description="Studio 39+ is a Nairobi-based architecture practice designing private homes, villas, residences, and retreat environments across Kenya and East Africa."
        schema={[architecturalFirmSchema, localBusinessSchema, professionalServiceSchema]}
      />
      <HeroSlideshow />

      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75 }}>
        <CinematicProjectShowcase
          projects={projects}
          variant="section"
          eyebrow="Featured Residences"
          title="Selected private homes, villas, and residential studies."
        />
      </motion.div>

      <Reveal as="section" className="mobile-section content-container py-24 sm:py-28 md:py-36" aria-labelledby="about-residential-studio">
        <div className="grid gap-12 border-y border-charcoal/15 py-16 dark:border-ivory/15 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Before We Design</p>
            <h2 id="about-residential-studio" className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-tight text-charcoal dark:text-ivory sm:text-5xl">
              We Want to Understand How You Live.
            </h2>
          </div>
          <div className="space-y-7 text-base leading-9 text-charcoal/72 dark:text-sand">
            <p>
              Your daily rhythms, the light in your favourite room, how your family gathers, what makes you feel at home — these are the things that shape the architecture. Every detail matters because it's your life that lives there.
            </p>
            <Link className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand" to="/about">
              How We Work
            </Link>
          </div>
        </div>
      </Reveal>

      <section className="services-section mobile-section border-y border-charcoal/10 bg-neutral-100/45 dark:border-ivory/10 dark:bg-black/10">
        <div className="content-container grid gap-16 py-28 sm:py-32 md:py-44 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <SectionHeading
            eyebrow="How We Help"
            title="Services for Creating Your Home."
            copy="Whether you\'re starting from scratch, reimagining a space, or bringing a vision to life, we\'ll guide you through the process."
          />
          <div className="grid gap-x-14 gap-y-2 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="mobile-section content-container py-28 sm:py-32 md:py-44">
        <SectionHeading
          eyebrow="Your Home"
          title="What Makes a Home Feel Right."
          copy="The best homes aren\'t defined by style or budget — they\'re defined by how they serve your life. Light, comfort, connection to place, and materials that age beautifully. These are the things that matter."
        />
        <div className="mt-16 grid gap-10 md:grid-cols-3 lg:gap-14">
          {philosophy.map(([title, copy]) => (
            <article key={title} className="border-t border-charcoal/10 pt-8 dark:border-ivory/12">
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/72 dark:text-sand">{title}</h3>
              <p className="mt-7 max-w-sm text-base leading-8 text-charcoal/68 dark:text-sand/82">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mobile-section bg-charcoal text-ivory">
        <div className="content-container grid gap-14 py-28 sm:py-32 md:py-44 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative min-h-[460px] overflow-hidden">
            <img
              src={optimizedImageUrl(materialAtmosphereImage, 1200)}
              srcSet={imageSrcSet(materialAtmosphereImage, [640, 960, 1200, 1400])}
              sizes="(min-width: 1024px) 48vw, 100vw"
              alt="Ukwala Residence material detail with stone, timber fins, textured plaster, and filtered daylight"
              loading="lazy"
              decoding="async"
              className="h-full min-h-[460px] w-full object-cover opacity-90"
            />
          </div>
          <div>
            <p className="eyebrow text-sand">Materials</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-tight text-ivory sm:text-5xl">
              Materials chosen for climate, character, and longevity.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-9 text-sand">
              Our material palettes are guided by climate, craftsmanship, and the way a home is lived in over time. We favour natural materials that weather gracefully, create warmth, and bring lasting character to a home.
            </p>
            <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {materialPrinciples.map(([title, copy]) => (
                <article key={title} className="border-t border-ivory/14 pt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">{title}</h3>
                  <p className="mt-5 text-sm leading-7 text-sand/82">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-section content-container py-24 sm:py-28 md:py-36">
        <SectionHeading
          eyebrow="Our Process"
          title="A measured process from first conversation to build-ready drawings."
          copy="Structured for homeowners, diaspora clients, and developers who need clarity, discretion, and careful design work."
        />
        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {process.map(([number, title, copy]) => (
            <article key={title} className="border-t border-charcoal/12 pt-8 dark:border-ivory/14">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/46 dark:text-sand/60">{number}</p>
              <h3 className="mt-6 font-serif text-2xl font-medium leading-tight text-charcoal dark:text-ivory">{title}</h3>
              <p className="mt-6 max-w-sm text-sm leading-8 text-charcoal/68 dark:text-sand/84">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <TestimonialSection />

      <CTASection
        eyebrow="Start a Project"
        title="A private home deserves a measured beginning."
        copy={`Share the site, location, timeline, and ambition with Studio 39+. You can also reach the studio directly on ${site.displayPhone}.`}
      />
    </div>
  );
}

export default Home;
