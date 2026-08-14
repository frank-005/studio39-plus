import { motion, useReducedMotion } from 'framer-motion';
import SEO from '../components/SEO';
import CTASection from '../components/CTASection';

const statementLines = ['YOUR HOME STARTS', 'WITH YOUR STORY.'];

function About() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0, distance = 20) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: distance },
    whileInView: shouldReduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.28 },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }
  });

  return (
    <div className="pb-16 pt-24 sm:pt-28 md:pt-32">
      <SEO
        title="About Studio 39+ | Luxury Residential Architect Kenya"
        description="Learn about Studio 39+, a Nairobi-based residential architecture studio designing homes, villas, and retreat environments across Kenya."
      />

      <section className="bg-neutral-100 text-charcoal dark:bg-charcoal dark:text-ivory" aria-labelledby="about-founder-title">
        <div className="content-container grid gap-14 py-16 sm:py-20 md:py-28 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20 lg:items-stretch xl:gap-28">
          <motion.figure
            {...reveal(0, 20)}
            className="relative mt-0 h-full overflow-hidden bg-[#e7e1d7] dark:bg-[#17130f]"
          >
            <div className="h-full min-h-[28rem] sm:min-h-[32rem] lg:min-h-[38rem] xl:min-h-[42rem]">
              <img
                src="/about/nairobi-kenya.jpg"
                alt="Nairobi, Kenya map artwork with fine city linework and coordinates"
                decoding="async"
                className="block h-full w-full object-cover object-center"
                style={{ objectPosition: 'center center' }}
              />
            </div>
          </motion.figure>

          <div className="flex max-w-5xl flex-col justify-center gap-14">
            <div>
              <motion.p
                {...reveal(0.12, 14)}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-charcoal/58 dark:text-sand sm:text-[0.72rem]"
              >
                Getting to Know Us
              </motion.p>

              <motion.div {...reveal(0.24, 16)} className="mt-12 sm:mt-14">
                <h1
                  id="about-founder-title"
                  className="font-serif text-5xl font-medium leading-none text-charcoal dark:text-ivory sm:text-6xl md:text-7xl"
                >
                  Franklin Ombui
                </h1>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/65 dark:text-sand/76 sm:text-sm">
                  Founder & Principal Designer
                </p>
              </motion.div>
            </div>

            <div>
              <h2 className="max-w-[13ch] font-serif text-[clamp(3rem,7.8vw,7.8rem)] font-medium leading-[0.92] text-charcoal dark:text-ivory">
                {statementLines.map((line, index) => (
                  <motion.span
                    key={line}
                    {...reveal(0.38 + index * 0.12, 26)}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </h2>

              <motion.p
                {...reveal(0.78, 18)}
                className="mt-12 max-w-2xl text-base leading-8 text-charcoal/72 dark:text-sand sm:text-lg sm:leading-9"
              >
                Before we draw anything, we want to understand the life you want to build. What do your mornings look like? Where does your family naturally gather? What does home mean to you? These conversations shape the design.
              </motion.p>

              <motion.p
                {...reveal(0.88, 18)}
                className="mt-6 max-w-2xl text-base leading-8 text-charcoal/72 dark:text-sand/90 sm:text-lg sm:leading-9"
              >
                Based in Nairobi and working across Kenya, Franklin collaborates closely with clients to turn ideas, needs, and aspirations into homes that feel genuinely their own. Every project is an opportunity to create a place where you want to spend your life.
              </motion.p>

              <motion.div
                {...reveal(0.95, 14)}
                className="mt-10 space-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-charcoal/65 dark:text-sand/70 sm:text-xs"
              >
                <p>Nairobi · Kenya</p>
                <p>Residential Architecture · Interiors · Thoughtful Design</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

export default About;
