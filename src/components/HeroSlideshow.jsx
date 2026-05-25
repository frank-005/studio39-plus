import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

const slides = [
  {
    label: 'Residential Architecture',
    title: 'Architecture Rooted in Clarity, Experience & Atmosphere.',
    description: 'Studio 39+ creates contemporary residential, hospitality, and experiential spaces through architecture, visualization, and thoughtful design.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
    accent: 'Northern Pavilion'
  },
  {
    label: 'Hospitality Design',
    title: 'Composed spaces with generous light, calm geometry, and material precision.',
    description: 'A boutique studio practice that balances quiet luxury with a strong sense of place and crafted atmospheres.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    accent: 'Lakeside Retreat'
  },
  {
    label: 'Interior Architecture',
    title: 'Design that feels editorial, atmospheric, and deliberately restrained.',
    description: 'Thoughtful spatial composition, tactile detailing, and polished visual storytelling for modern interiors.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    accent: 'Urban Loft'
  }
];

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 7000);

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
              className="h-full w-full object-cover object-center opacity-60 transition duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ivory/80 via-ivory/60 to-ivory/80 dark:from-charcoal/90 dark:via-charcoal/70 dark:to-charcoal/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="content-container relative z-10 grid min-h-[calc(100svh-5rem)] gap-12 py-16 sm:py-20 md:py-24 lg:grid-cols-[1.2fr_.8fr] lg:items-end xl:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-10"
        >
          <p className="eyebrow">{slides[active].label}</p>
          <h1 id="home-hero-title" className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl lg:text-6xl dark:text-ivory">
            {slides[active].title}
          </h1>
          <p className="max-w-2xl text-lg leading-10 text-charcoal/70 dark:text-sand">
            {slides[active].description}
          </p>
          <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.24em] sm:flex-row">
            <Link to="/projects" className="btn-secondary">
              View Projects
            </Link>
            <Link to="/contact" className="btn-primary">
              Book Consultation
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="border border-mist bg-charcoal p-7 text-ivory shadow-soft dark:border-neutral-700 sm:p-9 md:p-12"
        >
          <p className="eyebrow text-sand">Studio 39+</p>
          <h2 className="mt-6 text-2xl font-semibold leading-tight sm:text-3xl">A refined practice in contemporary architecture.</h2>
          <p className="mt-6 text-base leading-9 text-sand">
            Architects in Nairobi for residential, hospitality, safari lodge, and architectural visualization work across Kenya and East Africa.
          </p>
          <p className="eyebrow mt-8 text-sand">Featured project</p>
          <p className="mt-3 text-xl font-semibold text-ivory">{slides[active].accent}</p>
        </motion.div>
      </div>

      <div className="content-container relative z-10 flex items-center justify-center gap-3 pb-12">
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActive(index)}
            className={`h-3 w-12 rounded-full transition sm:w-14 ${index === active ? 'bg-charcoal dark:bg-sand' : 'bg-mist dark:bg-neutral-700'}`}
            aria-label={`Select slide ${index + 1}`}
            aria-current={index === active}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlideshow;
