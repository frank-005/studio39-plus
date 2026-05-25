const testimonials = [
  {
    quote:
      'The studio translated a loose brief into a precise architectural direction. The process felt measured, visual, and very easy to trust.',
    name: 'Private residential client',
    context: 'Nairobi residence'
  },
  {
    quote:
      'Their visual storytelling helped our hospitality team understand the guest journey before major decisions were locked in.',
    name: 'Development lead',
    context: 'East Africa lodge concept'
  }
];

function TestimonialSection() {
  return (
    <section className="content-container py-16 sm:py-20 md:py-24" aria-labelledby="testimonials-title">
      <div className="max-w-2xl">
        <p className="eyebrow">Client Notes</p>
        <h2 id="testimonials-title" className="mt-4 text-3xl font-semibold leading-tight text-charcoal dark:text-ivory sm:text-4xl">
          Clear thinking, composed visuals, and a calm path from idea to decision.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {testimonials.map((item) => (
          <figure key={item.context} className="border-l border-charcoal/20 pl-6 dark:border-ivory/20">
            <blockquote className="text-lg leading-9 text-charcoal/75 dark:text-sand">"{item.quote}"</blockquote>
            <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-ivory">
              {item.name}
              <span className="mt-2 block font-normal text-charcoal/60 dark:text-sand/70">{item.context}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;
