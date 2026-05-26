import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

const slides = [
  {
    label: 'Architecture Studio / Nairobi',
    title: 'Architecture Rooted in Clarity, Atmosphere & Experience',
    description:
      'Studio 39+ designs refined residential, hospitality, and experiential environments across East Africa.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    position: 'center 54%',
    accent: 'Hospitality / Residential / Visualization'
  },
  {
    label: 'Hospitality Architecture',
    title: 'Safari lodges, retreats, and guest spaces shaped around landscape.',
    description:
      'We translate site, climate, and guest journey into quiet spatial narratives for hospitality projects with a strong sense of place.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    position: 'center 46%',
    accent: 'Selected East African concepts'
  },
  {
    label: 'Architectural Visualization',
    title: 'Atmospheric visuals that help clients decide before they build.',
    description:
      'From early concepts to final presentation imagery, the studio uses visualization to clarify design intent and material atmosphere.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    position: 'center 50%',
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
    <section className="home-hero relative overflow-hidden bg-charcoal text-ivory" aria-labelledby="home-hero-title">
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
            <motion.img
              src={optimizedImageUrl(slides[active].image, 1600)}
              srcSet={imageSrcSet(slides[active].image, [720, 1080, 1440, 1800])}
              sizes="100vw"
              alt=""
              fetchPriority={active === 0 ? 'high' : 'auto'}
              decoding="async"
              style={{ objectPosition: slides[active].position }}
              initial={prefersReducedMotion ? false : { scale: 1.04 }}
              animate={prefersReducedMotion ? undefined : { scale: 1.1, x: active % 2 === 0 ? -14 : 14 }}
              transition={{ duration: 8.2, ease: 'linear' }}
              className="h-full w-full object-cover opacity-80"
            />
            <div className="hero-overlay absolute inset-0" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="content-container hero-mobile relative z-10 flex flex-col justify-end py-10 sm:py-16 md:py-24 xl:py-28">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hero-statement max-w-6xl space-y-6 sm:space-y-8"
        >
          <p className="eyebrow text-ivory/78">{slides[active].label}</p>
          <h1 id="home-hero-title" className="hero-title text-balance font-semibold text-ivory">
            {slides[0].title}
          </h1>
          <p className="hero-copy text-ivory/82">
            Studio 39+ designs refined residential, <span className="block sm:inline">hospitality, and experiential environments</span> <span className="block sm:inline">across East Africa.</span>
          </p>
          <div className="hero-actions flex flex-col gap-3 text-sm uppercase tracking-[0.24em] sm:flex-row">
            <Link to="/projects" className="btn-primary hero-button">
              View Projects
            </Link>
            <Link to="/contact" className="btn-secondary hero-button">
              Start a Project
            </Link>
          </div>
        </motion.div>

        <div className="hero-index mt-12 grid gap-5 border-t border-ivory/22 pt-7 text-ivory/78 sm:grid-cols-3 lg:mt-20">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.label}
              onClick={() => setActive(index)}
              className={`text-left transition ${index === active ? 'text-ivory' : 'text-ivory/58 hover:text-ivory'}`}
              aria-label={`Select hero slide ${index + 1}: ${slide.label}`}
              aria-current={index === active}
            >
              <span className="eyebrow block text-inherit">0{index + 1} / {slide.label}</span>
              <span className="mt-3 block max-w-xs text-sm leading-7">{slide.accent}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSlideshow;
