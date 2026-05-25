import { motion, useReducedMotion } from 'framer-motion';

function Reveal({ children, className = '', as = 'div', delay = 0, ...props }) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Reveal;
