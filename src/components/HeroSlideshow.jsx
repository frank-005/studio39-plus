import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ivory dark:bg-charcoal">
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
              src={slides[active].image}
              alt={slides[active].label}
              className="h-full w-full object-cover object-center opacity-60 transition duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ivory/80 via-ivory/60 to-ivory/80 dark:from-charcoal/90 dark:via-charcoal/70 dark:to-charcoal/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="content-container relative z-10 grid gap-16 py-28 md:py-32 lg:grid-cols-[1.2fr_.8fr] lg:items-end xl:py-36">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-10"
        >
          <p className="text-sm uppercase tracking-[0.5em] text-charcoal/70 dark:text-sand">{slides[active].label}</p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-charcoal sm:text-6xl dark:text-ivory">
            {slides[active].title}
          </h1>
          <p className="max-w-2xl text-lg leading-10 text-charcoal/70 dark:text-sand">
            {slides[active].description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.35em]">
            <Link to="/projects" className="rounded-full border border-charcoal px-6 py-3 text-charcoal hover:bg-charcoal hover:text-ivory dark:border-sand dark:text-sand dark:hover:bg-sand dark:hover:text-charcoal">
              View Projects
            </Link>
            <Link to="/contact" className="rounded-full border border-mist bg-charcoal px-6 py-3 text-ivory hover:bg-[#3a372f] dark:bg-sand dark:text-charcoal dark:hover:bg-[#d5cabc]">
              Start a Project
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="rounded-[32px] border border-mist bg-charcoal p-12 text-ivory shadow-soft dark:border-neutral-700 md:p-14"
        >
          <p className="text-sm uppercase tracking-[0.45em] text-sand">Studio 39+</p>
          <h2 className="mt-6 text-3xl font-semibold leading-tight">A refined practice in contemporary architecture.</h2>
          <p className="mt-6 text-base leading-9 text-sand">
            We ground each project in clarity, material intent, and quiet luxury. Our work celebrates proportion, light, and spatial atmosphere at every scale.
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.45em] text-sand">Featured project</p>
          <p className="mt-3 text-xl font-semibold text-ivory">{slides[active].accent}</p>
        </motion.div>
      </div>

      <div className="content-container relative z-10 flex items-center justify-center gap-3 pb-12">
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActive(index)}
            className={`h-3 w-14 rounded-full transition ${index === active ? 'bg-charcoal dark:bg-sand' : 'bg-mist dark:bg-neutral-700'}`}
            aria-label={`Select slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlideshow;
