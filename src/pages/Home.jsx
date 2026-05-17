import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ServiceCard from '../components/ServiceCard';
import HeroSlideshow from '../components/HeroSlideshow';
import projects from '../data/projects';
import services from '../data/services';
import workflow from '../data/workflow';

function Home() {
  return (
    <div className="pt-32 pb-28 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
      <HeroSlideshow />

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75 }} className="content-container space-y-16 py-24 md:py-28">
        <SectionHeading eyebrow="Featured Projects" title="Selected work that feels sculptural, calm, and atmospheric." copy="A carefully curated collection of recent studio projects across residential, hospitality, and interior design." />
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>

      <section className="content-container py-24 md:py-28">
        <SectionHeading eyebrow="Services" title="How Studio 39+ shapes built environments." copy="A tailored suite of architecture, visualization, and interior architecture services for thoughtful clients." />
        <div className="mt-12 grid gap-10 lg:grid-cols-2 xl:gap-12">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="content-container py-24 md:py-28">
        <SectionHeading eyebrow="Process" title="A calm architectural workflow from idea to delivery." copy="Our process is structured around research, concept development, visualization, and meticulous documentation." />
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {workflow.map((step) => (
            <article key={step.title} className="rounded-[26px] border border-mist bg-sand p-10 shadow-soft dark:border-neutral-700 dark:bg-charcoal">
              <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">{step.title}</p>
              <p className="mt-6 text-base leading-9 text-charcoal/70 dark:text-sand">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-container mb-32 rounded-[32px] border border-mist bg-sand p-8 sm:p-12 lg:px-20 lg:py-20 shadow-soft dark:border-neutral-700 dark:bg-charcoal">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
          <div className="space-y-10 lg:space-y-12">
            <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Contact</p>
            <h2 className="text-4xl font-semibold leading-tight text-charcoal dark:text-ivory">Let’s begin a calm, considered project conversation.</h2>
            <p className="max-w-2xl text-lg leading-9 text-charcoal/70 dark:text-sand">Whether you are beginning a residential program or an experiential hospitality project, we welcome inquiries grounded in atmosphere, craft, and clarity.</p>
          </div>
          <div className="flex flex-col items-center justify-between gap-6 text-sm uppercase tracking-[0.3em] text-charcoal dark:text-sand sm:text-base">
            <Link to="/contact" className="inline-flex w-full max-w-[280px] items-center justify-center rounded-full border border-charcoal bg-charcoal px-7 py-4 text-ivory hover:bg-[#3a372f] dark:border-sand dark:bg-sand dark:text-charcoal dark:hover:bg-[#d5cabc]">Say Hello</Link>
            <div className="space-y-3 text-center">
              <span className="block font-semibold text-charcoal dark:text-ivory">studio39ke@gmail.com</span>
              <span className="block font-semibold text-charcoal dark:text-ivory">+254 703 906 562</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
