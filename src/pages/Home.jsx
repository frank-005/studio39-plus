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
import { site } from '../data/site';
import { architecturalFirmSchema, localBusinessSchema, professionalServiceSchema } from '../utils/schema';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

const philosophy = [
  ['Natural Light', 'Rooms are shaped to hold daylight gently, using shadow, depth, and orientation to create atmosphere throughout the day.'],
  ['Climate Response', 'Deep thresholds, shaded terraces, courtyards, and cross ventilation make comfort part of the architecture.'],
  ['Timeless Materials', 'Stone, timber, lime plaster, clay, and mineral surfaces are used for quiet texture and long-term grace.'],
  ['Indoor-Outdoor Living', 'Gardens, verandas, pools, and terraces are treated as living rooms rather than decorative edges.'],
  ['African Context', 'Each home is grounded in East African climate, culture, craft, landscape, and contemporary patterns of living.'],
  ['Emotional Experience', 'Arrival, privacy, gathering, retreat, morning light, and evening calm are composed as architectural moments.']
];

const process = [
  ['01', 'Private Brief', 'We begin with lifestyle, family rhythm, site ambition, privacy, budget, and the emotional tone of the home.'],
  ['02', 'Site Intelligence', 'Climate, views, access, planting, orientation, and local context become the foundation of the design.'],
  ['03', 'Concept Architecture', 'Plans, massing, references, and atmosphere studies establish the spatial idea before detail begins.'],
  ['04', 'Material & Interior Direction', 'Finishes, lighting, joinery, landscape thresholds, and visual studies bring the home into focus.'],
  ['05', 'Documentation & Coordination', 'The design is refined into drawings and coordinated information for approvals, pricing, and delivery.']
];

const materialNotes = ['Lime plaster', 'Local stone', 'Aged timber', 'Bronze metalwork', 'Natural linen', 'Clay tile'];
const materialAtmosphereImage =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80&fm=webp';

