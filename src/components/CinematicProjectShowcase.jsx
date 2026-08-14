import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

const wrapIndex = (index, length) => (index + length) % length;

function CinematicProjectShowcase({
  projects = [],
  onProjectChange = null,
  variant = 'page',
  eyebrow = 'Featured Residences',
  title = 'Selected private homes, villas, and residential studies.'
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const activeProject = projects[activeIndex];
  const isSection = variant === 'section';

  useEffect(() => {
    if (activeIndex > projects.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, projects.length]);

  const setProjectIndex = useCallback(
    (index, nextDirection = 0) => {
      if (!projects.length) return;
      const nextIndex = wrapIndex(index, projects.length);
      setDirection(nextDirection);
      setActiveIndex(nextIndex);
      onProjectChange?.(nextIndex);
    },
    [onProjectChange, projects.length]
  );

  const paginate = useCallback(
    (newDirection) => {
      setProjectIndex(activeIndex + newDirection, newDirection);
    },
    [activeIndex, setProjectIndex]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        paginate(-1);
      }

      if (event.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const handleProjectSelect = (index) => {
    setProjectIndex(index, index > activeIndex ? 1 : -1);
  };

  const handleTouchStart = (event) => {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
  };

  const handleTouchEnd = (event) => {
    const diffX = touchStart.current.x - event.changedTouches[0].clientX;
    const diffY = touchStart.current.y - event.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 44) {
      paginate(diffX > 0 ? 1 : -1);
    }
  };

  const imageTransition = useMemo(
    () => ({
      duration: shouldReduceMotion ? 0 : 1.05,
      ease: [0.22, 1, 0.36, 1]
    }),
    [shouldReduceMotion]
  );

  const textTransition = useMemo(
    () => ({
      duration: shouldReduceMotion ? 0 : 0.82,
      ease: [0.22, 1, 0.36, 1],
      delay: shouldReduceMotion ? 0 : 0.18
    }),
    [shouldReduceMotion]
  );

  if (!projects.length || !activeProject) {
    return null;
  }

  const projectPath = `/projects/${activeProject.slug || activeProject.id}`;
  const projectMeta = `${activeProject.category} / ${activeProject.year}`;
  const location = activeProject.location || 'Kenya';

  return (
    <section
      className={`bg-neutral-100 text-charcoal dark:bg-charcoal dark:text-ivory ${
        isSection ? 'py-20 sm:py-28 md:py-36' : ''
      }`}
      aria-label="Featured project showcase"
    >
      {isSection ? (
        <div className="content-container mb-10 grid gap-5 md:mb-14 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <p className="eyebrow text-charcoal/62 dark:text-sand">{eyebrow}</p>
          <h2 className="max-w-5xl font-serif text-[clamp(2.5rem,5vw,6.75rem)] font-semibold leading-[0.82] tracking-[-0.05em] text-charcoal dark:text-ivory">
            {title}
          </h2>
        </div>
      ) : null}

      <div
        className={`relative overflow-hidden ${
          isSection
            ? 'mx-auto w-[min(100%,1480px)] px-0 sm:px-6 lg:px-10'
            : 'min-h-[calc(100svh-4.5rem)] w-full'
        }`}
      >
        <div
          className={`relative overflow-hidden bg-[#17130f] ${
            isSection
              ? 'min-h-[min(78svh,760px)] sm:min-h-[min(82svh,820px)]'
              : 'min-h-[calc(100svh-4.5rem)]'
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          aria-live="polite"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeProject.id}
              className="absolute inset-0"
              initial={{
                opacity: 0,
                x: shouldReduceMotion ? 0 : direction * 16,
                filter: shouldReduceMotion ? 'blur(0px)' : 'blur(8px)'
              }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{
                opacity: 0,
                x: shouldReduceMotion ? 0 : direction * -10,
                filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)'
              }}
              transition={imageTransition}
            >
              <Link
                to={projectPath}
                className="group block h-full w-full cursor-pointer"
                aria-label={`Open project page for ${activeProject.name}`}
              >
                <motion.img
                  src={optimizedImageUrl(activeProject.hero, 1920)}
                  srcSet={imageSrcSet(activeProject.hero, [720, 1200, 1600, 1920, 2400])}
                  sizes={isSection ? '(min-width: 1024px) 92vw, 100vw' : '100vw'}
                  alt={`${activeProject.name}, ${activeProject.category.toLowerCase()} by Studio 39+ in ${location}`}
                  loading={activeIndex === 0 ? 'eager' : 'lazy'}
                  fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
                  decoding="async"
                  style={{ objectPosition: activeProject.imagePosition || 'center center' }}
                  className="h-full min-h-[inherit] w-full object-cover"
                  animate={{ scale: isHovering && !shouldReduceMotion ? 1.02 : 1 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute inset-0 bg-charcoal/24"
                  animate={{ opacity: isHovering ? 0.82 : 0.62 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#17130f] via-[#17130f]/42 to-transparent" aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end px-5 pb-28 sm:px-8 sm:pb-32 md:px-12 lg:px-16">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`${activeProject.id}-caption`}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                transition={textTransition}
                className="max-w-4xl"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-sand/84 sm:text-xs">
                  {projectMeta}
                </p>
                <h3 className="mt-5 max-w-[13ch] font-serif text-5xl font-semibold leading-[0.92] text-ivory sm:text-6xl md:text-7xl lg:text-8xl" style={{ fontVariantLigatures: 'common-ligatures' }}>
                  {activeProject.name}
                </h3>
                <p className="mt-6 max-w-xl text-xs font-medium uppercase tracking-[0.2em] text-ivory/65 sm:text-sm">
                  {location}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-auto absolute right-5 top-5 font-mono text-xs text-ivory/70 sm:right-8 sm:top-8 md:right-12 lg:right-16">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>

          <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 py-6 sm:px-8 md:px-12 lg:px-16">
            <div className="hidden max-w-[66%] items-center gap-4 overflow-x-auto md:flex">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleProjectSelect(index)}
                  className={`shrink-0 border-b pb-2 font-serif text-sm leading-none transition duration-500 ${
                    index === activeIndex
                      ? 'border-sand text-ivory'
                      : 'border-transparent text-ivory/38 hover:text-ivory/72'
                  }`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                >
                  {project.name}
                </button>
              ))}
            </div>

            <div className="ml-auto flex min-w-fit items-center gap-5 sm:gap-7">
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="group min-h-10 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ivory/62 transition hover:text-ivory"
                aria-label={`Previous project: ${projects[wrapIndex(activeIndex - 1, projects.length)].name}`}
              >
                <span className="inline-block transition group-hover:-translate-x-0.5">&larr;</span> Prev
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                className="group min-h-10 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ivory/62 transition hover:text-ivory"
                aria-label={`Next project: ${projects[wrapIndex(activeIndex + 1, projects.length)].name}`}
              >
                Next <span className="inline-block transition group-hover:translate-x-0.5">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-4 overflow-x-auto px-5 pb-1 sm:px-0 md:hidden" aria-label="Select a project">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => handleProjectSelect(index)}
              className={`shrink-0 border-b pb-2 font-serif text-base leading-none transition duration-500 ${
                index === activeIndex
                  ? 'border-charcoal text-charcoal dark:border-sand dark:text-ivory'
                  : 'border-transparent text-charcoal/42 dark:text-ivory/42'
              }`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CinematicProjectShowcase;
