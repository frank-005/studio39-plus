import { Suspense, lazy } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Contact = lazy(() => import('./pages/Contact'));

const pageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.4, ease: 'easeInOut' } }
};

function App() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <DefaultLayout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} variants={pageTransition} initial={prefersReducedMotion ? false : 'initial'} animate="animate" exit={prefersReducedMotion ? undefined : 'exit'} className="min-h-screen">
            <Suspense fallback={<div className="content-container min-h-[70vh] pt-32 text-sm uppercase tracking-[0.3em] text-charcoal/70 dark:text-sand">Loading Studio 39+</div>}>
              <Routes location={location}>
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
