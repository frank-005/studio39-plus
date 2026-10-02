import { Suspense, lazy, useEffect } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import SEO from './components/SEO';
import { initAnalytics, trackPageView } from './utils/analytics';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Contact = lazy(() => import('./pages/Contact'));

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: 'easeInOut' } }
};

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search, hash]);

  return null;
}

function App() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <AnalyticsTracker />
      <ScrollToTop />
      <DefaultLayout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} variants={pageTransition} initial={prefersReducedMotion ? false : 'initial'} animate="animate" exit={prefersReducedMotion ? undefined : 'exit'} className="min-h-screen">
            <Suspense fallback={<div className="content-container min-h-[70vh] pt-32 text-sm uppercase tracking-[0.3em] text-charcoal/70 dark:text-sand">Loading Studio 39+</div>}>
              <Routes location={location}>
                <Route
                  path="*"
                  element={(
                    <section className="content-container flex min-h-[65svh] flex-col items-start justify-center py-32" aria-labelledby="not-found-title">
                      <SEO title="Page Not Found" description="The requested Studio 39+ page could not be found." robots="noindex, follow" />
                      <p className="eyebrow">404</p>
                      <h1 id="not-found-title" className="mt-5 font-serif text-4xl text-ivory sm:text-5xl">Page not found</h1>
                      <p className="mt-5 max-w-xl text-base leading-8 text-sand">The page you are looking for may have moved or no longer exists.</p>
                      <Link to="/" className="btn-primary mt-8">Return home</Link>
                    </section>
                  )}
                />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:serviceId" element={<ServiceDetail />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </DefaultLayout>
    </MotionConfig>
  );
}

export default App;
