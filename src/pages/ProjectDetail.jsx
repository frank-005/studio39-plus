import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import CaseStudyFacts from '../components/CaseStudyFacts';
import projects from '../data/projects';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';
import { projectSchema } from '../utils/schema';

function ListBlock({ title, items }) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-5 space-y-3 text-base leading-8 text-charcoal/72 dark:text-sand">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function DetailTable({ project }) {
  const rows = [
    ['Project', project.name],
    ['Location', project.location],
    ['Typology', project.category],
    ['Year', project.year],
    ['Status', project.status],
    ['Studio role', 'Architecture, interior direction, visualization, material strategy']
  ];

  return (
    <dl className="divide-y divide-charcoal/12 border-y border-charcoal/12 dark:divide-ivory/12 dark:border-ivory/12">
      {rows.map(([label, value]) => (
        <div key={label} className="grid gap-2 py-4 sm:grid-cols-[0.38fr_0.62fr]">
          <dt className="eyebrow text-[0.68rem]">{label}</dt>
          <dd className="text-sm leading-7 text-charcoal/76 dark:text-sand">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectNavLink({ label = '<- Back to Projects', className = '' }) {
  return (
    <Link
      to="/projects"
      className={`group inline-flex min-h-10 w-fit items-center text-xs font-semibold uppercase tracking-[0.22em] underline-offset-4 transition duration-300 hover:-translate-x-1 hover:underline ${className}`}
    >
      {label}
    </Link>
  );
}

function ProjectBrowseNav({ previousProject, nextProject, className = '' }) {
  return (
    <nav className={`project-browse-nav ${className}`} aria-label="Project navigation">
      <Link to={previousProject ? `/projects/${previousProject.id}` : '/projects'} className="project-browse-link">
        <span>Previous Project</span>
        <strong>{previousProject?.name || 'Projects'}</strong>
      </Link>
      <Link to="/projects" className="project-browse-link is-center">
        <span>Back to Projects</span>
        <strong>All Work</strong>
      </Link>
      <Link to={nextProject ? `/projects/${nextProject.id}` : '/projects'} className="project-browse-link">
        <span>Next Project</span>
        <strong>{nextProject?.name || 'Projects'}</strong>
      </Link>
    </nav>
  );
}

function getAdjacentProjects(project) {
  const projectIndex = projects.findIndex((item) => item.id === project.id);

  return {
    previousProject: projects[(projectIndex - 1 + projects.length) % projects.length],
    nextProject: projects[(projectIndex + 1) % projects.length]
  };
}

function CinematicRenderBreak({ src, alt, variant = '' }) {
  if (!src) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.95, ease: 'easeOut' }}
      className={`project-cinematic-break ${variant}`}
      aria-label={alt}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </motion.section>
  );
}

function EmotionalProjectCTA({ title, image, buttonText = 'Discuss Your Project', variant = '' }) {
  return (
    <section className={`project-final-cta ${variant}`} style={{ '--project-cta-image': `url(${image})` }}>
      <div className="content-container">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.85, ease: 'easeOut' }} className="project-final-cta-inner">
          <p className="eyebrow text-[#d5ae83]">Studio 39+</p>
          <h2>{title}</h2>
          <Link to="/contact" className="project-final-cta-link">
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Lightbox({ item, onClose }) {
  if (!item) return null;

  const isPdf = item.src.endsWith('.pdf');

  return (
    <div className="project-lightbox fixed inset-0 z-[100] bg-charcoal/92 p-4 backdrop-blur-sm sm:p-8" role="dialog" aria-modal="true" aria-label={item.alt || item.title}>
      <button type="button" onClick={onClose} className="project-lightbox-close" aria-label="Close fullscreen preview">
        Close
      </button>
      <div className="flex h-full items-center justify-center pt-14">
        {isPdf ? (
          <object data={`${item.src}#toolbar=0&navpanes=0`} type="application/pdf" className="h-full w-full max-w-6xl bg-ivory" aria-label={item.alt}>
            <a href={item.src} className="btn-secondary bg-ivory" target="_blank" rel="noreferrer">
              Open drawing
            </a>
          </object>
        ) : (
          <img src={item.src} alt={item.alt} className="max-h-full w-auto max-w-full object-contain shadow-soft" />
        )}
      </div>
    </div>
  );
}

function UkwalaCaseStudy({ project }) {
  const [lightboxItem, setLightboxItem] = useState(null);
  const { previousProject, nextProject } = getAdjacentProjects(project);
  const facts = [
    ['Location', project.location],
    ['Typology', project.typology],
    ['Status', project.status],
    ['Design Team', project.designTeam],
    ['Area', project.area],
    ['Year', project.year]
  ];

  return (
    <div className="ukwala-case-study bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory">
      <SEO
        title="Ukwala Residence | Luxury Residence Kenya | Studio 39+"
        description="Ukwala Residence by Studio 39+: a private residence in Siaya, Kenya, shaped by stone mass, timber fins, tall glazing, and passive comfort."
        image={project.hero}
        type="article"
        schema={projectSchema(project)}
        keywords={project.seoKeywords?.join(', ')}
      />

      <section className="ukwala-hero relative min-h-[86svh] overflow-hidden">
        <img
          src={project.hero}
          alt="Ukwala Residence exterior hero render with stone, timber fins, glass, and a double-volume entry by Studio 39+"
          fetchPriority="high"
          decoding="async"
          className="ukwala-hero-image absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: project.imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/82 via-charcoal/22 to-charcoal/12" />
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} className="content-container relative z-10 flex min-h-[86svh] flex-col justify-end pb-14 pt-32 text-ivory sm:pb-20">
          <ProjectNavLink className="mb-6 text-ivory/78 hover:text-ivory" />
          <p className="eyebrow text-ivory/78">{project.studio}</p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">{project.name}</h1>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-sm uppercase tracking-[0.22em] text-ivory/78">
            <span>Ukwala, Siaya</span>
            <span>Studio 39+</span>
          </div>
        </motion.div>
      </section>

      <section className="content-container grid gap-12 py-20 md:py-28 lg:grid-cols-[1.12fr_.88fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <p className="eyebrow">Project Overview</p>
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A tropical-modern residence anchored by stone, shade, and a tall entry volume.</h2>
          <p className="mt-8 text-base leading-9 text-charcoal/72 dark:text-sand">{project.overview}</p>
          <p className="mt-6 text-base leading-9 text-charcoal/72 dark:text-sand">{project.concept}</p>
        </motion.div>
        <motion.aside initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: 0.08 }} className="ukwala-facts border-y border-charcoal/14 py-3 dark:border-ivory/14">
          <dl className="divide-y divide-charcoal/12 dark:divide-ivory/12">
            {facts.map(([label, value]) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-[0.36fr_0.64fr]">
                <dt className="eyebrow text-[0.68rem]">{label}</dt>
                <dd className="text-sm leading-7 text-charcoal/78 dark:text-sand">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </section>

      <CinematicRenderBreak src={project.gallery?.[1]?.src || project.hero} alt="Ukwala Residence entrance render with timber fins, tall glazing, and stone mass" variant="project-cinematic-break--ukwala" />

      <section className="content-container project-gallery-section pb-20 md:pb-32" aria-labelledby="featured-gallery">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Featured Gallery" title="Arrival, facade depth, timber screening, and garden edges." />
          <Link to="/projects" className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand">
            All projects
          </Link>
        </div>
        <div className="project-editorial-gallery project-editorial-gallery--ukwala">
          {project.gallery.map((image, index) => (
            <motion.button initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: index * 0.06, ease: 'easeOut' }} key={image.src} type="button" onClick={() => setLightboxItem(image)} className={`project-editorial-gallery-item group ${index === 0 ? 'is-wide is-dominant' : ''} ${index === 2 ? 'is-tall' : ''}`} aria-label={`Open ${image.title} render`}>
              <img src={image.src} alt={image.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.04]" />
              <span>{image.title}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <ProjectBrowseNav previousProject={previousProject} nextProject={nextProject} className="content-container mb-12 md:mb-16" />
      <div className="content-container pb-8 md:pb-10">
        <ProjectNavLink label="View More Projects" className="text-charcoal/68 hover:text-charcoal dark:text-sand/76 dark:hover:text-ivory" />
      </div>
      <EmotionalProjectCTA title="Begin a private residence with clarity and restraint." image={project.gallery?.[0]?.src || project.hero} variant="project-final-cta--ukwala" />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

function EarthenThresholdCaseStudy({ project }) {
  const [lightboxItem, setLightboxItem] = useState(null);
  const { previousProject, nextProject } = getAdjacentProjects(project);
  const facts = [
    ['Location', project.location],
    ['Typology', project.typology],
    ['Status', project.status],
    ['Architect', project.architect],
    ['Studio', project.studio],
    ['Material Language', project.materialLanguage]
  ];

  return (
    <div className="earthen-case-study bg-[#f4ecdf] text-charcoal dark:bg-[#211b17] dark:text-ivory">
      <SEO
        title="Earthen Threshold | Brick Pavilion Architecture Kenya | Studio 39+"
        description="Earthen Threshold by Studio 39+: a compact brick WC pavilion in Bomachoge, Kisii, shaped by perforated masonry, privacy, air, and shadow."
        image={project.hero}
        type="article"
        schema={projectSchema(project)}
        keywords={project.seoKeywords?.join(', ')}
      />

      <section className="earthen-hero relative overflow-hidden">
        <img
          src={project.hero}
          alt="Earthen Threshold outdoor brick WC pavilion exterior with perforated masonry, frosted glazing, and warm clay brick"
          fetchPriority="high"
          decoding="async"
          className="earthen-hero-image absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: project.imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24160f]/68 via-[#24160f]/18 to-[#24160f]/4" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="content-container relative z-10 flex flex-col justify-end pb-14 pt-32 text-ivory sm:pb-20">
          <ProjectNavLink className="mb-6 text-ivory/78 hover:text-ivory" />
          <p className="eyebrow text-ivory/74">Outdoor Brick WC Pavilion</p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">{project.name}</h1>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.24em] text-ivory/76 sm:text-sm">
            <span>{project.subtitle}</span>
            <span>Bomachoge, Kisii</span>
          </div>
        </motion.div>
      </section>

      <section className="content-container grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_.86fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="max-w-3xl">
          <p className="eyebrow text-[#8e4a32] dark:text-[#d8aa86]">Introduction</p>
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A service structure held by brick, air, and shadow.</h2>
          <p className="mt-8 text-base leading-9 text-charcoal/72 dark:text-sand">{project.overview}</p>
          <p className="mt-6 text-base leading-9 text-charcoal/72 dark:text-sand">{project.concept}</p>
        </motion.div>
        <motion.aside initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, delay: 0.08 }} className="earthen-facts py-2">
          <dl>
            {facts.map(([label, value]) => (
              <div key={label} className="grid gap-2 border-t border-charcoal/16 py-5 sm:grid-cols-[0.36fr_0.64fr] dark:border-ivory/14">
                <dt className="eyebrow text-[0.68rem] text-[#8e4a32] dark:text-[#d8aa86]">{label}</dt>
                <dd className="text-sm leading-7 text-charcoal/78 dark:text-sand">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </section>

      <CinematicRenderBreak src={project.gallery?.[2]?.src || project.hero} alt="Earthen Threshold cinematic brick pavilion render with filtered masonry light" variant="project-cinematic-break--earthen" />

      <section className="content-container project-gallery-section pb-20 md:pb-32" aria-labelledby="earthen-gallery">
        <div className="mb-10 max-w-4xl">
          <p className="eyebrow text-[#8e4a32] dark:text-[#d8aa86]">Featured Gallery</p>
          <h2 id="earthen-gallery" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Brick mass, narrow passages, perforation, and shade.</h2>
        </div>
        <div className="project-editorial-gallery project-editorial-gallery--earthen">
          {project.gallery.map((image, index) => (
            <motion.button initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: index * 0.06, ease: 'easeOut' }} key={image.src} type="button" onClick={() => setLightboxItem(image)} className={`project-editorial-gallery-item group ${index === 0 || index === 2 ? 'is-large' : ''} ${index === 1 ? 'is-tall' : ''}`} aria-label={`Open ${image.title} image`}>
              <img src={image.src} alt={image.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]" />
              <span>{image.title}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <ProjectBrowseNav previousProject={previousProject} nextProject={nextProject} className="content-container mb-12 md:mb-16" />
      <div className="content-container pb-8 md:pb-10">
        <ProjectNavLink label="View More Projects" className="text-charcoal/68 hover:text-charcoal dark:text-sand/76 dark:hover:text-ivory" />
      </div>
      <EmotionalProjectCTA title="Discuss a small project with architectural care." image={project.gallery?.[0]?.src || project.hero} buttonText="Begin a Conversation" variant="project-final-cta--earthen" />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

function SaikaHouseCaseStudy({ project }) {
  const [lightboxItem, setLightboxItem] = useState(null);
  const { previousProject, nextProject } = getAdjacentProjects(project);
  const facts = [
    ['Location', project.location],
    ['Typology', project.typology],
    ['Status', project.status],
    ['Design Team', project.designTeam],
    ['Site Features', project.siteFeatures],
    ['Material Palette', project.materialPalette]
  ];

  return (
    <div className="saika-case-study bg-[#f4eadc] text-charcoal dark:bg-[#26221d] dark:text-ivory">
      <SEO
        title="Saika House | Contemporary House Nairobi | Studio 39+"
        description="Saika House by Studio 39+: a Nairobi private residence organized around garden paths, Mazeras stone, verandas, and protected courtyard edges."
        image={project.hero}
        type="article"
        schema={projectSchema(project)}
        keywords={project.seoKeywords?.join(', ')}
      />

      <section
        className="saika-hero relative overflow-hidden"
        style={{ backgroundImage: `url(${project.hero})`, backgroundPosition: project.imagePosition || 'center center' }}
      >
        <img
          src={project.hero}
          alt="Saika House exterior render with Mazeras stone cladding, pitched terracotta roof, vertical screening, and landscaped garden frontage"
          fetchPriority="high"
          decoding="async"
          className="saika-hero-image absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: project.imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d241d]/84 via-[#2d241d]/24 to-[#2d241d]/4" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, ease: 'easeOut' }} className="content-container relative z-10 flex flex-col justify-end pb-14 pt-32 text-ivory sm:pb-20">
          <ProjectNavLink className="mb-6 text-ivory/78 hover:text-ivory" />
          <p className="eyebrow text-ivory/76">Studio 39+</p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">{project.name}</h1>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.24em] text-ivory/78 sm:text-sm">
            <span>Saika, Nairobi</span>
            <span>Studio 39+</span>
          </div>
        </motion.div>
      </section>

      <section className="content-container grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="max-w-3xl">
          <p className="eyebrow text-[#9a5e32] dark:text-[#d6aa7c]">Project Overview</p>
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A family residence organized by courtyard paths, stonework, and shaded verandas.</h2>
          <p className="mt-8 text-base leading-9 text-charcoal/72 dark:text-sand">{project.overview}</p>
          <p className="mt-6 text-base leading-9 text-charcoal/72 dark:text-sand">{project.concept}</p>
        </motion.div>
        <motion.aside initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, delay: 0.08 }} className="saika-facts border-y border-charcoal/16 py-2 dark:border-ivory/14">
          <dl className="divide-y divide-charcoal/12 dark:divide-ivory/12">
            {facts.map(([label, value]) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-[0.36fr_0.64fr]">
                <dt className="eyebrow text-[0.68rem] text-[#9a5e32] dark:text-[#d6aa7c]">{label}</dt>
                <dd className="text-sm leading-7 text-charcoal/78 dark:text-sand">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </section>

      <CinematicRenderBreak src={project.gallery?.[1]?.src || project.hero} alt="Saika House garden and courtyard render with stonework, planting, and shaded circulation" variant="project-cinematic-break--saika" />

      <section className="content-container project-gallery-section pb-20 md:pb-32" aria-labelledby="saika-gallery">
        <div className="mb-10 max-w-4xl">
          <p className="eyebrow text-[#9a5e32] dark:text-[#d6aa7c]">Featured Gallery</p>
          <h2 id="saika-gallery" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Garden frontage, courtyard routes, garage approach, and roof organization.</h2>
        </div>
        <div className="project-editorial-gallery project-editorial-gallery--saika">
          {project.gallery.map((image, index) => (
            <motion.button initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: index * 0.06, ease: 'easeOut' }} key={image.src} type="button" onClick={() => setLightboxItem(image)} className={`project-editorial-gallery-item group ${index === 0 || index === 5 ? 'is-large' : ''} ${index === 2 ? 'is-tall' : ''}`} aria-label={`Open ${image.title} image`}>
              <img src={image.src} alt={image.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]" />
              <span>{image.title}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="content-container pb-20 md:pb-28" aria-labelledby="saika-spatial">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[#9a5e32] dark:text-[#d6aa7c]">Daily Life</p>
            <h2 id="saika-spatial" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Family rooms, garden paths, verandas, and privacy held in balance.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.spatialExperience.map((item) => (
              <article key={item} className="border-t border-charcoal/16 pt-5 text-base leading-8 text-charcoal/72 dark:border-ivory/14 dark:text-sand">
                {item}
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProjectBrowseNav previousProject={previousProject} nextProject={nextProject} className="content-container mb-12 md:mb-16" />
      <div className="content-container pb-8 md:pb-10">
        <ProjectNavLink label="View More Projects" className="text-charcoal/68 hover:text-charcoal dark:text-sand/76 dark:hover:text-ivory" />
      </div>
      <EmotionalProjectCTA title="Design a home around privacy, garden life, and daily ease." image={project.gallery?.[0]?.src || project.hero} variant="project-final-cta--saika" />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

function KiserianHouseCaseStudy({ project }) {
  const [lightboxItem, setLightboxItem] = useState(null);
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const facts = [
    ['Location', project.location],
    ['Typology', project.typology],
    ['Status', project.status],
    ['Plot Information', project.plotInformation],
    ['Spatial Program', project.spatialProgram],
    ['Material Palette', project.materialPalette]
  ];

  return (
    <div className="saika-case-study bg-[#f5ecdf] text-charcoal dark:bg-[#27231f] dark:text-ivory">
      <SEO
        title="Kiserian House | Contemporary Bungalow Kenya | Studio 39+"
        description="Kiserian House by Studio 39+: a compact three-bedroom bungalow in Kajiado, Kenya, shaped by a mono-pitched roof, stone base, shaded openings, and efficient planning."
        image={project.hero}
        type="article"
        schema={projectSchema(project)}
        keywords={project.seoKeywords?.join(', ')}
      />

      <section
        className="saika-hero kiserian-hero relative overflow-hidden"
        style={{ backgroundImage: `url(${project.hero})`, backgroundPosition: project.imagePosition || 'center center' }}
      >
        <img
          src={project.hero}
          alt="Kiserian House contemporary bungalow exterior render with mono-pitched roof, textured plaster, stone cladding, recessed windows, and warm Kajiado landscape"
          fetchPriority="high"
          decoding="async"
          className="saika-hero-image kiserian-hero-image absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: project.imagePosition }}
        />
        <div className="kiserian-hero-overlay absolute inset-0" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05, ease: 'easeOut' }} className="content-container kiserian-hero-content relative z-10 flex flex-col justify-end pb-14 pt-32 text-ivory sm:pb-20">
          <ProjectNavLink className="mb-6 text-ivory/78 hover:text-ivory" />
          <p className="eyebrow text-ivory/76">Studio 39+</p>
          <h1 className="kiserian-hero-title mt-7 max-w-5xl font-serif text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">{project.name}</h1>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.24em] text-ivory/84 sm:text-sm">
            <span>Kiserian, Kajiado</span>
            <span>Studio 39+</span>
          </div>
        </motion.div>
      </section>

      <section className="content-container kiserian-overview grid gap-14 py-24 md:py-36 lg:grid-cols-[1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="max-w-3xl">
          <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Project Overview</p>
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A compact bungalow shaped by a low roofline, stone base, and practical family planning.</h2>
          <p className="mt-8 text-base leading-9 text-charcoal/72 dark:text-sand">{project.overview}</p>
          <p className="mt-6 text-base leading-9 text-charcoal/72 dark:text-sand">{project.concept}</p>
        </motion.div>
        <motion.aside initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, delay: 0.08 }} className="saika-facts border-y border-charcoal/16 py-2 dark:border-ivory/14">
          <dl className="divide-y divide-charcoal/12 dark:divide-ivory/12">
            {facts.map(([label, value]) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-[0.36fr_0.64fr]">
                <dt className="eyebrow text-[0.68rem] text-[#94613b] dark:text-[#d5ae83]">{label}</dt>
                <dd className="text-sm leading-7 text-charcoal/78 dark:text-sand">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </section>

      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.24 }} transition={{ duration: 0.95, ease: 'easeOut' }} className="kiserian-cinematic-pause" aria-label="Kiserian House cinematic exterior render">
        <img src="/projects/kiserian-house/render-entry.png" alt="Kiserian House sheltered entry porch with textured plaster, warm light, and garden stepping stones" loading="lazy" decoding="async" />
      </motion.section>

      <section className="content-container kiserian-gallery-section pb-24 md:pb-36" aria-labelledby="kiserian-gallery">
        <div className="mb-14 max-w-4xl md:mb-18">
          <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Featured Gallery</p>
          <h2 id="kiserian-gallery" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Front approach, sheltered entry, garden route, and exterior character.</h2>
        </div>
        <div className="saika-gallery kiserian-editorial-gallery">
          {project.gallery.map((image, index) => (
            <motion.button initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }} key={image.src} type="button" onClick={() => setLightboxItem(image)} className={`saika-gallery-item kiserian-gallery-item group ${index === 0 ? 'is-large is-dominant' : ''} ${index === 2 ? 'is-wide' : ''}`} aria-label={`Open ${image.title} image`}>
              <img src={image.src} alt={image.alt} loading={index < 3 ? 'eager' : 'lazy'} fetchPriority={index < 3 ? 'high' : 'auto'} decoding={index < 3 ? 'sync' : 'async'} className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]" />
              <span>{image.title}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="content-container kiserian-spatial-section pb-24 md:pb-40" aria-labelledby="kiserian-spatial">
        <div className="grid gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
          <div>
            <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Daily Life</p>
            <h2 id="kiserian-spatial" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Clear circulation, protected rooms, natural light, and a modest suburban scale.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.spatialExperience.map((item) => (
              <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: 'easeOut' }} key={item} className="border-t border-charcoal/16 pt-6 text-[1.02rem] leading-9 text-charcoal/76 dark:border-ivory/14 dark:text-sand">
                {item}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe3d2]/70 py-20 md:py-28 dark:bg-black/10" aria-labelledby="kiserian-technical">
        <div className="content-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Visual Direction</p>
            <h2 id="kiserian-technical" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">The visual set clarifies entry, roofline, garden edges, and exterior character.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {project.technicalDocumentation.map((item) => (
              <article key={item} className="border-t border-charcoal/16 pt-5 text-sm leading-7 text-charcoal/72 dark:border-ivory/14 dark:text-sand">
                {item}
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProjectBrowseNav previousProject={previousProject} nextProject={nextProject} className="content-container mb-12 md:mb-16" />
      <div className="content-container pb-8 md:pb-10">
        <ProjectNavLink label="View More Projects" className="text-charcoal/68 hover:text-charcoal dark:text-sand/76 dark:hover:text-ivory" />
      </div>
      <EmotionalProjectCTA title="Start a compact home with a clear architectural direction." image="/projects/kiserian-house/render-garden.png" variant="project-final-cta--kiserian" />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = useMemo(
    () => projects.find((item) => item.id === projectId || item.slug === projectId || item.aliases?.includes(projectId)),
    [projectId]
  );

  if (!project) {
    return (
      <div className="pt-32 pb-24 content-container">
        <SEO title="Residence Not Found" description="The requested Studio 39+ residence study could not be found." />
        <p className="eyebrow">Project not found</p>
        <button type="button" onClick={() => navigate('/projects')} className="btn-secondary mt-6">
          Back to projects
        </button>
      </div>
    );
  }

  const gallery = [
    project.hero,
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80&fm=webp',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80&fm=webp'
  ];
  const { previousProject, nextProject } = getAdjacentProjects(project);

  if (project.id === 'ukwala-residence') {
    return <UkwalaCaseStudy project={project} />;
  }

  if (project.id === 'earthen-threshold') {
    return <EarthenThresholdCaseStudy project={project} />;
  }

  if (project.id === 'saika-house') {
    return <SaikaHouseCaseStudy project={project} />;
  }

  if (project.id === 'kiserian-house') {
    return <KiserianHouseCaseStudy project={project} />;
  }

  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        title={`${project.name} Case Study`}
        description={`${project.name} by Studio 39+: ${project.excerpt}`}
        image={optimizedImageUrl(project.hero, 1600)}
        type="article"
        schema={projectSchema(project)}
      />
      <section className="relative overflow-hidden bg-ivory light-surface-overlay pb-12 dark:bg-charcoal md:pb-16">
        <div className="content-container grid gap-10 py-14 sm:py-16 md:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <ProjectNavLink className="mb-6 text-charcoal/66 hover:text-charcoal dark:text-sand/76 dark:hover:text-ivory" />
            <p className="eyebrow">{project.category} Residence Study</p>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl lg:text-6xl dark:text-ivory">{project.name}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-charcoal/72 dark:text-sand">{project.excerpt}</p>
          </div>
          <CaseStudyFacts project={project} />
        </div>

        <div className="content-container">
          <div className="project-feature-media overflow-hidden bg-charcoal">
            <img
              src={optimizedImageUrl(project.hero, 1600)}
              srcSet={imageSrcSet(project.hero, [720, 1080, 1440, 1800])}
              sizes="100vw"
              alt={`${project.name} exterior study in ${project.location}`}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="content-container grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-10">
          <SectionHeading eyebrow="Project Overview" title="A clear residential study from brief to design direction." />
          <p className="text-base leading-9 text-charcoal/72 dark:text-sand">{project.overview}</p>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Client Brief</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.brief}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Design Direction</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.concept}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Site / Context</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.context}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Key Considerations</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.challenges}</p>
          </div>
        </div>
        <aside className="space-y-10 border border-mist bg-sand p-7 shadow-soft dark:border-neutral-700 dark:bg-charcoal sm:p-10">
          <div>
            <h3 className="eyebrow">Project Details</h3>
            <div className="mt-6">
              <DetailTable project={project} />
            </div>
          </div>
          <ListBlock title="Renders" items={project.renders} />
          <div>
            <h3 className="eyebrow">Studio Scope</h3>
            <ul className="mt-5 space-y-3 text-base leading-8 text-charcoal/72 dark:text-sand">
              <li>Architecture</li>
              <li>Interior Design</li>
              <li>Architectural Visualization</li>
              <li>Documentation Strategy</li>
            </ul>
          </div>
        </aside>
      </section>

      <CinematicRenderBreak src={gallery[1]} alt={`${project.name} architectural study`} variant="project-cinematic-break--generic" />

      <section className="content-container project-gallery-section pb-20 md:pb-32" aria-labelledby="gallery-title">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="gallery-title" className="text-3xl font-semibold text-charcoal dark:text-ivory">Residential Studies</h2>
          <Link to="/projects" className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand">
            All projects
          </Link>
        </div>
        <div className="project-editorial-gallery project-editorial-gallery--generic">
          {gallery.map((image, index) => (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: index * 0.06, ease: 'easeOut' }} key={image} className={`project-editorial-gallery-item ${index === 0 ? 'is-dominant' : ''} overflow-hidden bg-mist dark:bg-charcoal`}>
              <img
                src={optimizedImageUrl(image, 900)}
                srcSet={imageSrcSet(image, [480, 720, 960])}
                sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                alt={`${project.name} render ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>
      <ProjectBrowseNav previousProject={previousProject} nextProject={nextProject} className="content-container mb-12 md:mb-16" />
      <div className="content-container pb-8 md:pb-10">
        <ProjectNavLink label="View More Projects" className="text-charcoal/68 hover:text-charcoal dark:text-sand/76 dark:hover:text-ivory" />
      </div>
      <EmotionalProjectCTA title="Begin a private residential commission." image={project.hero} buttonText="Start a Project" variant="project-final-cta--generic" />
    </div>
  );
}

export default ProjectDetail;