function Home() {
  return (
    <div>
      <SEO
        title="Luxury Residential Architect Kenya | Bespoke Villa Design"
        description="Studio 39+ is a Nairobi-based architecture practice designing luxury homes, villas, private residences, and bespoke living environments across Kenya and East Africa."
        schema={[architecturalFirmSchema, localBusinessSchema, professionalServiceSchema]}
      />
      <HeroSlideshow />

      <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.75 }} className="mobile-section content-container space-y-14 py-24 sm:py-28 md:py-36">
        <SectionHeading
          eyebrow="Featured Residences"
          title="A curated portfolio of private homes, villas, and residential retreats."
          copy="Selected residential work shaped around privacy, landscape, light, and the rituals of modern East African living."
        />
        <div className="project-gallery grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>

      <Reveal as="section" className="mobile-section content-container py-24 sm:py-28 md:py-36" aria-labelledby="about-residential-studio">
        <div className="grid gap-12 border-y border-charcoal/15 py-16 dark:border-ivory/15 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Architecture Rooted in Place</p>
            <h2 id="about-residential-studio" className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-tight text-charcoal dark:text-ivory sm:text-5xl">
              Refined residential environments for clients who value calm, privacy, and a deeply personal sense of home.
            </h2>
          </div>
          <div className="space-y-7 text-base leading-9 text-charcoal/72 dark:text-sand">
            <p>
              Studio 39+ is a Nairobi-based architecture practice focused on crafting refined residential environments that respond to climate, landscape, and contemporary African living.
            </p>
            <p>
              The studio works through a bespoke process where spatial experience, material detail, indoor-outdoor living, and long-term comfort are considered together from the first conversation.
            </p>
            <Link className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand" to="/about">
              Read Studio Philosophy
            </Link>
          </div>
        </div>
      </Reveal>

      <section className="services-section mobile-section border-y border-charcoal/10 bg-neutral-100/45 dark:border-ivory/10 dark:bg-black/10">
        <div className="content-container grid gap-14 py-24 sm:py-28 md:py-36 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <SectionHeading
            eyebrow="Residential Services"
            title="Specialized design paths for exceptional homes."
            copy="From private residences and coastal villas to estates, renovations, interior architecture, and cinematic visualization, each service is composed for high-end residential clients."
          />
          <div className="grid gap-x-10 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="mobile-section content-container py-24 sm:py-28 md:py-36">
        <SectionHeading
          eyebrow="Design Philosophy"
          title="Homes shaped by light, climate, material, and emotional stillness."
          copy="Luxury is treated less as ornament and more as proportion, restraint, privacy, tactility, and the ease with which a home supports daily life."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {philosophy.map(([title, copy]) => (
            <article key={title} className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
              <h3 className="font-serif text-2xl font-medium text-charcoal dark:text-ivory">{title}</h3>
              <p className="mt-5 text-sm leading-8 text-charcoal/70 dark:text-sand">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mobile-section bg-charcoal text-ivory">
        <div className="content-container grid gap-12 py-24 sm:py-28 md:py-36 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src={optimizedImageUrl(materialAtmosphereImage, 1200)}
              srcSet={imageSrcSet(materialAtmosphereImage, [640, 960, 1200, 1400])}
              sizes="(min-width: 1024px) 48vw, 100vw"
              alt="Warm contemporary residential interior with natural materials"
              loading="lazy"
              decoding="async"
              className="h-full min-h-[420px] w-full object-cover opacity-90"
            />
          </div>
          <div className="space-y-8">
            <p className="eyebrow text-sand">Material & Atmosphere</p>
            <h2 className="font-serif text-4xl font-medium leading-tight text-ivory sm:text-5xl">A restrained palette with depth, warmth, and permanence.</h2>
            <p className="max-w-xl text-base leading-9 text-sand">
              Every surface is chosen for how it receives light, weathers over time, and supports the emotional character of the home. The result is quiet rather than loud, tactile rather than excessive.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {materialNotes.map((item) => (
                <span key={item} className="border-t border-ivory/18 pt-4 text-xs uppercase tracking-[0.22em] text-sand">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-section content-container py-24 sm:py-28 md:py-36">
        <SectionHeading
          eyebrow="Our Process"
          title="A calm, private design journey from first conversation to build-ready architecture."
          copy="Designed for homeowners, diaspora clients, and villa developers who need clarity, discretion, and a high level of design care."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {process.map(([number, title, copy]) => (
            <article key={title} className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
              <p className="eyebrow">{number}</p>
              <h3 className="mt-5 font-serif text-2xl font-medium text-charcoal dark:text-ivory">{title}</h3>
              <p className="mt-5 text-sm leading-8 text-charcoal/70 dark:text-sand">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <TestimonialSection />

      <Reveal as="section" className="mobile-section content-container py-24 sm:py-28 md:py-36">
        <div className="grid gap-8 border-y border-charcoal/15 py-14 dark:border-ivory/15 md:grid-cols-3">
          {[
            ['Selected Clients', 'Private homeowners, diaspora families, villa developers, and landowners planning lasting residential environments.'],
            ['Geographic Focus', 'Nairobi, Karen, Rosslyn, Diani, Naivasha, Nanyuki, the Kenyan coast, and selected East African sites.'],
            ['Designed for Modern Living', 'Homes with privacy, natural light, landscape connection, hosting comfort, and a quiet sense of luxury.']
          ].map(([title, copy]) => (
            <article key={title}>
              <p className="eyebrow">{title}</p>
              <p className="mt-5 text-base leading-8 text-charcoal/72 dark:text-sand">{copy}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <CTASection
        eyebrow="Begin Your Project"
        title="A private home deserves a measured, thoughtful beginning."
        copy={`Share your site, location, timeline, and ambition with Studio 39+. You can also reach us directly on ${site.displayPhone}.`}
      />
    </div>
  );
}

export default Home;
