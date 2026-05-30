import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

const slides = [
  {
    label: 'Luxury Residential Architecture / Kenya',
    title: 'Designing Exceptional Homes Rooted in Place.',
    description:
      'Studio 39+ creates refined residential spaces that blend contemporary architecture with climate, culture, and lifestyle across East Africa.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=82',
    position: 'center 48%',
    accent: 'Private residences, villas, and family estates'
  },
  {
    label: 'Coastal Villas / Private Retreats',
    title: 'Bespoke Architecture for Modern Living.',
    description:
      'Homes composed through shade, breeze, natural light, tactility, and a quiet sense of occasion.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82',
    position: 'center 50%',
    accent: 'Coastal villas and retreat-style homes'
  },
  {
    label: 'Estate Living / East Africa',
    title: 'Architecture with the Stillness of a Private Retreat.',
    description:
      'Contextual homes for clients seeking calm, privacy, generosity, and an enduring relationship with landscape.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=82',
    position: 'center 47%',
    accent: 'Residential master planning and private compounds'
  }
];

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const slide = slides[active];

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 8200);

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
            transition={{ duration: 1.15, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <motion.img
              src={optimizedImageUrl(slide.image, 1800)}
              srcSet={imageSrcSet(slide.image, [720, 1080, 1440, 1800])}
              sizes="100vw"
              alt=""
              fetchPriority={active === 0 ? 'high' : 'auto'}
              decoding="async"
              style={{ objectPosition: slide.position }}
              initial={prefersReducedMotion ? false : { scale: 1.02, y: 0 }}
              animate={prefersReducedMotion ? undefined : { scale: 1.09, y: active % 2 === 0 ? -10 : 10 }}
              transition={{ duration: 9, ease: 'linear' }}
              className="h-full w-full object-cover opacity-85"
            />
            <div className="hero-overlay absolute inset-0" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="content-container hero-mobile relative z-10 flex flex-col justify-end py-10 sm:py-16 md:py-24 xl:py-28">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="hero-statement max-w-6xl space-y-7 sm:space-y-9"
        >
          <p className="eyebrow text-ivory/76">{slide.label}</p>
          <h1 id="home-hero-title" className="hero-title text-balance font-serif font-medium text-ivory">
            {slide.title}
          </h1>
          <p className="hero-copy text-ivory/84">{slide.description}</p>
          <div className="hero-actions flex flex-col gap-3 text-sm uppercase tracking-[0.24em] sm:flex-row">
            <Link to="/projects" className="btn-primary hero-button">
              View Projects
            </Link>
            <Link to="/contact" className="btn-secondary hero-button">
              Start Your Project
            </Link>
          </div>
        </motion.div>

        <div className="hero-index mt-14 grid gap-5 border-t border-ivory/20 pt-7 text-ivory/74 sm:grid-cols-3 lg:mt-24">
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.label}
              onClick={() => setActive(index)}
              className={`text-left transition ${index === active ? 'text-ivory' : 'text-ivory/56 hover:text-ivory'}`}
              aria-label={`Select hero slide ${index + 1}: ${item.label}`}
              aria-current={index === active}
            >
              <span className="eyebrow block text-inherit">0{index + 1} / {item.label}</span>
              <span className="mt-3 block max-w-xs text-sm leading-7">{item.accent}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSlideshow;
