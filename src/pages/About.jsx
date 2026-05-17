import SectionHeading from '../components/SectionHeading';

function About() {
  return (
    <div className="pt-32 pb-28 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
      <section className="content-container space-y-16 py-24 md:py-28">
        <SectionHeading eyebrow="About" title="A studio shaped by architectural restraint, editorial rigour, and atmospheric detail." copy="Studio 39+ brings a modern African sensibility to projects that are both calm and precise. We focus on spatial experience, material depth, and intelligent composition." />
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] xl:gap-16">
          <div className="space-y-10 rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
            <h2 className="text-3xl font-semibold text-charcoal dark:text-ivory">Philosophy</h2>
            <p className="text-base leading-9 text-charcoal/70 dark:text-sand">Our work is conceived through quiet clarity. We shape architecture that reads as calm and enduring, with a strong sense of place and a careful balance between light, material and atmosphere.</p>
            <p className="text-base leading-9 text-charcoal/70 dark:text-sand">Every project begins with a rigorous inquiry into context, program and the spatial experience of the user. The result is an architecture that feels both contemporary and timeless.</p>
          </div>
          <div className="space-y-10">
            <article className="rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
              <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Founder</p>
              <h3 className="mt-5 text-2xl font-semibold text-charcoal dark:text-ivory">Franklin Ombui</h3>
              <p className="mt-6 text-base leading-9 text-charcoal/70 dark:text-sand">Franklin leads the studio with a belief that architecture should feel quiet, generous, and rooted in cultural intelligence. His practice is defined by strong visuals, refined geometry, and a modern interpretation of African architectural ideas.</p>
            </article>
            <article className="rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
              <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Approach</p>
              <ul className="mt-6 space-y-5 text-base leading-9 text-charcoal/70 dark:text-sand">
                <li>Context-driven design grounded in landscape and climate.</li>
                <li>Material exploration with sculptural simplicity.</li>
                <li>Integrated visualization and technical delivery from the earliest phase.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="content-container space-y-16 py-24 md:py-28">
        <SectionHeading eyebrow="Narrative" title="A studio story built around thoughtful geometry and calm atmospheres." />
        <div className="space-y-14">
          <div className="rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2022</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">Studio 39+ is founded to respond to contemporary African architecture with thoughtful, quiet design. The studio begins by framing each project in spatial narrative and material precision.</p>
          </div>
          <div className="rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2023</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">The practice expands work into hospitality and interior projects, while deepening its approach to daylight, texture, and crafted details.</p>
          </div>
          <div className="rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
            <h3 className="text-2xl font-semibold text-charcoal dark:text-ivory">2025</h3>
            <p className="mt-5 text-base leading-9 text-charcoal/70 dark:text-sand">Studio 39+ continues to refine its portfolio with residences, conceptual spaces, and immersive visual narratives for clients across the continent.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
