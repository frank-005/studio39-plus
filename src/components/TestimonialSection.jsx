const testimonials = [
  {
    quote:
      'The studio translated our private brief into a home that felt calm, personal, and deeply connected to the site.',
    name: 'Private residential client',
    context: 'Karen residence'
  },
  {
    quote:
      'The design process gave our diaspora family confidence before we committed to building in Kenya.',
    name: 'Diaspora homeowner',
    context: 'Coastal villa concept'
  }
];

function TestimonialSection() {
  return (
    <section className="content-container py-16 sm:py-20 md:py-24" aria-labelledby="testimonials-title">
      <div className="max-w-2xl">
        <p className="eyebrow">Trusted Collaborations</p>
        <h2 id="testimonials-title" className="mt-4 text-3xl font-semibold leading-tight text-charcoal dark:text-ivory sm:text-4xl">
          Designed for clients who expect discretion, clarity, and a refined architectural experience.
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
