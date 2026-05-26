import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import CTASection from '../components/CTASection';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';

function About() {
  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        title="About Studio 39+ | Nairobi Architecture Studio"
        description="Learn about Studio 39+, a Nairobi architecture studio creating luxury residential, hospitality, interior architecture, and visualization work across Kenya."
      />
      <section className="content-container space-y-14 py-16 sm:py-20 md:py-28">
        <SectionHeading as="h1" eyebrow="About" title="A Nairobi studio shaped by architectural restraint, editorial rigor, and atmospheric detail." copy="Studio 39+ brings a modern African sensibility to residential, hospitality, and visualization projects that are calm, precise, and grounded in place." />
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] xl:gap-16">
          <div className="space-y-8 border-y border-charcoal/15 py-10 dark:border-ivory/15">
            <h2 className="text-3xl font-semibold text-charcoal dark:text-ivory">Philosophy</h2>
            <p className="text-base leading-9 text-charcoal/70 dark:text-sand">Our work is conceived through quiet clarity. We shape architecture that reads as calm and enduring, with a strong sense of place and a careful balance between light, material and atmosphere.</p>
            <p className="text-base leading-9 text-charcoal/70 dark:text-sand">Every project begins with a rigorous inquiry into context, program and the spatial experience of the user. The result is an architecture that feels both contemporary and timeless.</p>
            <div className="about-sketch relative mt-10 aspect-[4/5] overflow-hidden bg-charcoal">
              <img
                src={optimizedImageUrl('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80&fm=webp', 1200)}
                srcSet={imageSrcSet('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80&fm=webp', [640, 960, 1200])}
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt="Architectural materials and studio atmosphere"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-85"
              />
            </div>
          </div>
          <div className="space-y-10">
            <article className="border-t border-charcoal/15 pt-9 dark:border-ivory/15">
              <p className="eyebrow">Founder</p>
              <h3 className="mt-5 text-2xl font-semibold text-charcoal dark:text-ivory">Franklin Ombui</h3>
              <p className="mt-6 text-base leading-9 text-charcoal/70 dark:text-sand">Franklin leads the studio with a belief that architecture should feel quiet, generous, and rooted in cultural intelligence. His practice is defined by strong visuals, refined geometry, and a modern interpretation of African architectural ideas.</p>
            </article>
            <article className="border-t border-charcoal/15 pt-9 dark:border-ivory/15">
              <p className="eyebrow">Approach</p>
              <ul className="mt-6 space-y-5 text-base leading-9 text-charcoal/70 dark:text-sand">
                <li>Context-driven design grounded in landscape and climate.</li>
                <li>Material exploration with sculptural simplicity.</li>
                <li>Integrated visualization and technical delivery from the earliest phase.</li>
              </ul>
            </article>
            <article className="border-t border-charcoal/15 pt-9 dark:border-ivory/15">
              <p className="eyebrow">Geographic Focus</p>
              <p className="mt-6 text-base leading-9 text-charcoal/70 dark:text-sand">The studio works from Nairobi across Kenya and East Africa, with particular interest in private residences, boutique hospitality, safari landscapes, and intimate commercial environments.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-container space-y-12 py-16 sm:py-20 md:py-28">
        <SectionHeading eyebrow="Narrative" title="A studio story built around thoughtful geometry and calm atmospheres." />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2022</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">Studio 39+ is founded to respond to contemporary African architecture with thoughtful, quiet design. The studio begins by framing each project in spatial narrative and material precision.</p>
          </div>
          <div className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2023</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">The practice expands work into hospitality and interior projects, while deepening its approach to daylight, texture, and crafted details.</p>
          </div>
          <div className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2025</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">Studio 39+ continues to refine its portfolio with residences, conceptual spaces, and immersive visual narratives for clients across the continent.</p>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}

export default About;
