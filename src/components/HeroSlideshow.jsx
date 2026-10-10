import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';
import ContentLink from './ContentLink';

const DEFAULT_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=82', position: 'center 48%' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=82', position: 'center 50%' },
  { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=82', position: 'center 48%' },
  { src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=82', position: 'center 50%' },
  { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=82', position: 'center 48%' },
  { src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=82', position: 'center 50%' },
  { src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2000&q=82', position: 'center 48%' }
];

function HeroSlideshow({
  slides: contentSlides = [],
  images = [],
  primaryButtonText = 'Start a Conversation',
  primaryButtonUrl = '/contact',
  secondaryButtonText = 'Explore Our Work',
  secondaryButtonUrl = '/projects'
}) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const failedImages = useRef(new Set());
  const imagesToShow = images.length > 0 ? images : DEFAULT_IMAGES;
  const slide = contentSlides[0] || {
    label: 'Your Project',
    title: 'Spaces shaped around people and place.',
    description: 'Thoughtful architecture and interiors shaped by the brief, the place, and the people who use each space.'
  };

  const advance = useCallback((fromIndex) => {
    if (imagesToShow.length < 2) return;
    for (let offset = 1; offset <= imagesToShow.length; offset += 1) {
      const candidate = (fromIndex + offset) % imagesToShow.length;
      if (!failedImages.current.has(candidate)) {
        setActive(candidate);
        return;
      }
    }
  }, [imagesToShow]);

  useEffect(() => {
    if (imagesToShow.length < 2) return undefined;
    const timer = window.setInterval(() => advance(active), 30000);
    return () => window.clearInterval(timer);
  }, [active, advance, imagesToShow.length]);

  useEffect(() => {
    if (imagesToShow.length < 2) return undefined;
    const next = (active + 1) % imagesToShow.length;
    let preload;
    for (let offset = 0; offset < imagesToShow.length; offset += 1) {
      const candidate = (next + offset) % imagesToShow.length;
      if (!failedImages.current.has(candidate)) {
        preload = new Image();
        preload.src = optimizedImageUrl(imagesToShow[candidate].src, 1440);
        break;
      }
    }
    return () => {
      if (preload) preload.onload = preload.onerror = null;
    };
  }, [active, imagesToShow]);

  const currentImage = imagesToShow[active] || imagesToShow[0];

  return (
    <section className="home-hero relative overflow-hidden bg-charcoal text-ivory" aria-labelledby="home-hero-title">
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={active}
            src={optimizedImageUrl(currentImage.src, 1800)}
            srcSet={imageSrcSet(currentImage.src, [480, 720, 1080, 1440, 1800])}
            sizes="100vw"
            alt=""
            fetchPriority={active === 0 ? 'high' : 'auto'}
            loading={active === 0 ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => {
              failedImages.current.add(active);
              advance(active);
            }}
            style={{ objectPosition: currentImage.position || 'center 50%' }}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: prefersReducedMotion ? 1 : 1.04 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: prefersReducedMotion ? 0.01 : 1.2, ease: 'easeInOut' }, scale: { duration: 1.2, ease: 'easeOut' } }}
            className="absolute inset-0 h-full w-full object-cover opacity-85"
          />
        </AnimatePresence>
        <div className="hero-overlay absolute inset-0" />
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
      </div>
    </section>
  );
}

export default HeroSlideshow;
