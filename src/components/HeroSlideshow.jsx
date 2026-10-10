import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';
import ContentLink from './ContentLink';

const slides = [
  {
    label: 'Your Project',
    title: 'Spaces shaped around people and place.',
    description:
      'From the first conversation to the final detail, we develop thoughtful architecture and interiors shaped by the brief, the place, and the people who use each space.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=82',
    position: 'center 48%',
    accent: 'Residential, hospitality, and commercial design'
  },
  {
    label: 'Your Vision',
    title: 'Design that responds to its context.',
    description:
      'Across Nairobi and Kenya, each project begins with its setting, purpose, users, and the conditions that shape it.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82',
    position: 'center 50%',
    accent: 'Ideas grounded in landscape, climate, and use'
  },
  {
    label: 'Your Everyday',
    title: 'Architecture that works for everyday life.',
    description:
      'Good architecture brings function, context, materiality, and technical precision into the same design conversation.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=82',
    position: 'center 47%',
    accent: 'Spaces designed around how they are used'
  }
];

function HeroSlideshow({
  slides: contentSlides = [],
  primaryButtonText = 'Start a Conversation',
  primaryButtonUrl = '/contact',
  secondaryButtonText = 'Explore Our Work',
  secondaryButtonUrl = '/projects'
}) {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const slidesToShow = contentSlides.length > 0 ? contentSlides : slides;
  const activeSlide = Math.min(active, slidesToShow.length - 1);
  const slide = slidesToShow[activeSlide];

  return (
    <section className="home-hero relative overflow-hidden bg-charcoal text-ivory" aria-labelledby="home-hero-title">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
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
              initial={prefersReducedMotion ? false : { scale: 1.02 }}
              animate={prefersReducedMotion ? undefined : { scale: 1.06 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full w-full object-cover opacity-85"
            />
            <div className="hero-overlay absolute inset-0" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="content-container hero-mobile relative z-10 flex flex-col justify-end py-10 sm:py-16 md:py-24 xl:py-28">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="hero-statement max-w-6xl space-y-7 sm:space-y-9"
        >
          <p className="eyebrow text-ivory/76">{slide.label}</p>
          <h1 id="home-hero-title" className="hero-title text-balance font-serif font-medium text-ivory">
            {slide.title}
          </h1>
          <p className="hero-copy text-ivory/84">{slide.description}</p>
          <div className="hero-actions flex flex-col gap-3 text-sm uppercase tracking-[0.24em] sm:flex-row">
            <ContentLink href={primaryButtonUrl} className="btn-primary hero-button">
              {primaryButtonText}
            </ContentLink>
            <ContentLink href={secondaryButtonUrl} className="btn-secondary hero-button">
              {secondaryButtonText}
            </ContentLink>
          </div>
        </motion.div>

        {slidesToShow.length > 1 ? <div className="hero-index mt-14 grid gap-5 border-t border-ivory/20 pt-7 text-ivory/74 sm:grid-cols-3 lg:mt-24">
          {slidesToShow.map((item, index) => (
            <button
              type="button"
              key={item.label}
              onClick={() => setActive(index)}
              className={`text-left transition duration-200 ${index === active ? 'text-ivory' : 'text-ivory/56 hover:text-ivory'}`}
              aria-label={`Select hero slide ${index + 1}: ${item.label}`}
              aria-current={index === activeSlide}
            >
              <span className="eyebrow block text-inherit">0{index + 1} / {item.label}</span>
              <span className="mt-3 block max-w-xs text-sm leading-7">{item.accent}</span>
            </button>
          ))}
        </div> : null}
      </div>
    </section>
  );
}

export default HeroSlideshow;
