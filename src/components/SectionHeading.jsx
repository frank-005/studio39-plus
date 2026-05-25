function SectionHeading({ eyebrow, title, copy, as: Heading = 'h2' }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <Heading className="text-balance text-3xl font-semibold leading-tight tracking-tight text-charcoal sm:text-4xl lg:text-5xl dark:text-ivory">{title}</Heading>
      {copy && <p className="section-copy mt-6 text-lg leading-9 text-charcoal/70 dark:text-sand">{copy}</p>}
    </div>
  );
}

export default SectionHeading;
