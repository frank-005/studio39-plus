function CaseStudyFacts({ project }) {
  const facts = [
    ['Location', project.location],
    ['Build status', project.status],
    ['Typology', project.category],
    ['Year', project.year]
  ];

  return (
    <dl className="grid gap-6 sm:grid-cols-2">
      {facts.map(([label, value]) => (
        <div key={label} className="border-t border-charcoal/15 pt-5 dark:border-ivory/15">
          <dt className="eyebrow text-[0.68rem]">{label}</dt>
          <dd className="mt-3 text-base font-semibold leading-7 text-charcoal dark:text-ivory">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default CaseStudyFacts;
