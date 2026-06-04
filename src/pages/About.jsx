import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import CTASection from '../components/CTASection';
import Reveal from '../components/Reveal';

function About() {
  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        title="About Studio 39+ | Luxury Residential Architect Kenya"
        description="Learn about Studio 39+, a Nairobi-based residential architecture studio designing homes, villas, and retreat environments across Kenya."
      />
      <section className="content-container space-y-14 py-16 sm:py-20 md:py-28">
        <SectionHeading as="h1" eyebrow="About" title="A Nairobi based architecture studio designing homes rooted in place." copy="Studio 39+ brings a modern African sensibility to residences, villas, and retreats that are precise, personal, and grounded in context." />
        <div className="grid gap-12 border-y border-charcoal/15 py-12 dark:border-ivory/15 lg:grid-cols-[0.44fr_0.56fr] lg:items-center lg:gap-16 xl:gap-20">
          <Reveal className="relative overflow-hidden bg-charcoal">
            <div className="aspect-[4/5]">
              <img
                src="/about/founder-avatar-placeholder.svg"
                alt="Founder portrait placeholder"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </Reveal>
          <Reveal className="space-y-12" delay={0.08}>
            <article>
              <p className="eyebrow">Founder</p>
              <h2 className="mt-6 font-serif text-5xl font-medium leading-none text-charcoal dark:text-ivory sm:text-6xl">Franklin Ombui</h2>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-charcoal/58 dark:text-sand/72">Founder & Principal Designer</p>
              <div className="mt-10 max-w-2xl space-y-6 text-lg leading-9 text-charcoal/72 dark:text-sand">
                <p>Studio 39+ designs private homes shaped by climate, landscape, and everyday life. We believe lasting architecture comes from careful planning, natural materials, and a strong sense of place.</p>
                <p>Based in Nairobi, Franklin works across Kenya on private residential projects ranging from family homes to bespoke villas.</p>
              </div>
            </article>
            <div className="grid gap-10 border-t border-charcoal/12 pt-10 dark:border-ivory/12 md:grid-cols-2">
              <article>
                <p className="eyebrow">Philosophy</p>
                <p className="mt-6 text-base leading-8 text-charcoal/70 dark:text-sand">Every home begins with place, climate, and the people who will live there.</p>
              </article>
              <article>
                <p className="eyebrow">Approach</p>
                <p className="mt-6 text-base leading-8 text-charcoal/70 dark:text-sand">We develop architecture through careful planning, material clarity, and lasting comfort.</p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

export default About;
