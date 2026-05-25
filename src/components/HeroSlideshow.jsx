import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

const slides = [
  {
    label: 'Architecture Studio / Nairobi',
    title: 'Contemporary Hospitality & Residential Architecture Across East Africa',
    description:
      'Studio 39+ creates refined architectural experiences across East Africa, blending atmosphere, material clarity, and buildable design.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    accent: 'Hospitality / Residential / Visualization'
  },
  {
    label: 'Hospitality Architecture',
    title: 'Safari lodges, retreats, and guest spaces shaped around landscape.',
    description:
      'We translate site, climate, and guest journey into quiet spatial narratives for hospitality projects with a strong sense of place.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    accent: 'Selected East African concepts'
  },
  {
    label: 'Architectural Visualization',
    title: 'Atmospheric visuals that help clients decide before they build.',
    description:
      'From early concepts to final presentation imagery, the studio uses visualization to clarify design intent and material atmosphere.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    accent: 'Concept to documentation'
  }
];

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 7600);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-ivory dark:bg-charcoal" aria-labelledby="home-hero-title">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={optimizedImageUrl(slides[active].image, 1600)}
              srcSet={imageSrcSet(slides[active].image, [720, 1080, 1440, 1800])}
              sizes="100vw"
              alt=""
              fetchPriority={active === 0 ? 'high' : 'auto'}
              decoding="async"
              className="h-full w-full object-cover object-center opacity-68 transition duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ivory/88 via-ivory/62 to-ivory/86 dark:from-[#050505]/92 dark:via-charcoal/72 dark:to-[#050505]/92" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="content-container relative z-10 grid min-h-[calc(92svh-5rem)] gap-10 py-14 sm:min-h-[calc(96svh-5rem)] sm:py-18 md:py-24 lg:grid-cols-[1.25fr_.75fr] lg:items-end xl:py-28">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl space-y-8 sm:space-y-10"
        >
          <p className="eyebrow">{slides[active].label}</p>
          <h1 id="home-hero-title" className="max-w-5xl text-balance text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl lg:text-6xl dark:text-ivory">
            {slides[active].title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-charcoal/76 sm:text-lg sm:leading-9 dark:text-sand">
            {slides[active].description}
          </p>
          <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.24em] sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Start a Project
            </Link>
            <Link to="/projects" className="btn-secondary">
              View Projects
            </Link>
          </div>
        </motion.div>

        <motion.aside
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="border border-mist bg-charcoal/95 p-7 text-ivory shadow-soft dark:border-white/10 dark:bg-black/45 sm:p-9 md:p-10"
        >
          <p className="eyebrow text-sand">Studio 39+</p>
          <h2 className="mt-6 text-2xl font-semibold leading-tight sm:text-3xl">From concept to visualization to documentation.</h2>
          <p className="mt-6 text-sm leading-8 text-sand sm:text-base">
            A focused Nairobi studio for private residences, boutique hospitality, safari camp design, interiors, and architectural visualization.
          </p>
          <p className="eyebrow mt-8 text-sand">Current focus</p>
          <p className="mt-3 text-lg font-semibold text-ivory">{slides[active].accent}</p>
        </motion.aside>
      </div>

      <div className="content-container relative z-10 flex items-center justify-center gap-3 pb-10">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.label}
            onClick={() => setActive(index)}
            className={`h-3 min-w-11 rounded-full transition sm:min-w-14 ${index === active ? 'bg-charcoal dark:bg-[#d6b98c]' : 'bg-mist dark:bg-neutral-700'}`}
            aria-label={`Select hero slide ${index + 1}: ${slide.label}`}
            aria-current={index === active}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlideshow;
