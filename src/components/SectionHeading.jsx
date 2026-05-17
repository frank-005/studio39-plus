function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-5 text-xs uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">{eyebrow}</p>
      <h2 className="text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl dark:text-ivory">{title}</h2>
      {copy && <p className="mt-6 text-lg leading-9 text-charcoal/70 dark:text-sand">{copy}</p>}
    </div>
  );
}

export default SectionHeading;
