import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import CaseStudyFacts from '../components/CaseStudyFacts';
import CTASection from '../components/CTASection';
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

function DrawingPanel({ title, items }) {
  return (
    <article className="drawing-panel border border-charcoal/12 bg-sand/70 p-6 dark:border-ivory/12 dark:bg-black/10">
      <p className="eyebrow">{title}</p>
      <div className="mt-8 space-y-4" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <ul className="mt-8 space-y-3 text-sm leading-7 text-charcoal/70 dark:text-sand">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
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
        description="Ukwala Residence by Studio 39+: a contemporary African residence in Siaya, Kenya, designed with stone, timber fins, textured plaster, glass, and passive tropical-modern strategies."
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
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A grounded tropical-modern residence composed through mass, shadow, and filtered light.</h2>
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

      <section className="content-container pb-20 md:pb-28" aria-labelledby="featured-gallery">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Featured Gallery" title="Exterior renders, filtered thresholds, and material atmosphere." />
          <Link to="/projects" className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand">
            All projects
          </Link>
        </div>
        <div className="ukwala-gallery">
          {project.gallery.map((image, index) => (
            <button key={image.src} type="button" onClick={() => setLightboxItem(image)} className={`ukwala-gallery-item group ${index === 0 ? 'is-wide' : ''}`} aria-label={`Open ${image.title} render`}>
              <img src={image.src} alt={image.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.04]" />
              <span>{image.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-sand/70 py-20 md:py-28 dark:bg-black/10" aria-labelledby="architectural-drawings">
        <div className="content-container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Architectural Drawings</p>
            <h2 id="architectural-drawings" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Approval drawing set: plans, elevations, sections, and roof strategy.</h2>
          </div>
          <div className="ukwala-drawings">
            {project.drawings.map((drawing) => (
              <button key={drawing.src} type="button" onClick={() => setLightboxItem(drawing)} className="ukwala-drawing-card" aria-label={`Open ${drawing.title} fullscreen`}>
                <object data={`${drawing.src}#toolbar=0&navpanes=0`} type="application/pdf" tabIndex="-1" aria-label={drawing.alt}>
                  <div className="ukwala-drawing-fallback">
                    <span />
                    <span />
                    <span />
                  </div>
                </object>
                <div className="flex items-center justify-between gap-4 border-t border-charcoal/10 px-5 py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal dark:text-ivory">{drawing.title}</h3>
                  <span aria-hidden="true" className="text-charcoal/45 dark:text-sand/60">Fullscreen</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-container py-20 md:py-28" aria-labelledby="design-language">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow">Design Language</p>
            <h2 id="design-language" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A minimalist palette with weight, warmth, and African light.</h2>
            <p className="mt-7 text-base leading-9 text-charcoal/72 dark:text-sand">
              The architecture is intentionally restrained: stone provides permanence, plaster softens the massing, timber fins filter glare, and glass opens the interior to gardens and changing daylight.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {project.palette.map((item) => (
              <article key={item.title} className="ukwala-palette-item">
                <div className="aspect-[4/3] overflow-hidden bg-mist">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-1000 hover:scale-[1.035]" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-charcoal dark:text-ivory">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal/68 dark:text-sand">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Discuss a private residence with Studio 39+." />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

function EarthenThresholdCaseStudy({ project }) {
  const [lightboxItem, setLightboxItem] = useState(null);
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
        description="Earthen Threshold by Studio 39+: an outdoor brick WC pavilion in Bomachoge, Kisii, exploring perforated brick architecture, filtered daylight, ventilation, and tactile earth-toned material atmosphere."
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
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A small service structure treated as a chamber of brick, air, and shadow.</h2>
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

      <section className="content-container pb-20 md:pb-28" aria-labelledby="earthen-gallery">
        <div className="mb-10 max-w-4xl">
          <p className="eyebrow text-[#8e4a32] dark:text-[#d8aa86]">Featured Image Gallery</p>
          <h2 id="earthen-gallery" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Exterior mass, interior compression, and the quiet grain of masonry.</h2>
        </div>
        <div className="earthen-gallery">
          {project.gallery.map((image, index) => (
            <button key={image.src} type="button" onClick={() => setLightboxItem(image)} className={`earthen-gallery-item group ${index === 0 || index === 2 ? 'is-large' : ''}`} aria-label={`Open ${image.title} image`}>
              <img src={image.src} alt={image.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]" />
              <span>{image.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="earthen-drawing-section py-20 md:py-28" aria-labelledby="earthen-drawings">
        <div className="content-container">
          <div className="mb-10 grid gap-6 border-b border-charcoal/18 pb-8 md:grid-cols-[0.42fr_0.58fr] dark:border-ivory/14">
            <p className="eyebrow text-[#8e4a32] dark:text-[#d8aa86]">Architectural Drawings</p>
            <h2 id="earthen-drawings" className="font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A technical set for floor, roof, elevation, and section studies.</h2>
          </div>
          <div className="earthen-drawings">
            {project.drawings.map((drawing) => (
              <button key={drawing.src} type="button" onClick={() => setLightboxItem(drawing)} className="earthen-drawing-card" aria-label={`Open ${drawing.title} fullscreen`}>
                <object data={`${drawing.src}#toolbar=0&navpanes=0`} type="application/pdf" tabIndex="-1" aria-label={drawing.alt}>
                  <div className="ukwala-drawing-fallback">
                    <span />
                    <span />
                    <span />
                  </div>
                </object>
                <div className="flex items-center justify-between gap-4 border-t border-charcoal/14 px-5 py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal dark:text-ivory">{drawing.title}</h3>
                  <span aria-hidden="true" className="text-xs uppercase tracking-[0.16em] text-charcoal/48 dark:text-sand/60">Enlarge</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-container py-20 md:py-28" aria-labelledby="earthen-material">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="eyebrow text-[#8e4a32] dark:text-[#d8aa86]">Material & Atmosphere</p>
            <h2 id="earthen-material" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Clay, aperture, privacy, and the slow movement of air.</h2>
            <p className="mt-7 text-base leading-9 text-charcoal/72 dark:text-sand">
              Exposed red brick becomes both enclosure and ornament. Perforated masonry turns the wall into a breathing screen, while frosted glazing and the mono-pitch roof temper direct light into a softer sensory field.
            </p>
          </div>
          <div className="earthen-palette-grid">
            {project.palette.map((item) => (
              <article key={item.title} className="earthen-palette-item">
                <div className="aspect-[4/3] overflow-hidden bg-[#c96b48]/20">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-1000 hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-charcoal dark:text-ivory">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal/68 dark:text-sand">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Discuss a material-focused pavilion with Studio 39+." />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

function SaikaHouseCaseStudy({ project }) {
  const [lightboxItem, setLightboxItem] = useState(null);
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
        description="Saika House by Studio 39+: a warm contemporary private residence in Saika, Nairobi, shaped by Mazeras stone, textured plaster, terracotta roof tones, courtyard living, and landscaped circulation."
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
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A warm contemporary residence shaped by courtyard movement, stone texture, and garden-facing rooms.</h2>
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

      <section className="content-container pb-20 md:pb-28" aria-labelledby="saika-gallery">
        <div className="mb-10 max-w-4xl">
          <p className="eyebrow text-[#9a5e32] dark:text-[#d6aa7c]">Featured Gallery</p>
          <h2 id="saika-gallery" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Exterior views, courtyard paths, garage approach, aerial organization, and landscaped edges.</h2>
        </div>
        <div className="saika-gallery">
          {project.gallery.map((image, index) => (
            <button key={image.src} type="button" onClick={() => setLightboxItem(image)} className={`saika-gallery-item group ${index === 0 || index === 5 ? 'is-large' : ''}`} aria-label={`Open ${image.title} image`}>
              <img src={image.src} alt={image.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]" />
              <span>{image.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="saika-drawing-section py-20 md:py-28" aria-labelledby="saika-drawings">
        <div className="content-container">
          <div className="mb-10 grid gap-6 border-b border-charcoal/16 pb-8 md:grid-cols-[0.4fr_0.6fr] dark:border-ivory/14">
            <p className="eyebrow text-[#9a5e32] dark:text-[#d6aa7c]">Architectural Drawings</p>
            <h2 id="saika-drawings" className="font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Construction drawing references for site planning, plans, elevations, sections, windows, and doors.</h2>
          </div>
          <div className="saika-drawings">
            {project.drawings.map((drawing) => (
              <button key={drawing.src} type="button" onClick={() => setLightboxItem(drawing)} className="saika-drawing-card" aria-label={`Open ${drawing.title} fullscreen`}>
                <object data={`${drawing.src}#toolbar=0&navpanes=0`} type="application/pdf" tabIndex="-1" aria-label={drawing.alt}>
                  <div className="ukwala-drawing-fallback">
                    <span />
                    <span />
                    <span />
                  </div>
                </object>
                <div className="flex items-center justify-between gap-4 border-t border-charcoal/14 px-5 py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal dark:text-ivory">{drawing.title}</h3>
                  <span aria-hidden="true" className="text-xs uppercase tracking-[0.16em] text-charcoal/48 dark:text-sand/60">Enlarge</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-container py-20 md:py-28" aria-labelledby="saika-material">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="eyebrow text-[#9a5e32] dark:text-[#d6aa7c]">Material & Detail</p>
            <h2 id="saika-material" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Stone, plaster, screens, roof warmth, and planted circulation.</h2>
            <p className="mt-7 text-base leading-9 text-charcoal/72 dark:text-sand">
              The residence uses material contrast gently: rough Mazeras stone against quiet plaster, vertical screens against garden views, terracotta roof tones above shaded paths, and planted edges that soften every movement through the site.
            </p>
          </div>
          <div className="saika-palette-grid">
            {project.palette.map((item) => (
              <article key={item.title} className="saika-palette-item">
                <div className="aspect-[4/3] overflow-hidden bg-[#caa57b]/20">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-1000 hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-charcoal dark:text-ivory">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal/68 dark:text-sand">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-container pb-20 md:pb-28" aria-labelledby="saika-spatial">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[#9a5e32] dark:text-[#d6aa7c]">Spatial Experience</p>
            <h2 id="saika-spatial" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Quietly luxurious daily life, organized around garden, shade, and movement.</h2>
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

      <CTASection title="Discuss a warm contemporary residence with Studio 39+." />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

function KiserianHouseCaseStudy({ project }) {
  const [lightboxItem, setLightboxItem] = useState(null);
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
        description="Kiserian House by Studio 39+: a contemporary 3-bedroom bungalow in Kajiado, Kenya, shaped by mono-pitched roofs, warm plaster, stone cladding, efficient family planning, and complete approval drawings."
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
          alt="Kiserian House contemporary bungalow exterior render with mono-pitched roof, textured plaster, stone cladding, recessed windows, and warm Kajiado landscape"
          fetchPriority="high"
          decoding="async"
          className="saika-hero-image absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: project.imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#302720]/84 via-[#302720]/24 to-[#302720]/4" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, ease: 'easeOut' }} className="content-container relative z-10 flex flex-col justify-end pb-14 pt-32 text-ivory sm:pb-20">
          <p className="eyebrow text-ivory/76">Studio 39+</p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">{project.name}</h1>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.24em] text-ivory/78 sm:text-sm">
            <span>Kiserian, Kajiado</span>
            <span>Studio 39+</span>
          </div>
        </motion.div>
      </section>

      <section className="content-container grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75 }} className="max-w-3xl">
          <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Project Overview</p>
          <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">A calm contemporary bungalow shaped by simple roof geometry, warm materiality, and efficient family living.</h2>
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

      <section className="content-container pb-20 md:pb-28" aria-labelledby="kiserian-gallery">
        <div className="mb-10 max-w-4xl">
          <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Featured Gallery</p>
          <h2 id="kiserian-gallery" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Exterior atmosphere, plan clarity, roof form, elevations, and interior technical layers.</h2>
        </div>
        <div className="saika-gallery">
          {project.gallery.map((image, index) => (
            <button key={image.src} type="button" onClick={() => setLightboxItem(image)} className={`saika-gallery-item group ${index === 0 || index === 4 ? 'is-large' : ''}`} aria-label={`Open ${image.title} image`}>
              <img src={image.src} alt={image.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]" />
              <span>{image.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="saika-drawing-section py-20 md:py-28" aria-labelledby="kiserian-drawings">
        <div className="content-container">
          <div className="mb-10 grid gap-6 border-b border-charcoal/16 pb-8 md:grid-cols-[0.4fr_0.6fr] dark:border-ivory/14">
            <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Architectural Drawings</p>
            <h2 id="kiserian-drawings" className="font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Approval drawing references for plans, roof strategy, elevations, drainage, lighting, and interior documentation.</h2>
          </div>
          <div className="saika-drawings">
            {project.drawings.map((drawing) => (
              <button key={drawing.src} type="button" onClick={() => setLightboxItem(drawing)} className="saika-drawing-card" aria-label={`Open ${drawing.title} fullscreen`}>
                <img src={drawing.src} alt={drawing.alt} loading="lazy" decoding="async" className="block h-72 w-full bg-ivory object-cover object-center md:h-80 lg:h-72" />
                <div className="flex items-center justify-between gap-4 border-t border-charcoal/14 px-5 py-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal dark:text-ivory">{drawing.title}</h3>
                  <span aria-hidden="true" className="text-xs uppercase tracking-[0.16em] text-charcoal/48 dark:text-sand/60">Enlarge</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-container py-20 md:py-28" aria-labelledby="kiserian-material">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Material & Detail</p>
            <h2 id="kiserian-material" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Stone, plaster, shaded openings, roof warmth, and restrained domestic detail.</h2>
            <p className="mt-7 text-base leading-9 text-charcoal/72 dark:text-sand">
              The house relies on quiet material contrast: stone anchors the base, textured plaster softens the walls, deep reveals control daylight, and timber-toned soffits bring warmth to the roof edge and entry threshold.
            </p>
          </div>
          <div className="saika-palette-grid">
            {project.palette.map((item) => (
              <article key={item.title} className="saika-palette-item">
                <div className="aspect-[4/3] overflow-hidden bg-[#c7a174]/20">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-1000 hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-charcoal dark:text-ivory">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal/68 dark:text-sand">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-container pb-20 md:pb-28" aria-labelledby="kiserian-spatial">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Spatial Experience</p>
            <h2 id="kiserian-spatial" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Relaxed family living, clear circulation, natural light, and quiet suburban atmosphere.</h2>
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

      <section className="bg-[#efe3d2]/70 py-20 md:py-28 dark:bg-black/10" aria-labelledby="kiserian-technical">
        <div className="content-container grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow text-[#94613b] dark:text-[#d5ae83]">Technical Documentation</p>
            <h2 id="kiserian-technical" className="mt-5 font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl dark:text-ivory">Studio 39+ delivers both architectural vision and technical execution.</h2>
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

      <CTASection title="Discuss a calm contemporary bungalow with Studio 39+." />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => projects.find((item) => item.id === projectId), [projectId]);

  if (!project) {
    return (
      <div className="pt-32 pb-24 content-container">
        <SEO title="Residence Not Found" description="The requested Studio 39+ residence study could not be found." />
        <p className="eyebrow">Project not found</p>
        <button onClick={() => navigate('/projects')} className="btn-secondary mt-6">
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
              alt={`${project.name} exterior and spatial atmosphere in ${project.location}`}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="content-container grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-10">
          <SectionHeading eyebrow="Project Overview" title="A detailed residential story from brief to spatial concept." />
          <p className="text-base leading-9 text-charcoal/72 dark:text-sand">{project.overview}</p>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Client Brief</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.brief}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Design Concept</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.concept}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Site / Context</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.context}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Challenges Solved</h2>
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
          <ListBlock title="Materials" items={project.materials} />
          <ListBlock title="Renders" items={project.renders} />
          <ListBlock title="Floor Plans" items={project.floorPlans} />
          <div>
            <h3 className="eyebrow">Studio Scope</h3>
            <ul className="mt-5 space-y-3 text-base leading-8 text-charcoal/72 dark:text-sand">
              <li>Architecture</li>
              <li>Interior Architecture</li>
              <li>Architectural Visualization</li>
              <li>Documentation Strategy</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="content-container pb-20 md:pb-28" aria-labelledby="process-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Process" title="Drawings, diagrams, palettes, and decision tools that make the design legible." />
          <div className="grid gap-5 sm:grid-cols-3">
            <DrawingPanel title="Plans" items={project.floorPlans} />
            <DrawingPanel title="Diagrams" items={['arrival sequence', 'privacy gradient', 'light and view strategy']} />
            <DrawingPanel title="Palette" items={project.materials.slice(0, 4)} />
          </div>
        </div>
      </section>

      <section className="content-container pb-20 md:pb-28" aria-labelledby="gallery-title">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="gallery-title" className="text-3xl font-semibold text-charcoal dark:text-ivory">Residential Atmosphere Studies</h2>
          <Link to="/projects" className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand">
            All projects
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {gallery.map((image, index) => (
            <div key={image} className="aspect-[4/3] overflow-hidden bg-mist dark:bg-charcoal">
              <img
                src={optimizedImageUrl(image, 900)}
                srcSet={imageSrcSet(image, [480, 720, 960])}
                sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                alt={`${project.name} render ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
      <CTASection title={`Discuss a project like ${project.name}.`} />
    </div>
  );
}

export default ProjectDetail;
