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
          <Reveal className="space-y-10" delay={0.08}>
            <article>
              <p className="eyebrow">Founder</p>
              <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-charcoal dark:text-ivory sm:text-5xl">Franklin Ombui</h2>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-charcoal/58 dark:text-sand/72">Founder & Architectural Designer</p>
              <div className="mt-8 max-w-2xl space-y-6 text-base leading-9 text-charcoal/70 dark:text-sand">
                <p>Studio 39+ was founded to create thoughtful homes rooted in place.</p>
                <p>The practice focuses on residential architecture shaped by climate, landscape, and everyday living.</p>
                <p>Design decisions are guided by context, comfort, and long-term value rather than trends.</p>
                <p>Projects are approached with clarity, restraint, and attention to detail.</p>
              </div>
            </article>
            <div className="grid gap-8 border-t border-charcoal/12 pt-8 dark:border-ivory/12 md:grid-cols-2">
              <article>
                <p className="eyebrow">Philosophy</p>
                <p className="mt-5 text-base leading-8 text-charcoal/70 dark:text-sand">The work begins with site, climate, privacy, family rhythm, and the way a home should feel over time.</p>
              </article>
              <article>
                <p className="eyebrow">Approach</p>
                <p className="mt-5 text-base leading-8 text-charcoal/70 dark:text-sand">Each commission is developed with strong planning, quiet restraint, and a close reading of light, materials, and daily use.</p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="content-container space-y-12 py-16 sm:py-20 md:py-28">
        <SectionHeading eyebrow="Narrative" title="A studio story built around private homes and careful work." />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2022</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">Studio 39+ is founded to pursue residential work with clarity, restraint, and a close reading of East African context.</p>
          </div>
          <div className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2023</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">The practice deepens its work in private residences, villas, and interiors, refining its approach to daylight, privacy, and detail.</p>
          </div>
          <div className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2025</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">Studio 39+ expands its portfolio through residences, retreats, and presentation-led work for clients across East Africa.</p>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}

export default About;
